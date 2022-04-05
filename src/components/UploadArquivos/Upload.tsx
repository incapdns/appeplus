import filesize from "filesize";
import { useState, memo, useEffect, useCallback } from "react"
import { Container, FileInfo, Preview } from "../../styles/components/Form/vender-arquivos";
import Dropzone from "./Dropzone"
import ImageProgress from "./ImageProgress";
import ProgressBar from 'react-bootstrap/ProgressBar'
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { Upload as UploadCore } from "./core/Upload";

SwiperCore.use([Virtual, Navigation]);

export interface IFile {
    id: string;
    name: string;
    progress: number;
    preview: string;
    file: File;
    meta: any;
}

export interface IUpload {
    start?: boolean;
    upload: string;
    remove: string;
    format(data: IFile): string;
    onDone(): void;
    onError?(ata: IFile): void;
    onChange?(files: IFile[]): void;
    onAfterInit?(inst: UploadCore): void;
    initFiles?: IFile[];
    meta: any;
}

function Upload(props: IUpload){
    const { start, initFiles } = props;

    const [swiper, setSwiper] = useState<any>()

    const state = useState<string>()

    let [core, setCore] = useState<UploadCore>()

    if(!core){
        core = new UploadCore(props, state[1])

        setCore(core)
    }

    useEffect(() => {
        if(!initFiles?.length) return;

        core!.initFiles(initFiles)
    }, [initFiles])

    useEffect(() => {
        core!.MapSlide(number => {
            swiper.slideTo(number)
        })
    })

    useEffect(() => {
        if(!start) return;

        core!.start()
    }, [start])

    const getDivStyle = (file: IFile) => {
        let color = file.progress < 100 ? 
            (file.progress == - 1 ? 'red' : "orange") : "green"

        return core?.started ? {
            style: { border: `3px solid ${color}`, borderRadius: '13px', marginRight: '10px' }
        } : {}
    }

    const showInfo = (data: IFile) => {
        return (
            <div {...getDivStyle(data)}>
                <FileInfo >
                    <Preview src={data.preview} />
                    <div>
                        <p style={{ margin: `0`, width: '100px', height: '20px', textOverflow: 'ellipsis', overflow: 'hidden', direction: 'ltr' }}>{data.name}</p>
                        <span style={{ color: `#000` }}>
                            {filesize(data.file.size)}
                            <button className="btnExcluir" onClick={() => core!.deleteFile(data)}>
                                x
                            </button>
                        </span>
                        <br />
                        {core?.started &&
                            <div style={{ display: 'block', position: 'relative' }}>
                                <span style={{ color: 'rgb(0, 0, 0)' }}>
                                    <a style={{ top: '5px', position: 'relative', marginRight: '10px' }}>{data.progress}%</a>
                                    <ImageProgress progress={data.progress} />
                                </span>
                            </div>
                        }
                    </div>
                </FileInfo>
            </div>
        )
    }

    const renderProgress = () => {
        return (
            <Container>
                <Swiper
                    onAfterInit={setSwiper}
                    slidesPerView={2}
                    centeredSlides={false}
                    spaceBetween={10}
                    pagination={false}
                    navigation={true}
                    loop={false}
                    virtual
                    >
                    {core!.files.map((file, at) => (
                        <SwiperSlide key={file.id} virtualIndex={at}>
                            {showInfo(file)}    
                        </SwiperSlide>
                    ))}
                </Swiper>
                {core?.started && core?.total > 0 && <div style={{top: '7px', position: 'relative'}}>
                    <ProgressBar striped now={core!.now} animated />
                </div>}
            </Container>
        );
    }

    return (
        <>
            <div className="col-md-3 col-12 mb-4">
                <Dropzone onFilesAdded={core!.appendFiles}></Dropzone>
            </div>

            <div className="col-md-9 col-12 mb-4">
                {renderProgress()}
            </div>
        </>
    )
}

function same (prev: any, actual: any, ...keys: string[]) {
    for(let key of keys){
        if(prev[key] != actual[key]) 
            return false
    }

    return true
}

const verify = (prev: IUpload, props: IUpload) => {
    let keys = ['start', 'upload', 'remove', 'initFiles', 'meta']

    return same.apply(null, [prev, props, ...keys])
}

export default memo(Upload, verify)