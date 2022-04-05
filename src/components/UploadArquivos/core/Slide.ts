import { IFile } from "../Upload";
import Upload from "./Upload";

export type MapSlideCb = (at: number) => void

export default class Slide {
    private core!: Upload

    private to: number[] = []
    
    constructor(core: Upload){
        this.core = core
    }

    slideTo(item: IFile | number){
        let index = typeof item == 'number' 
            ? item : this.core.files.indexOf(item)

        this.to.push(index)

        this.core.reflect()
    }
    
    MapSlide(cb: MapSlideCb){
        let item = this.to.splice(0, 1)

        if(item.length)
            cb(item[0])
    }
}

export { Slide }