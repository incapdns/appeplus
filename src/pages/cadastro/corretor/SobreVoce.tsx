import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Slider, { SliderTooltip } from "rc-slider";
import { AiFillInfoCircle } from "react-icons/ai";
import { FiSave, FiInstagram, FiYoutube } from "react-icons/fi";
import {
  TiSocialLinkedinCircular,
  TiSocialFacebookCircular,
} from "react-icons/ti";
import { useHistory, useLocation } from "react-router-dom";
import { iDadosUsuario } from "../../../@types";

import "../../../styles/pages/cadastro/corretor/geral.scss";

import "rc-slider/assets/index.css";
import api from "../../../services/api";
import { StepperCadastroCorretor } from "../../../components/StepperCadastroCorretor";
import Alert from "../../../components/Alert";

const { Handle } = Slider;

const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} ${value > 1 ? "anos" : "ano"}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export default function SobreVoce() {
  const history = useHistory();
  const location: any = useLocation();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [edicao, setEdicao] = useState(location?.state?.edicao);
  console.log(
    "🚀 ~ file: SobreVoce.tsx ~ line 42 ~ SobreVoce ~ edicao",
    edicao
  );
  const [rangeTempo, setRangeTempo] = useState(0);
  const [checkedVeiculo, setCheckedVeiculo] = useState(false);
  const [reedicao, setReedicao] = useState(false);
  const [nomeApelido, setNomeApelido] = useState("");
  const [papelCorretor, setPapelCorretor] = useState("");
  const [nivelEscolar, setNivelEscolar] = useState("");
  const [curso, setCurso] = useState("");
  const [inputLinkedin, setInputLinkedin] = useState("");
  const [inputFacebook, setInputFacebook] = useState("");
  const [inputInstagram, setInputInstagram] = useState("");
  const [inputYoutube, setInputYoutube] = useState("");
  const [loading, setLoading] =useState(false)
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [error, setError] = useState("");

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  function SetTempo(value: any) {
    setRangeTempo(value);
  }

  useEffect(() => {
    checaUsuarioLogado();
    window.scrollTo(0, 0);
    GetSobreVoce();
  }, []);

  async function GetSobreVoce() {
    await api
      .get(`Corretor/sobre-voce?codCorretor=${usuario.codCorretor}`)
      .then((response) => {
        const res = response.data.data;
        console.log("🚀 ~ file: SobreVoce.tsx ~ line 77 ~ .then ~ res", res);
        res.tempoAtuacao && setRangeTempo(res.tempoAtuacao);
        res.nomeCompleto && setNomeApelido(res.nomeCompleto);
        res.papelComoCorretor && setPapelCorretor(res.papelComoCorretor);
        res.codEscolaridade && setNivelEscolar(String(res.codEscolaridade));
        res.cursoGraduacao && setCurso(res.cursoGraduacao);
        res.possuiVeiculoProprio && setCheckedVeiculo(res.possuiVeiculoProprio);
        res.urlLinkedin && setInputLinkedin(res.urlLinkedin);
        res.urlFacebook && setInputFacebook(res.urlFacebook);
        res.urlInstagram && setInputInstagram(res.urlInstagram);
        res.urlYoutube && setInputYoutube(res.urlYoutube);
        if (res.tempoAtuacao) {
          setReedicao(true);
        }

        //   {
        //     "codEscolaridade": 1,
        //     "tempoAtuacao": 10,
        //     "papelComoCorretor": "autonomo",
        //     "cursoGraduacao": null,
        //     "possuiVeiculoProprio": true,
        //     "urlLinkedin": null,
        //     "urlFacebook": null,
        //     "urlInstagram": null,
        //     "urlYoutube": null
        // }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function dadosUserCorretor() {
    // const codEscolar = Number(nivelEscolar)
    setLoading(true)
    if(nivelEscolar == '1' && curso == ''){
      setMsgErro('Falta o preenchimento da formação!');
      setAlertErro(true)
      setLoading(false)
    }else{
      if(nomeApelido == '' || nivelEscolar == '' ||  papelCorretor == ''){
        setMsgErro('É necessário o preenchimento das informações sobre você.');
        setAlertErro(true)
        setLoading(false)
      }else{
       await api
        .patch(
          `Corretor/sobre-voce?CodEscolaridade=${nivelEscolar}&TempoAtuacao=${rangeTempo}&PapelComoCorretor=${papelCorretor}&CursoGraduacao=${curso}&PossuiVeiculoProprio=${checkedVeiculo}&URLLinkedin=${inputLinkedin}&URLFacebook=${inputFacebook}&URLInstagram=${inputInstagram}&URLYoutube=${inputYoutube}&codCorretor=${usuario.codCorretor}`
        )
        .then((response) => {
          AtualizarStatusCadastro();
        })
        .catch((error) => {
          setLoading(false)
          console.log("Ocorreu um erro");
        });
      }
    }

   
    
  }


  async function AtualizarStatusCadastro() {
    await api
      .patch(`Corretor/atualizar-status-cadastro?CodCorretor=${usuario.codCorretor}&StatusCadastro=2`)
      .then((response) => {
        if(response.data.success){
          setLoading(false);
          history.push("/cadastro/corretor/atuacao");
        }
        
        
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container" id="corretorSobreVoce">
        <div className="row">
          <div className="col-lg-9">
            <div className="wrapper">
              <ol className="c-stepper">
                <li className="c-stepper__item">
                  <div className="c-stepper__content">
                    <h2 className=" c-stepper__title">Sobre você</h2>
                    <div className="mb-5" style={{ maxWidth: 512 }}>
                      <label
                        htmlFor="inputNome"
                        className="form-label label-nome"
                      >
                        Como prefere ser chamado, ou é conhecido no mercado?
                        <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputNome"
                        value={nomeApelido}
                        onChange={(event) => {
                          setNomeApelido(event.target.value);
                        }}
                        placeholder="Nome ou apelido"
                        aria-describedby="nome"
                      />
                    </div>
                    <div className="mb-5" style={{ maxWidth: 512 }}>
                      <p>
                        Há quanto tempo atua como corretor?<span>*</span>
                      </p>

                      {reedicao ? (
                        rangeTempo ? (
                          <Slider
                            min={1}
                            max={50}
                            value={rangeTempo}
                            handle={handle}
                            onChange={SetTempo}
                          />
                        ) : null
                      ) : (
                        <Slider
                          min={1}
                          max={50}
                          value={rangeTempo}
                          handle={handle}
                          onChange={SetTempo}
                        />
                      )}

                      <div className="row">
                        <div className="col min">1 ano</div>
                        <div className="col max d-flex justify-content-end">
                          50 anos
                        </div>
                      </div>
                    </div>
                    <div className="mb-5" style={{ maxWidth: 512 }}>
                      <p>
                        Atualmente seu papel como corretor é:<span>*</span>{" "}
                        <AiFillInfoCircle color="#C7C7C7" />
                      </p>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="corretor-conciliado"
                          name="papelCorretor"
                          onChange={({ target }) =>
                            setPapelCorretor(target.value)
                          }
                          id="corretorConciliado"
                          checked={papelCorretor === "corretor-conciliado"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="corretorConciliado"
                        >
                          Corretor conciliando com outra profissão formal
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          value="autonomo"
                          type="radio"
                          name="papelCorretor"
                          onChange={({ target }) =>
                            setPapelCorretor(target.value)
                          }
                          id="corretorAutonomo"
                          checked={papelCorretor === "autonomo"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="corretorAutonomo"
                        >
                          Apenas corretor autônomo
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="autonomo-imobiliaria"
                          name="papelCorretor"
                          onChange={({ target }) =>
                            setPapelCorretor(target.value)
                          }
                          id="corretorComImobiliaria"
                          checked={papelCorretor === "autonomo-imobiliaria"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="corretorComImobiliaria"
                        >
                          Corretor autônomo e tem sua imobiliária
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="corretor-parceria"
                          name="papelCorretor"
                          onChange={({ target }) =>
                            setPapelCorretor(target.value)
                          }
                          id="corretorParceria"
                          checked={papelCorretor === "corretor-parceria"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="corretorParceria"
                        >
                          Atuo em parceria com alguma imobiliária
                        </label>
                      </div>
                    </div>
                    <div className="mb-5" style={{ maxWidth: 700 }}>
                      <p>
                        Qual seu nível de escolaridade e curso (se aplicável)
                       <span>*</span>
                      </p>
                      <div className="row">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                          <select
                            className="form-select"
                            value={nivelEscolar}
                            onChange={({ target }) =>
                              setNivelEscolar(target.value)
                            }
                            aria-label="Curso"
                          >
                            <option value="0">Escolha um nível</option>
                            <option value="1">Ensino superior completo</option>
                            <option value="2">
                              Ensino superior incompleto
                            </option>
                            <option value="3">Ensino médio</option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          {nivelEscolar == '1' && (
                            <input
                            type="text"
                            className="form-control"
                            value={curso}
                            onChange={({ target }) => {
                              setCurso(target.value);
                            }}
                            id="curso"
                            aria-describedby="curso"
                            placeholder="Formação"
                          />

                          )}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="c-stepper__item">
                  <div className="c-stepper__content col-lg-12">
                    <h2 className="c-stepper__title">Informações extras</h2>
                    <p>Você possui veículo próprio ?</p>
                    <div className="d-flex align-items-center flex-wrap box-checked-row py-4">
                      <div
                        className={`checked-box d-flex align-items-center ${
                          checkedVeiculo && "activeSelect"
                        }`}
                      >
                        <div
                          className={`box-input-checked d-flex align-items-center justify-content-around mr-1 ${
                            checkedVeiculo && "activeSelect"
                          }`}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={checkedVeiculo}
                            onChange={({ target }) =>
                              setCheckedVeiculo(target.checked)
                            }
                            name="flexRadioDefault"
                          />
                        </div>
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Sim, possuo veiculo próprio
                        </label>
                      </div>
                    </div>
                    <div className="mb-5">
                      <p>
                        Informe suas redes sociais 
                      </p>
                      <div className="row">
                        <div className="col-lg-4 mb-3 mb-lg-0">
                          <div className=" d-flex align-items-center justify-content-around mt-4">
                            <div className="input-group-prepend mx-1">
                              <TiSocialLinkedinCircular fontSize={24} />
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="inputLinkedin"
                              placeholder="Linkedin.com/seunome"
                              value={inputLinkedin}
                              onChange={({ target }) => {
                                setInputLinkedin(target.value);
                              }}
                              aria-label="inputLinkedin"
                              aria-describedby="Linkedin"
                            />
                          </div>
                          <div className=" d-flex align-items-center justify-content-around mt-4">
                            <div className="input-group-prepend mx-1">
                              <TiSocialFacebookCircular fontSize={24} />
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="inputFacebook"
                              placeholder="Facebook.com/seunome"
                              value={inputFacebook}
                              onChange={({ target }) => {
                                setInputFacebook(target.value);
                              }}
                              aria-label="UserinputFacebookname"
                              aria-describedby="Facebook"
                            />
                          </div>
                          <div className=" d-flex align-items-center justify-content-around mt-4">
                            <div className="input-group-prepend mx-1">
                              <FiInstagram fontSize={24} />
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="inputInstagram"
                              placeholder="Instagram.com/seunome"
                              value={inputInstagram}
                              onChange={({ target }) => {
                                setInputInstagram(target.value);
                              }}
                              aria-label="inputInstagram"
                              aria-describedby="Instagram"
                            />
                          </div>
                          <div className=" d-flex align-items-center justify-content-around mt-4">
                            <div className="input-group-prepend mx-1">
                              <FiYoutube fontSize={24} />
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="inputYoutube"
                              placeholder="Youtube.com/seunome"
                              value={inputYoutube}
                              onChange={({ target }) => {
                                setInputYoutube(target.value);
                              }}
                              aria-label="inputYoutube"
                              aria-describedby="Youtube"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <hr />
            <div className="action-button d-flex justify-content-end mb-3">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={dadosUserCorretor}
              >
                {loading ?
                 (<>{edicao ? (<>Salvando edição</>) : (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                /></>)}</>)
                :(<>{edicao ? "Salvar edição" : "Salvar"} e continuar <FiSave /></>)}
                
                
              </button>
            </div>
            {alertErro && (
                <div className="mt-3 mb-0">
                  <Alert msg={msgErro} setAlertErro={setAlertErro} />
                </div>
					    )}
          </div>

          <div className="col-lg-3">
            <StepperCadastroCorretor
              dadosPessoais
              uploadDocumento
              uploadComprovante
              editar={edicao}
            />
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
