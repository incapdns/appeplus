import { useState, useCallback, useRef, FormEvent, useEffect } from 'react'
import '../../../styles/components/Form/profileCadastroUser.scss';
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";
import { useDropzone } from "react-dropzone";
import { Container, FileInfo, Preview, DropContainer, UploadMessage } from "../../../styles/components/Form/vender-arquivos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cepMask, cnpjMask, cpfMask, revertMask } from '../../../utils/Masks';
import axios from 'axios';
import validaCpf from '../../../utils/validaCpf';
import Alert from '../../Alert';
import validaCnpj from '../../../utils/validaCnpj';
import { useHistory } from 'react-router-dom';
import {
  RiArrowRightCircleFill,
  RiArrowLeftCircleFill
} from "react-icons/ri";
import api from '../../../services/api';
import minify from '../../../utils/minify';

export interface IFile {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  preview: string;
  file: File | Blob | string;
  progress?: number;
  error?: boolean;
  url: string;
}
export interface IArquivo {
  arquivoNome: string;
  formFile: File | Blob | string;
}

interface iDataSelect {
  value?: number;
  label?: string;
}

const ProfileCadastroUserJuridico = () => {

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <RiArrowRightCircleFill size={22} />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <RiArrowLeftCircleFill size={22} />
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const history = useHistory();
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [uploadedFilesExtra, setUploadedFilesExtra] = useState<IFile[]>([]);
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [uf, setUf] = useState('');
  const [numero, setNumero] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [erroCnpj, setErroCnpj] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [cnpj, setCnpj] = useState('');
  const insertFocus = useRef<HTMLInputElement>(null);
  const [tipoArquivo, setTipoArquivo] = useState<iDataSelect[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    GetTipoArquivo();
  }, [])

  async function GetTipoArquivo() {
    await api.get(`tipoArquivo/buscar/autoComplete`)
      .then(response => {
        setTipoArquivo(response.data.data);
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    history.push('/cadastro/imovel/anuncioSimples')
  }

  function handleCpf() {
    if (!validaCpf(cpf) && cpf.length === 11) {
      setMsgErro("CPF inválido !")
      setAlertErro(true)
    }
  }

  function handleCnpj() {
    if (cnpj !== "") {
      if (!validaCnpj(cnpj)) {
        setErroCnpj(true)
      } else {
        setErroCnpj(false)
      }
    }
  }



  async function handleCep() {
    if (cep.length === 7 || cep.length === 8) {
      await axios.get<any>(`https://viacep.com.br/ws/${cep}/json/`).then(response => {
        if (response.data.erro) {
          setMsgErro("CEP  inválido")
          setAlertErro(true)
        }
        setEndereco(response.data.logradouro);
        setCidade(response.data.localidade);
        setBairro(response.data.bairro);
        setUf(response.data.uf);
        setNumero(true);
        insertFocus.current?.focus();

      })
    }

  }


  function UploadArquivos() {

    const handleUpload = useCallback(
      (files: File[]) => {
        const newUploadedFiles: IFile[] = files.map((file: File) => ({
          file,
          id: uuidv4(),
          name: file.name,
          readableSize: filesize(file.size),
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false,
          error: false,
          url: "",
        }));

        Promise.all(
          newUploadedFiles.map(
            upload => minify(upload.file as File)
            .then(res => upload.file = res)
          )
        ).then(() => {
          setUploadedFiles((state) => state.concat(newUploadedFiles))
        })
      },
      []
    );
    const onDrop = useCallback(
      (files) => {
        handleUpload(files);
      },
      [handleUpload]
    );

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
        {renderDragMessage()}
      </DropContainer>
    );
  }
  const deletePreviewPhotoJuridica = (id: any) => {

    const newArray = uploadedFiles.filter((file) => file.id !== id)
    setUploadedFiles(newArray)
  }
  const FileListArquivos = () => {

    return (
      <Container>
        <Slider {...settings}>
          {uploadedFiles.map((uploadedFile: IFile) => (
            <li key={uploadedFile.id}>
              <FileInfo >
                <Preview src={uploadedFile.preview} />
                <div>
                  <p style={{ margin: `0` }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button className="btnExcluir" onClick={() => { deletePreviewPhotoJuridica(uploadedFile.id) }}>
                        x
                      </button>
                    )}
                  </span>
                  <textarea name="" id="" placeholder="Obs..."></textarea>
                </div>
              </FileInfo>
            </li>
          ))}
        </Slider>

      </Container>
    );
  };

  function UploadArquivos2() {

    const handleUpload = useCallback(
      (files: File[]) => {
        const newUploadedFiles: IFile[] = files.map((file: File) => ({
          file,
          id: uuidv4(),
          name: file.name,
          readableSize: filesize(file.size),
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false,
          error: false,
          url: "",
        }));

        Promise.all(
          newUploadedFiles.map(
            upload => minify(upload.file as File)
            .then(res => upload.file = res)
          )
        ).then(() => {
          setUploadedFiles((state) => state.concat(newUploadedFiles))
        })
      },
      []
    );
    const onDrop = useCallback(
      (files) => {
        handleUpload(files);
      },
      [handleUpload]
    );

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
        {renderDragMessage()}
      </DropContainer>
    );
  }

  const deletePreviewPhotoJuridicaDois = (id: any) => {
    const newArray2 = uploadedFilesExtra.filter((fileExtra) => fileExtra.id !== id)
    setUploadedFilesExtra(newArray2)
  }

  const FileListArquivos2 = () => {

    return (
      <Container>
        <Slider {...settings}>
          {uploadedFilesExtra.map((uploadedFile: IFile) => (
            <li key={uploadedFile.id}>
              <FileInfo >
                <Preview src={uploadedFile.preview} />
                <div>
                  <p style={{ margin: `0` }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button className="btnExcluir" onClick={() => { deletePreviewPhotoJuridicaDois(uploadedFile.id) }}>
                        x
                      </button>
                    )}
                  </span>
                  <textarea name="" id="" placeholder="Obs..."></textarea>
                </div>

              </FileInfo>
            </li>
          ))}
        </Slider>


      </Container>
    );
  };


  return (
    <>

      {erroCnpj &&
        <div className="alert alert-danger" role="alert">
          CNPJ Inválido !
        </div>
      }
      <div className="col-md-6">
        <p>CNPJ:</p>
        <div className="row">
          <div className="col-12 col-lg-6 mb-1">
            <input type="text" className="form-control" value={cnpjMask(cnpj)} maxLength={18} required onChange={event => { setCnpj(event.target.value) }} placeholder="Nº do CNPJ" onBlur={handleCnpj} />
          </div>
        </div>
      </div>
      <div className="col-lg-12 mt-5 ">
        <p>Faça o Upload do seu contrato social e alterações e comprovante de endereço<span style={{ color: '#FF715B' }}>*</span></p>
      </div>
      {/* <div className="col-lg-12 my-3">
          <button className="buttonUpload">Fazer Upload</button>
        </div> */}
      <div className="row">
        <div className="col-md-3">
          <UploadArquivos></UploadArquivos>
        </div>
        <div className="col-md-9">
          <FileListArquivos></FileListArquivos>
        </div>
      </div>
      <div className="col-lg-12 mt-5 ">
        <p>Dados do Representante legal (caso necessário)</p>
      </div>

      {alertErro && (
        <Alert msg={msgErro} setAlertErro={setAlertErro} />
      )}
      <div className="col-lg-12">
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-1">
            <input type="text" className="form-control" required placeholder="Nome" />
          </div>
          <div className="col-12 col-lg-3 mb-1">
            <input type="text" className="form-control" value={cpfMask(cpf)} maxLength={14} onChange={event => { setCpf(revertMask(event.target.value)) }} required placeholder="CPF" onBlur={handleCpf} />
          </div>
          <div className="col-12 col-lg-3 mb-1">
            <input type="text" className="form-control" required placeholder="RG" />
          </div>
        </div>

      </div>
      <div className="col-lg-12 mt-5 ">
        <p>Localização do representante legal<span style={{ color: '#FF715B' }}>*</span></p>
      </div>
      <div className="col-lg-12">
        <div className="row mb-3">
          <div className="col-12 col-lg-3 mb-1">
            <input type="text" className="form-control" autoComplete="no" id="inputCep" maxLength={9} value={cepMask(cep)} onChange={event => { setCep(revertMask(event.target.value)) }} onBlur={handleCep} required placeholder="CEP" />
          </div>
          <div className="col-12 col-lg-7 mb-1">
            <input type="text" className="form-control" value={endereco} disabled onChange={event => setEndereco(event.target.value)} placeholder="Endereço sem número" />
          </div>
          <div className="col-12 col-lg-2 mb-1">
            <input type="text" className="form-control" required disabled={numero ? (false) : (true)} ref={insertFocus} placeholder="numero" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-1" >
            <input type="text" className="form-control" disabled={numero ? (false) : (true)} placeholder="Complemento" />
          </div>
          <div className="col-12 col-lg-2 mb-1">
            <input type="text" className="form-control" disabled value={uf} onChange={event => setUf(event.target.value)} placeholder="Estado" />
          </div>
          <div className="col-12 col-lg-2 mb-1">
            <input type="text" className="form-control" disabled value={cidade} onChange={event => setCidade(event.target.value)} placeholder="cidade" />
          </div>
          <div className="col-12 col-lg-2 mb-1">
            <input type="text" className="form-control" disabled value={bairro} onChange={event => setBairro(event.target.value)} placeholder="bairro" />
          </div>
        </div>
      </div>
      <div className="col-lg-12 mt-5 ">
        <p>Faça o Upload da procuração caso aplicável</p>
      </div>
      {/* <div className="col-lg-12 my-3">
          <button className="buttonUpload">Fazer Upload</button>
        </div> */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <UploadArquivos2></UploadArquivos2>
        </div>
        <div className="col-md-9 mb-4" >
          <FileListArquivos2></FileListArquivos2>
        </div>
      </div>
      <div className="col-lg-12 mt-0 pt-4 row-gray text-end" >
        <button className="buttonSalvar" onClick={handleSubmit}>
          Salvar e continuar
        </button>
      </div>

    </>
  )
}

export default ProfileCadastroUserJuridico
