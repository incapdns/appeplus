import { v4 as uuidv4 } from "uuid";
import { iDadosUsuario } from "../../../@types";
import api from "../../../services/api";
import { IFile, IUpload } from "../Upload";
import Slide, { MapSlideCb } from "./Slide";

type UpdateCb = (at: string) => void

const mergeById = (a1: any[], a2: any[]) => {
    let res = a1.map(itm => ({
        ...itm, ...a2.find(item => item.id === itm.id)
    }));
    res.push(...a2.filter(itm => 
        !a1.find(item => item.id == itm.id)))
    return res
}

class Upload {
    //Events to callback
    private onAfterInit?: (inst: Upload) => void;
    private onChange?: (inst: IFile[]) => void;
    private onDone?: () => void;
    private onError?: (file: IFile) => void;

    //Interaction with files
    public files: IFile[] = [];
    private update!: UpdateCb;
    private remove!: string;
    private meta!: any;

    //Init the start / stop upload
    private uploadUrl!: string;
    private format!: (data: IFile) => string;
    private totalSent: number = 0;
    public started: boolean = false;

    //Plugins
    private slide!: Slide;

    constructor(props: IUpload, update: UpdateCb){
        this.onAfterInit = props.onAfterInit
        this.onChange = props.onChange
        this.onDone = props.onDone
        this.onError = props.onError
        
        this.remove = props.remove
        this.update = update
        this.meta = props.meta

        this.uploadUrl = props.upload
        this.format = props.format
        
        this.slide = new Slide(this)

        //Update scope
        this.scope()

        this.initialize()
    }

    public initialize(){
        if(this.onAfterInit)
            this.onAfterInit(this)
    }

    private scope(){
        this.appendFiles = this.appendFiles.bind(this)

        this.initFiles = this.initFiles.bind(this)

        this.getErrors = this.getErrors.bind(this)

        this.deleteFile = this.deleteFile.bind(this)

        this.slideTo = this.slideTo.bind(this)

        this.MapSlide = this.MapSlide.bind(this)
    }

    private get toUpload(){
        return this.files.filter(file => 
            file.id.includes('-'))
    }

    public get total(){
        return this.toUpload.length
    }

    public get now(){
        return (this.totalSent * 100) / this.total || (this.total == 0 ? 100 : 0)
    }

    //Start the upload
    public start(){
        this.started = true

        this.uploadFiles()

        this.reflect()
    }

    //Get files with status errors in upload
    public getErrors(){
        return this.files.filter(file => 
            file.progress == -1
        )
    }

    //Set initial files
    public initFiles(files: IFile[]){
        this.files = mergeById(this.files, files)

        this.reflect()
    }

    //Append new files on selected <input type="file">
    public appendFiles(files: File[]){
        if (!files.length) return;

        let result: IFile[] = files.map(file => {
            return { 
                meta: this.meta, 
                file, name: file.name, 
                id: uuidv4(), 
                progress: 0, 
                preview: URL.createObjectURL(file) 
            }
        })

        this.files.push(...result)

        this.passChanges()

        this.reflect()
    }

    //Delete an file
    public deleteFile(data: IFile){
        let index = this.files.indexOf(data)

        this.files = this.files.filter(file => 
            file.id != data.id
        )

        if(!data.id.includes('-')){
            let path = this.remove.replace(':id', data.id);

            api.delete(path)
        }

        this.slideTo(--index)

        this.passChanges()

        this.reflect()
    }

    /* START: Plugin slide */
    public slideTo(item: IFile | number){
        this.slide.slideTo(item)
    }
    
    public MapSlide(cb: MapSlideCb){
        this.slide.MapSlide(cb)
    }
    /* END: Plugin slide */

    //Send the XHR Request
    private sendRequest (data: IFile){
        const user: iDadosUsuario = JSON.parse(
            localStorage.getItem("@appePlus/usuario") || "{}"
        )

        const token = user.token;
        
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    let percent = (event.loaded / event.total) * 100

                    data.progress = parseInt(percent.toString())

                    this.reflect()
                }
            });

            req.upload.addEventListener("load", event => {
                this.totalSent++

                resolve(data)

                this.reflect()
            });

            req.upload.addEventListener("error", event => {
                data.progress = -1

                reject(data)

                this.reflect()
            });

            const formData = new FormData()

            req.open("POST", `${api.defaults.baseURL}${this.uploadUrl}`)

            if (token){
                req.setRequestHeader("Authorization", `Bearer ${token}`)
            }

            formData.append("FormFile", data.file, this.format(data))

            req.send(formData)
        })
    }

    public uploadFiles(files = [...this.toUpload]) {
        if(!files.length) {
            if(this.onDone) this?.onDone()

            return;
        }

        let process = files.splice(0, 3)

        let promises = process.map(file =>
            this.sendRequest(file)
                .catch(reason => 
                    this.onError && this.onError(reason)
        ))

        Promise.allSettled(promises).then(() => {
            this.uploadFiles(files)
        })
    }

    //Pass changes to callback (onChange)
    private passChanges(){
        if(this.onChange)
            this.onChange(this.files)
    }

    //Reflect changes in Upload.tsx
    public reflect(){
        this.update(uuidv4())
    }
}

export default Upload

export { Upload }