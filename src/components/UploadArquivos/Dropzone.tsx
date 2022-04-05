import { DropContainer, UploadMessage } from "../../styles/components/Form/vender-arquivos";

function Dropzone(){
    const onDrop = (files: File[]) => {
        //
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

    const renderDragMessage = useCallback(() => {
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
        
    </DropContainer>
    );
}

export default Dropzone

function useDropzone(arg0: { accept: string[]; onDrop: any; }): { getRootProps: any; getInputProps: any; isDragActive: any; isDragReject: any; } {
    throw new Error("Function not implemented.");
}
function useCallback(arg0: () => any, arg1: any[]) {
    throw new Error("Function not implemented.");
}

