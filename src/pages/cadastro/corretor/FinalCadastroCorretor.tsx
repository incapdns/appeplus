import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import { iCorretor, iDadosUsuario } from "../../../@types";
import "../../../styles/finalCadastroCorretor.scss";
import "../../../styles/components/Cards/selecaoCorretor.scss";
import { FaArrowRight, FaCheckCircle, FaRegClock } from "react-icons/fa";
import SelecaoCorretor from "../../../components/Cards/SelecaoCorretor";
import ProgressoLateralCorretor from "../../../components/Cards/ProgressoLateralCorretor";
import CardCorretor from "../../../components/Cards/Corretor";
import api from "../../../services/api";
import { useHistory, useLocation } from "react-router-dom";
import { StepperCadastroCorretor } from "../../../components/StepperCadastroCorretor";

export default function FinalCadastroCorretor() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const history = useHistory();
  const [getDados, setGetDados] = useState<iCorretor[]>([]);
  const location: any = useLocation();
  const [edicao, setEdicao] = useState(location?.state?.edicao);
  let [status, setStatus] = useState(0);

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  const codCorretor = usuario.codCorretor;

  function getDadosCorretor() {
    api
      .get(`Corretor/buscar?codCorretor=${codCorretor}`)
      .then((response) => {
        setGetDados(response.data.data);
        console.log(
          "🚀 ~ file: FinalCadastroCorretor.tsx ~ line 34 ~ .then ~ response.data.data",
          response.data.data
        );
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    checaUsuarioLogado();
    getDadosCorretor();
    GetStatusCadastro();
  }, []);

  async function GetStatusCadastro() {
    await api
      .get(`Corretor/buscar-status-cadastro?codCorretor=${usuario.codCorretor}`)
      .then((response) => {
        const res = response.data.data;
        status = res;
        setStatus(res);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }


  return (
    <>
      <Navbar />
      <div className="container mt-5" id="final-cadastro-corretor">
        <div className="col-lg-12 row">
          <div className="col-lg-9 ">
            <section>
              <div className="row">
                <div className="col-lg-12 mt-5 mb-4">
                  <h1 className="title" style={{ paddingTop: 20 }}>
                  Parabéns! Cadastro realizado com sucesso!
                  </h1>
                </div>
              </div>
              <div className="col-lg-10 mb-5">
                <p className="texto">
                Agora nossa equipe vai analisar suas informações e documentos. Se estiver tudo ok, em breve você receberá nosso e-mail, com a aprovação do seu cadastro. Fique Atento!
                </p>
                <p className="texto">
                Assim que você estiver ativo na plataforma, o próximo passo será você cadastrar clientes, imóveis e começar a fazer muitos negócios. Desejamos muito sucesso nesta parceria!
                </p>
              </div>
            </section>
            <div className="mt-5 row-gray col-lg-10"></div>
            <section className="cardCorretor col-lg-10">
              <div className="row">
                <div className="col-lg-6 ">
                  {getDados.map((dado) => {
                    return (
                      <SelecaoCorretor
                        nomeCompleto={dado.nomeCompleto}
                        numeroCreci={dado.numeroCreci}
                        dtCadastro={dado.dtCadastro}
                        mediaAvaliacao={dado.mediaAvaliacao}
                        nomeSocial={dado.nomeSocial}
                        img={dado.img[0]}
                      />
                    );
                  })}
                </div>
                <div className="col-lg-6 colunaSituacao">
                  <div className="row">
                    <div className="linha-vertical col-lg-1"></div>
                    <div className="col-lg-9">
                      <p className="cardSubtitle">Situação cadastral</p>
                      <h4 className="cardTitle">
                        Sob análise{" "}
                        <FaRegClock
                          fontSize={18}
                          color={`#4BB7F1`}
                          style={{ marginLeft: 5 }}
                        />
                      </h4>
                      <p style={{ lineHeight: 1 }}>
                        Dados pessoais{" "}
                        <FaCheckCircle
                          fontSize={16}
                          color={`#4BB7F1`}
                          style={{ marginLeft: 5 }}
                        />
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Dados profissionais{" "}
                        <FaCheckCircle
                          fontSize={16}
                          color={`#4BB7F1`}
                          style={{ marginLeft: 5 }}
                        />
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Atuação e Creci{" "}
                        <FaCheckCircle
                          fontSize={16}
                          color={`#4BB7F1`}
                          style={{ marginLeft: 5 }}
                        />
                      </p>
                      <p style={{ lineHeight: 1, marginBottom: 0 }}>
                        Extras{" "}
                        <FaCheckCircle
                          fontSize={16}
                          color={`#4BB7F1`}
                          style={{ marginLeft: 5 }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {usuario.codStatus == 3 || status == 5 ? (
              <section>
                <div className="col-lg-10 mt-5">
                  {/* <p className="texto">
                    Seu cadastro esta sendo avaliado pela equipe do AppêPlus e logo logo esta disponivel para juntos transformarmos o mercado imobiliário!
                  </p> */}
                </div>
              </section>
            ) : (
              <section>
                <div className="col-lg-10 mt-5">
                  <p className="texto">
                  Queremos te conhecer melhor, pois acreditamos que você é peça fundamental no mercado imobiliário.
                  </p>
                  <p className="texto">
                  Pensando nisso, elaboramos uma rápida pesquisa que irá nos ajudar a entender  o perfil dos nossos parceiros, perspectivas, necessidades e dificuldades. Com sua ajuda, esperamos transformar o mercado imobiliário! Contamos com seu apoio!
                  </p>
                </div>
                <div className="col-lg-12 mt-0 pt-4 ">
                  <button
                    className="buttonPesquisa"
                    onClick={() => {
                      history.push("/cadastro/corretor/pesquisa");
                    }}
                  >
                    Preencher pesquisa{" "}
                    <FaArrowRight style={{ marginLeft: 20, fontSize: 18 }} />
                  </button>
                </div>
              </section>
            )}
          </div>

          <div className="col-lg-3 mt-5 card-progresso">
          <StepperCadastroCorretor
              dadosPessoais
              uploadDocumento
              uploadComprovante
              sobreVoce
              informacoesExtras
              suasEspecialidades
              localDeAtuacao
              dataHoraAtuacao
              dadosBancarios
              editar={edicao}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
