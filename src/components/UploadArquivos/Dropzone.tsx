import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "../../styles/components/Form/vender-arquivos";

interface IDropZone {
    onFilesAdded: (files: File[]) => void
}

function Dropzone({onFilesAdded}: IDropZone){
    const onDrop = (files: File[]) => {
        onFilesAdded(files)
    }
  
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        accept: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
        onDrop,
    });

    const renderDragMessage = useMemo((): JSX.Element => {
        if (!isDragActive) {
            return <UploadMessage>Para upload arraste seus documento para cá ou clique</UploadMessage>;
        }

        if (isDragReject) {
            return (
            <UploadMessage type="error">
                Tipo de arquivo não suportado
            </UploadMessage>
            );
        }

        return <UploadMessage type="success">Solte os documentos aqui</UploadMessage>;
    }, [isDragActive, isDragReject]);

    return (
        <DropContainer {...getRootProps()} style={{ width: "100%", height: `200px`, backgroundColor: `#FAFAFA`, display: "flex", justifyContent: "center" }}>
            <input {...getInputProps()} />
            {renderDragMessage}
        </DropContainer>
    )
}

export default Dropzone