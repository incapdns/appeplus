import { useState, FormEvent, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroVendedor.scss";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import "../../../styles/cadastroAnuncioImovel.scss";
import "../../../styles/anuncioimovel.scss";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { iDadosUsuario } from "../../../@types";
import Loader from "../../../components/Loader";
import Alert from "../../../components/Alert";

interface iQuestionario {
  codPergunta: number;
  descPergunta: string;
  codTipoPergunta: number;
  descTipoPergunta: string;
  possiveisRespostas: iPossivelResposta[];
}

interface iPossivelResposta {
  codPossivelResposta: number;
  descPossivelResposta: string;
}

interface iDataSelect {
  value?: number;
  label?: string;
}

interface iDataRespostas {
  codAvaliacaoImovel: number;
  codPergunta: number;
  resposta: number;
  codPossivelResposta: number;
}

export default function PesquisaImovel() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [checkedComprarImovel, setCheckedComprarImovel] = useState(false);
  const [questionario, setQuestionario] = useState<iQuestionario[]>([]);
  const [respostas, setRespostas] = useState<iDataRespostas[]>([]);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [stateRender, setStateRender] = useState(false);
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }
  useEffect(() => {
    checaUsuarioLogado();
    window.scrollTo(0, 0);
    GetQuestionario();
  }, [stateRender]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    api
      .post(`avaliacao-imovel/cadastro-resposta-black?codImovel=${codImovel}`, respostas)
      .then((response) => {
        console.log('handleSubmit - PesquisaImovel.tsx - response')
        history.push("/cadastro/imovel/finalizacao");
        setLoading(false);
      })
      .catch((error) => {
        console.log('handleSubmit - PesquisaImovel.tsx - error', error.response);
        setAlertErro(true);
        setMsgErro(error.response.data.message
          ? error.response.data.message
          : 'Houve um erro ao tentar efetuar concluir sua pesquisa, tente novamente mais tarde.');
        setLoading(false);
      });
  }

  async function GetQuestionario() {
    setLoading(true);
    await api
      .get(`questionario/listar-perguntas?codQuestionario=18`)
      .then((response) => {
        setQuestionario(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }



  return (
    <>
      <Navbar type="dark" />
      <div className="container col-lg-12 mt-5 mb-5">
        {loading ? (
          <div id="loading" className="divLoad">
            <Loader />
          </div>
        ) : (
          <form className="row g-3 col-lg-12 mt-5">
            <div className="wrapper col-lg-12 mt-1">
              <ol className="c-stepper">
                <li className="c-stepper__item col-lg-12">
                  <div className="c-stepper__content col-lg-11">
                    <h2 className="c-stepper__title">Conte-nos sobre você</h2>
                    {alertErro && (
                      <Alert msg={msgErro} setAlertErro={setAlertErro} />
                    )}
                    {questionario.map((pergunta: iQuestionario, index) => (
                      <div className="col-lg-10 row-gray" key={index}>
                        <div className="row mb-3 col-lg-12 mt-3">
                          <p>
                            <strong>{pergunta.descPergunta}</strong>
                          </p>
                        </div>
                        <div className="row mb-3 col-lg-12">
                          {pergunta.possiveisRespostas.map(
                            (resposta: iPossivelResposta) => (
                              <div className="col-lg-4 mb-1 inline-block">
                                <input
                                  className="form-check-input me-2"
                                  type={pergunta.descTipoPergunta}
                                  name={pergunta.descPergunta}
                                  value={resposta.codPossivelResposta}
                                  id="flexRadioDefault2"
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      let it: iDataRespostas = {
                                        codAvaliacaoImovel: 0,
                                        codPergunta: pergunta.codPergunta,
                                        codPossivelResposta: resposta.codPossivelResposta,
                                        resposta: 0
                                      };
                                      respostas.push(it);

                                    } else {
                                      let it: iDataRespostas = {
                                        codAvaliacaoImovel: 0,
                                        codPergunta: pergunta.codPergunta,
                                        codPossivelResposta: resposta.codPossivelResposta,
                                        resposta: 0
                                      };
                                      const index =
                                        respostas.indexOf(it);
                                      respostas.splice(index, 1);

                                    }
                                  }}
                                />
                                <p className="form-check-label inline-block ">
                                  {resposta.descPossivelResposta}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              </ol>
            </div>
            <div className="col-lg-10 mt-0 pt-4 row-gray text-end">
              <button className="buttonSalvar" onClick={handleSubmit}>
                {loading ? (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                /></>) : (<>Salvar e continuar</>)}

              </button>
            </div>
          </form>
        )}
        <div className="div-card-stepper-contain col-lg-3">
          <StepperAnuncioImovel
            Localizacao={true}
            Sobre={true}
            Imagens={true}
            Corretor={true}
            Documento={true}
            Diferenciais={true}
            Detalhes={true}
            codImovel={codImovel}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
