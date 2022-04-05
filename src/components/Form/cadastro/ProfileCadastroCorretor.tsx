import { useState, useCallback, useRef, FormEvent, useEffect } from 'react'
import '../../../styles/components/Form/profileCadastroUser.scss';
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";
import { useDropzone } from "react-dropzone";
import { Container, FileInfo, Preview, DropContainer, UploadMessage } from "../../../styles/components/Form/vender-arquivos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import validaCpf from '../../../utils/validaCpf';
import { cepMask, cpfMask, revertMask } from '../../../utils/Masks';
import Alert from '../../Alert';
import axios from 'axios';
import { FaQuestionCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import { iDadosUsuario, iDataSelect } from '../../../@types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import minify from '../../../utils/minify';
import parse from '../../../utils/parse';



interface iStep {
  setStep: (value: number) => void;
  codImovel: string;
  step: number;
  idImovel?: number | unknown;
}
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
  codArquivo: string;
  codTipoArquivo: string;
}
export interface IArquivo {
  formFile: IFile | undefined;
  nomeSocial: string;
  dtNascimento: string;
  teste: boolean;
  telefone: string;
}

export interface IArquivos {
  codArquivoCorretor?: number;
  codTipoArquivo?: number;
  nomeArquivo: string;
  url: string;
}


const ProfileCadastroUserCorretor = (props: IArquivo) => {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@appePlus/usuario') || '{}'
  );

  const history = useHistory();
  const [nacionalidade, setNacionalidade] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [uploadedFiles2, setUploadedFiles2] = useState<IFile[]>([]);
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [cidadeNascimento, setCidadeNascimento] = useState('');
  const [bairro, setBairro] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numeroEndereco, setNumeroEndereco] = useState('');
  const [numero, setNumero] = useState(false);
  const [numeroCreci, setNumeroCreci] = useState('');
  const [token, setToken] = useState('');
  const [ufEmissao, setUfEmissao] = useState('MG');
  const [comoConheceu, setComoConheceu] = useState('');
  const [comoNosConheceu, setComoNosConheceu] = useState<iDataSelect[]>([]);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const insertFocus = useRef<HTMLInputElement>(null);
  const [imgPerfil, setImgPerfil] = useState<IFile>();
  const [codigo, setCodigo] = useState('0')
  let [verificaNumeroCreci, setVerificaNumeroCreci] = useState<boolean>()

  const [loading, setLoading] = useState(false);
  const codCorretor = Number(localStorage.getItem('@appePlus/codCorretor'));

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
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
  function verificaCreci() {

    api.get(`/Corretor/validar-corretor?NumeroCreci=${numeroCreci}`).then(response => {
      verificaNumeroCreci = response.data.data;
      if (verificaNumeroCreci) {
        setAlertErro(true)
        setMsgErro('O número Creci já está registrado em nome de outro corretor.')
      } else {
        setAlertErro(false)
      }
    }).catch(error => {
      console.log(error)
    })
  }



  useEffect(() => {
    setImgPerfil(props.formFile);
    GetDadosPessoais();
    GetComoConheceu();
  }, [])

  async function GetDadosPessoais() {
    await api.get(`Corretor/buscar?codCorretor=${usuario.codCorretor}`)
      .then(response => {
        const res = response.data.data[0];
        console.log(res)
        // setUfEmissao('MG');
        res.numero && setNumeroEndereco(res.numero);
        res.numeroCreci && setNumeroCreci(res.numeroCreci);
        res.ufEmissaoCreci && setUfEmissao(res.ufEmissaoCreci);
        res.cpfcnpj && setCpf(res.cpfcnpj);
        res.rg && setRg(res.rg);
        res.tokenCadastro && setToken(res.tokenCadastro);
        if (res.cep) {
          res.cep && setCep(res.cep);
          handleCepEdicao(res.cep);
        }
        res.codOrigemCadastro && setComoConheceu(res.codOrigemCadastro);
        res.complemento && setComplemento(res.complemento);
        let newUploadedFiles: IFile;
        res.arquivos.map(async (arquivo: IArquivos) => {
          let count = 0;
          let file: File;

          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.open("GET", arquivo.url, true);
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.onload = function (e) {
            if (this.status == 200) {
              file = new File([this.response], arquivo.nomeArquivo, { type: "image/png" });
              newUploadedFiles = {
                file,
                id: String(arquivo.codArquivoCorretor),
                name: arquivo.nomeArquivo,
                readableSize: filesize(file.size),
                preview: arquivo.url,
                progress: 0,
                uploaded: false,
                error: false,
                url: "",
                codArquivo: String(arquivo.codArquivoCorretor),
                codTipoArquivo: String(arquivo.codTipoArquivo),
              };


              if (arquivo.codTipoArquivo == 3) {
                setUploadedFiles((state) => state.concat(newUploadedFiles));
              } else if (arquivo.codTipoArquivo == 6) {
                setUploadedFiles2((state) => state.concat(newUploadedFiles));
              } else {
                setImgPerfil(newUploadedFiles);
              }

              count = count + 1;
            }
          };
          xhr.send();
        });
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true)
    if (cpf === '' || rg === '' || cep === '' || endereco === '' || cidade === '' || bairro === ''
      || uf === '' || ufEmissao === '' || comoConheceu === '' || numeroCreci === '' || token === '' || numeroEndereco === '' || props.nomeSocial === "" ||
      props.dtNascimento === "") {
      setAlertErro(true);
      setLoading(false)
      setMsgErro('Você precisa preencher todos os campos obrigatórios. (*)');
      window.scrollTo(0, 0);
      return;
    }
    if (props?.formFile) {
      await api.put('Corretor/update', {
        "NomeSocial": props.nomeSocial,
        "DtNascimento": props.dtNascimento,
        "RG": rg,
        "CPFCNPJ": cpf,
        "NumeroCreci": numeroCreci,
        "UFEmissaoCreci": ufEmissao,
        "Cep": cep,
        "Endereco": endereco,
        "Numero": String(numeroEndereco),
        "Complemento": complemento,
        "Bairro": bairro,
        "Cidade": cidade,
        "UF": uf,
        "CodCorretor": usuario.codCorretor,
        "tokenCadastro": token,
        "codOrigemCadastro": comoConheceu,
        "Telefone": props.telefone
      })
        .then(response => {
          CadastrarImgPerfil();
        })
        .catch(error => {
          window.scrollTo(0, 0);
          setAlertErro(true);
          setMsgErro(error.response.data.message
            ? error.response.data.message
            : 'Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde.');
          setLoading(false)
        })
    } else {
      setLoading(false)
      setAlertErro(true);
      setMsgErro('É necessario inserir uma imagem de perfil.');
    }
  }

  async function CadastrarImgPerfil() {
    const formData = new FormData();

    let promises: any[] = [];

    if (props.teste && props?.formFile) {
      promises.push(minify(props.formFile.file as File).then(result => {
        formData.append(`FormFile`, result, parse(props.formFile?.name as string) + `|0|13`);
      }))
    } else if (imgPerfil?.file) {
      promises.push(minify(imgPerfil.file as File).then(result => {
        formData.append(
          `FormFile`,
          result,
          parse(imgPerfil?.name) + `|${imgPerfil?.codArquivo}|13`
        );
      }))
    }
    uploadedFiles.forEach((data, index) => {
      promises.push(minify(data.file as File).then(result => {
        formData.append(
          `FormFile`,
          result,
          parse(data.name) +
          `|${data.codArquivo}|${"3"}`
        );
      }));
    });

    uploadedFiles2.forEach((data, index) => {
      promises.push(minify(data.file as File).then(result => {
        formData.append(
          `FormFile`,
          result,
          parse(data.name) +
          `|${data.codArquivo}|${"6"}`
        );
      }));
    });

    Promise.all(promises).then(() => {
      api.post(`/arquivos-corretor/cadastrar?codCorretor=${usuario.codCorretor}`,
        formData
      )
        .then(response => {
          console.log(response.data);
          history.push('/cadastro/corretor/sobre-voce')

        })
        .catch(error => {
          setAlertErro(true);
          setMsgErro('Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde.');
        })
    })
  }


  async function AtualizarStatusCadastro() {
    await api
      .patch(`Corretor/atualizar-status-cadastro?CodCorretor=${usuario.codCorretor}&StatusCadastro=1`)
      .then((response) => {
        history.push('/cadastro/corretor/sobre-voce')
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  // async function CadastrarArquivo() {
  //   const formData = new FormData();
  //   uploadedFiles.map((data, index) => {
  //     formData.append(
  //       `FormFile`,
  //       data.file,
  //       data.name +
  //         `|${data.codArquivo}|${"3"}`
  //     );
  //   });
  //   uploadedFiles2.map((data, index) => {
  //     formData.append(
  //       `FormFile`,
  //       data.file,
  //       data.name +
  //         `|${data.codArquivo}|${"6"}`
  //     );
  //   });
  //   api.post(`/arquivos-corretor/cadastrar?codCorretor=${codCorretor}`,
  //     formData
  //   )
  //     .then(response => {
  //       console.log(response.data);
  //       history.push('/cadastro/corretor/sobre-voce')
  //     })
  //     .catch(error => {
  //       setAlertErro(true);

  //       setMsgErro('Favor informar ao menos uma Imagem.');
  //     })
  // }


  async function GetComoConheceu() {
    await api.get('origemCadastro/buscar/autoComplete')
      .then(response => {
        setComoNosConheceu(response.data.data);
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      })
  }

  function handleCpf() {
    if (!validaCpf(cpf) || cpf.length !== 11) {
      setMsgErro("CPF inválido !")
      setAlertErro(true)
      return;
    }

    api
      .get(`/corretor/verificar-cpf-telefone?cpf=${cpf}`)
      .then((response) => {
        if (response.data.data > 0) {
          setAlertErro(true);
          setMsgErro(
            "O número de CPF informado já está vinculado a outro usuário da plataforma."
          );
          setCpf("");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleCepEdicao(GetCep: string) {
    await axios.get(`https://viacep.com.br/ws/${GetCep}/json/`).then(response => {
      setEndereco(response.data.logradouro);
      setCidade(response.data.localidade);
      setBairro(response.data.bairro);
      setUf(response.data.uf);
    })
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
        files.map((file: File) => {
          if (!file.name.toLowerCase().includes('.jpg') && !file.name.toLowerCase().includes('.png') && !file.name.toLowerCase().includes('.jpeg')) {
            setAlertErro(true);
            setMsgErro('Extensão de arquivo não suportada');
            return;
          }
        })

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
          codTipoArquivo: "0",
          codArquivo: "0"
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
        return <UploadMessage>Clique aqui para upload ou arraste os documentos aqui.</UploadMessage>;
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

  function UploadArquivos2() {

    const handleUpload = useCallback(
      (files: File[]) => {
        files.map((file: File) => {
          if (!file.name.toLowerCase().includes('.jpg') && !file.name.toLowerCase().includes('.png') && !file.name.toLowerCase().includes('.jpeg')) {
            setAlertErro(true);
            setMsgErro('Extensão de arquivo não suportada');
            return;
          }
        })

        const newUploadedFiles2: IFile[] = files.map((file: File) => ({
          file,
          id: uuidv4(),
          name: file.name,
          readableSize: filesize(file.size),
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false,
          error: false,
          url: "",
          codTipoArquivo: "0",
          codArquivo: "0"
        }));

        setUploadedFiles2((state) => state.concat(newUploadedFiles2));
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
        return <UploadMessage>Clique aqui para upload ou arraste os documentos aqui.</UploadMessage>;
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
  const deletePreviewPhotoFisica = (id: any) => {
    const newArray = uploadedFiles.filter((file) => file.id !== id)
    setUploadedFiles(newArray)

  }
  const deletePreviewPhotoFisica2 = (id: any) => {
    const newArray = uploadedFiles2.filter((file) => file.id !== id)
    setUploadedFiles2(newArray)

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
                  <p style={{ margin: `0`, width: '100px', height: '20px', textOverflow: 'ellipsis', overflow: 'hidden', direction: 'ltr' }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button className="btnExcluir" onClick={() => deletePreviewPhotoFisica(uploadedFile.id)}>
                        x
                      </button>
                    )}
                  </span>
                </div>
              </FileInfo>
            </li>
          ))}
        </Slider>


      </Container>
    );
  };
  const FileListArquivos2 = () => {
    return (
      <Container>
        <Slider {...settings}>
          {uploadedFiles2.map((uploadedFile: IFile) => (
            <li key={uploadedFile.id}>
              <FileInfo >
                <Preview src={uploadedFile.preview} />
                <div>
                  <p style={{ margin: `0`, width: '100px', height: '20px', textOverflow: 'ellipsis', overflow: 'hidden', direction: 'ltr' }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button className="btnExcluir" onClick={() => deletePreviewPhotoFisica2(uploadedFile.id)}>
                        x
                      </button>
                    )}
                  </span>
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
      <div className="row-gray" />
      {alertErro && (
        <Alert msg={msgErro} setAlertErro={setAlertErro} />
      )}
      <div className="col-lg-8 col-12 my-5 d-flex align-items-center flex-wrap ">
        <h1 className="title">Dados pessoais</h1>
      </div>

      {/* <div className="col-lg-9 mb-3">
        <div className="col-12 col-lg-12 ">
          <p>Nacionalidade e cidade de nascimento<span style={{ color: '#FF715B' }}>*</span></p>
        </div>
        <div className="row">
          <div className="col-6 col-lg-4 ">
            <select className="form-select" value={nacionalidade} onChange={({ target }) => setNacionalidade(target.value)} aria-label="Default select example" >
              <option value="" disabled >Nacionalidade</option>
              <option value="brasileira">Brasileira</option>
              <option value="francesa">Francesa</option>
              <option value="portuguesa">Portuguesa</option>
            </select>
          </div>
          <div className="col-6 col-lg-4 ">
            <input type="text" className="form-control" required placeholder="Cidade de nascimento"
              onChange={({ target }) => setCidadeNascimento(target.value)}
            />
          </div>
        </div>
      </div> */}

      <div className="col-lg-12">
        <div className="row mb-3">
          <div className="col-12 col-lg-12 mb-1">
            <p>Dados pessoais<span style={{ color: '#FF715B' }}>*</span></p>
          </div>
          <div className="col-12 col-lg-3 mb-1">
            <input type="text" className="form-control" value={cpfMask(cpf)} maxLength={14} onChange={event => { setCpf(revertMask(event.target.value)) }} required placeholder="CPF" onBlur={handleCpf} />
          </div>
          <div className="col-12 col-lg-3 mb-1">
            <input type="text" className="form-control" required placeholder="RG" value={rg}
              onChange={({ target }) => setRg(target.value)}
            />
          </div>
        </div>
      </div>


      <div className="col-lg-12 mb-3">
        <p>Dados residenciais<span style={{ color: '#FF715B' }}>*</span></p>
        <div className="col-lg-12 ">
          <div className="row mb-3">
            <div className="col-12 col-lg-3 mb-1">
              <input type="text" className="form-control" autoComplete="no" id="inputCep" maxLength={9} value={cepMask(cep)} onChange={event => { setCep(revertMask(event.target.value)) }} onBlur={handleCep} required placeholder="CEP" />
            </div>
            <div className="col-12 col-lg-7 mb-1">
              <input type="text" className="form-control" value={endereco} disabled onChange={event => setEndereco(event.target.value)} placeholder="Endereço sem número" />
            </div>
            <div className="col-12 col-lg-2 mb-1">
              <input type="text" className="form-control" required ref={insertFocus} placeholder="Número" value={numeroEndereco}
                onChange={({ target }) => setNumeroEndereco(target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-1" >
              <input type="text" className="form-control" placeholder="Complemento" value={complemento}
                onChange={({ target }) => setComplemento(target.value)}
              />
            </div>
            <div className="col-12 col-lg-2 mb-1">
              <input type="text" className="form-control" disabled value={uf} onChange={event => setUf(event.target.value)} placeholder="Estado" />
            </div>
            <div className="col-12 col-lg-2 mb-1">
              <input type="text" className="form-control" disabled value={cidade} onChange={event => setCidade(event.target.value)} placeholder="Cidade" />
            </div>
            <div className="col-12 col-lg-2 mb-1">
              <input type="text" className="form-control" disabled value={bairro} onChange={event => setBairro(event.target.value)} placeholder="Bairro" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-lg-3 mb-1">
          <p>Nº do Creci:<span style={{ color: '#FF715B' }}>*</span>
            <OverlayTrigger
              placement={'top'}
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip>
                  Para ser um(a) corretor(a) parceiro(a) você precisa ter um registro no CRECI ativo e válido nas regiões de atuação da plataforma.
                </Tooltip>
              }
            >
              <button className='tooltip-text' disabled><FaQuestionCircle fontSize={14} color={"#c4c4c4"} className="icone" /></button>
            </OverlayTrigger>

          </p>
          <input type="text" className="form-control" onBlur={verificaCreci} required placeholder="Nº do Creci" value={numeroCreci}
            onChange={({ target }) => setNumeroCreci(target.value)}
          />

        </div>
        <div className="col-12 col-lg-3 mb-1">
          <p>UF de emissão<span style={{ color: '#FF715B' }}>*</span></p>
          <select className="form-select" value={ufEmissao} onChange={({ target }) => setUfEmissao(target.value)} >
            <option value="" disabled >UF</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RR">Roraima</option>
            <option value="RO">Rondônia</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        <div className="col-12 col-lg-1 mb-1 "></div>
        <div className="col-12 col-lg-3 mb-1 ml-lg-2 ml-0" >
          <p>Token:<span style={{ color: '#FF715B' }}>*</span>
            <OverlayTrigger
              placement={'top'}
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip>
                  Para se cadastrar, você precisa ter um Token enviado pela plataforma ou por algum corretor que te indicou. Excepcionalmente a critério da plataforma, este dado pode não ser obrigatório.
                </Tooltip>
              }
            >
              <button className='tooltip-text' disabled><FaQuestionCircle fontSize={14} color={"#c4c4c4"} className="icone" /></button>
            </OverlayTrigger>
          </p>
          <input type="text" className="form-control" required placeholder="Nº do Token" value={token}
            onChange={({ target }) => setToken(target.value)}
          />
        </div>
      </div>

      <div className="col-lg-9 ">
        <p>Como nos conheceu<span style={{ color: '#FF715B' }}>*</span></p>
        <div className="row">
          <div className="col-6 col-lg-4">
            <select className="form-select" value={comoConheceu} onChange={({ target }) => setComoConheceu(target.value)} aria-label="Default select example" >
              <option value="" disabled >Como conheceu</option>
              {comoNosConheceu.map((conheceu) => {
                return (
                  <option value={conheceu.value}>
                    {conheceu.label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 row-gray" id="teste"></div>
      <div className="col-lg-8 col-12 d-flex align-items-center flex-wrap ">
        <h1 className="title">Meus Documentos</h1>
      </div>
      <div className="col-lg-12">
        <p>Olá. A seguir precisamos que nos envie um documento de identificação e seu comprovante de endereço. Estes documentos estarão seguros, são de uso exclusivo da plataforma e tem por objetivo preservar sua segurança e de todos os demais usuários da plataforma. Se neste momento, não for possível nos enviar, você pode seguir normalmente com o restante do seu cadastro. Assim que possível, retorne e envie os documentos, deixando seu cadastro completo, o que permitirá que você comece a utilizar a plataforma.</p>
      </div>

      <div className="col-lg-12 mt-5">
        <p>Faça o Upload do seu RG, CPF ou CNH<span style={{ color: '#FF715B' }}>*</span></p>
      </div>
      <div className="col-lg-12 msg-upload">
        <span>Ao realizar o upload do seus documento, certifique-se de enviar a frente e o verso do documento, garantido a possibilidade de averiguarmos foto, as numerações de CPF e RG, bem como a data e emissão e validade do documento</span>
      </div>
      <div className="col-lg-12 msg-upload">
        <span>Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e *png.</span>
      </div>


      <div className="col-md-3 col-12 mb-4">
        <UploadArquivos></UploadArquivos>
      </div>
      <div className="col-md-9 col-12 mb-4">
        <FileListArquivos></FileListArquivos>
      </div>

      <div className="col-lg-12 mt-5 ">
        <p>Faça o Upload do seu comprovante de residência<span style={{ color: '#FF715B' }}>*</span></p>
      </div>
      <div className="col-lg-12 msg-upload">
        <span>São válidos e aceitos como comprovantes de endereço os seguintes tipo de conta: água, luz, gás, TV, internet, telefone fixo e celular.</span>
      </div>
      <div className="col-lg-12 msg-upload">
        <span>Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e *png.</span>
      </div>

      <div className="col-md-3 col-12 mb-4">
        <UploadArquivos2></UploadArquivos2>
      </div>
      <div className="col-md-9 col-12 mb-4">
        <FileListArquivos2></FileListArquivos2>
      </div>
      <div className="col-lg-12 mt-0 pt-4 row-gray text-end" >
        <button className="buttonSalvar" onClick={handleSubmit} >
          {loading ? (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /></>)
            : (<>Salvar e continuar</>)}

        </button>
      </div>
    </>
  )
}

export default ProfileCadastroUserCorretor
