import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/finalCadastroImovel.scss";
import "../../../styles/components/Cards/selecaoCorretor.scss";
import { FaArrowRight, FaCheckCircle, FaRegClock } from "react-icons/fa";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import { iDadosUsuario, iImovel, tipoUsuario } from "../../../@types";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import ImovelCardAnuncio from "../../../components/Cards/ImovelCardAnuncio";
import { MdVerified, MdExitToApp } from "react-icons/md";
import { useHistory } from "react-router-dom";

export default function FinalCadastroImovel() {
  const history = useHistory();
  const [imovel, setImovel] = useState({} as iImovel);
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  // const codImovel = 244;
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
    GetImovel();
  }, []);

  async function GetImovel() {
    api
      .get(`imovel/selecao?codImovel=${codImovel}`)
      .then(async (response) => {
        if (response.data.data.codStatusAnuncio == 0) {
          response.data.data.codStatusAnuncio = 4;
        }
          setImovel(response.data.data);
        console.log(imovel)
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function handleSubmit() {
    if (imovel?.codStatusAnuncio == 1) {
      history.push("/cadastro/imovel/anuncioAzul/corretor");
    }
    if (imovel?.codStatusAnuncio == 2) {
      history.push("/cadastro/imovel/anuncioLaranja/diferenciaisImovel");
    }
    if (imovel?.codStatusAnuncio == 3) {
      history?.push("/cadastro/imovel/anuncioBlack/pesquisa");
    }
    if (imovel?.codStatusAnuncio == 4) {
      if(!!usuario.codCorretor){
        history.push("/dashboard/corretor/imoveis");
      }
      if(!!usuario.codCliente){
        history.push("/dashboard/meus-imoveis");
      }
     
    }
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container mb-5" id={"cadastroImovel"}>
        <div className="col-lg-12 row">
          <div className="col-lg-9">
            <section>
              <div className="row">
                <div className="col-lg-12 mt-2 mb-4">
                  <h1 className="title" style={{ paddingTop: 20 }}>
                    Pronto, seu anúncio foi criado!
                  </h1>
                </div>
              </div>
              <div className="col-lg-12 mb-5">
                <p className="texto">
                Parabéns! Esta primeira e importante etapa, para a criação do anúncio do seu imóvel, a ser exibido em todas as nossas plataformas, foi concluído. Abaixo você já pode ver uma pequena prévia do seu anúncio.
                Fique atento se você não deixou de preencher nenhum dado, para assim garantir que seu imóvel tenha um Anúncio Plus, com muito mais destaque e relevância.
                Quanto mais detalhes você nos passar sobre seu imóvel, mais nossos corretores poderão lhe ajudar no sucesso da venda e mais visibilidade você terá para atrair  os melhores e mais interessados compradores.

                </p>
              </div>
            </section>
            <div className="mt-5 row-gray col-lg-12"></div>
            <section className="sectionCardImovel col-lg-12">
              <div className="row">
                <div className="col-lg-5 colunaSituacao">
                  <div className="row">
                    <div className="linha-vertical-azul-left col-lg-1"></div>
                    <div className="col-lg-9">
                      <p className="cardSubtitle">Seu anuncio é:</p>
                      {imovel?.codStatusAnuncio == 1 ? (
                        <div>
                          <h4 className="cardTitle">
                            Anuncio Simples{" "}
                            <MdVerified
                              fontSize={25}
                              color={"#E1E1E1"}
                              style={{ marginLeft: 5 }}
                            />
                          </h4>
                          <p style={{ lineHeight: 1 }}>
                            Não recebe contato ou visita{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#E1E1E1"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1 }}>
                            Sem detalhes do imóvel{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#E1E1E1"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1, marginBottom: 0 }}>
                            Baixa relevância na exibição{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#E1E1E1"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {imovel?.codStatusAnuncio == 2 ? (
                        <div>
                          <h4 className="cardTitle">
                            Anuncio Azul{" "}
                            <MdVerified
                              fontSize={25}
                              color={"#0065DD"}
                              style={{ marginLeft: 5 }}
                            />
                          </h4>
                          <p style={{ lineHeight: 1 }}>
                            Pode receber contato e visita{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#0065DD"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1 }}>
                            Sem detalhes do imóvel{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#0065DD"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1, marginBottom: 0 }}>
                            Média relevância de exibição{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#0065DD"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {imovel?.codStatusAnuncio == 3 ? (
                        <div>
                          <h4 className="cardTitle">
                            Anuncio Laranja{" "}
                            <MdVerified
                              fontSize={25}
                              color={"#FD4A19"}
                              style={{ marginLeft: 5 }}
                            />
                          </h4>
                          <p style={{ lineHeight: 1 }}>
                            Pode receber contato e visita{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#FD4A19"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1 }}>
                            Detalhes completos do imóvel{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#FD4A19"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1, marginBottom: 0 }}>
                            Alta relevância de exibição{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#FD4A19"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {imovel?.codStatusAnuncio == 4 ? (
                        <div>
                          <h4 className="cardTitle">
                            Anuncio Plus{" "}
                            <MdVerified
                              fontSize={25}
                              color={"#2E2E2E"}
                              style={{ marginLeft: 5 }}
                            />
                          </h4>
                          <p style={{ lineHeight: 1 }}>
                            Pode receber contato e visita{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#2E2E2E"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1 }}>
                            Detalhes completos do imóvel{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#2E2E2E"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1 }}>
                            Alta relevância de exibição{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#2E2E2E"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                          <p style={{ lineHeight: 1, marginBottom: 0 }}>
                            Destaque exclusivo na página principal{" "}
                            <FaCheckCircle
                              fontSize={18}
                              color={"#2E2E2E"}
                              style={{ marginLeft: 5 }}
                            />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="linha-vertical-azul-left col-lg-1"></div>
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
                        Tipo e Localização do imovel{" "}
                        {imovel?.codStatusAnuncio >= 1 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Sobre seu imóvel{" "}
                        {imovel?.codStatusAnuncio >= 1 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Imagens{" "}
                        {imovel?.codStatusAnuncio >= 1 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1 }}>
                      Visita ao imóvel{" "}
                        {imovel?.codStatusAnuncio >= 2 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Documentos do seu imóvel{" "}
                        {imovel?.codStatusAnuncio >= 2 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Diferenciais do imóvel
                        {imovel?.codStatusAnuncio >= 3 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1 }}>
                        Detalhes do imóvel{" "}
                        {imovel?.codStatusAnuncio >= 3 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p style={{ lineHeight: 1, marginBottom: 0 }}>
                        Conte-nos sobre você{" "}
                        {imovel?.codStatusAnuncio >= 4 ? (
                          <FaCheckCircle
                            fontSize={16}
                            color={`#4BB7F1`}
                            style={{ marginLeft: 5 }}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-6 linha-vertical-azul-right linha-vertical "
                  style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: "auto",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  <ImovelCardAnuncio
                    key={imovel?.codImovel}
                    codImovel={imovel?.codImovel}
                    endereco={imovel?.endereco}
                    bairro={imovel?.bairro}
                    cidade={imovel?.cidade}
                    uf={imovel?.uf}
                    qtdeDormitorios={imovel?.qtdeDormitorios}
                    qtdeSuites={imovel?.qtdeSuites}
                    qtdeBanheiros={imovel?.qtdeBanheiros}
                    qtdeVagasGaragem={imovel?.qtdeVagasGaragem}
                    areaTotal={imovel?.areaTotal}
                    valorVendaOriginal={imovel?.valorVendaOriginal}
                    descTipoImovel={imovel?.descTipoImovel}
                    imgsDoImovel={imovel?.imgsDoImovel}
                    codStatusAnuncio={imovel?.codStatusAnuncio}
                    descImovel={""}
                  />
                </div>
              </div>
            </section>

            <section>
              {imovel?.codStatusAnuncio == 1 ? (
                <div>
                  <div className="col-lg-12 mt-5">
                    <p className="texto">
                    Para oferecer segurança e transparência a todos os usuários da plataforma, precisamos garantir que os imóveis cadastrados de fato existem, estão desimpedidos, utilizaram fotos adequadas ao objetivo de um anúncio de qualidade e foram publicados pelos seus proprietários de direito?.
                    Por este motivo, nossa equipe agora, irá analisar todos os documentos e informações passadas, para em breve validar a publicação do seu anúncio. Fique atento ao seu email ou acesse aqui para conferir. Te desejamos sucesso nesta negociação!

                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {imovel?.codStatusAnuncio == 2 ? (
                <div>
                  <div className="col-lg-12 mt-5">
                    <p className="texto">
                    Para oferecer segurança e transparência a todos os usuários da plataforma, precisamos garantir que os imóveis cadastrados de fato existem, estão desimpedidos, utilizaram fotos adequadas ao objetivo de um anúncio de qualidade e foram publicados pelos seus proprietários de direito.
                    Por este motivo, nossa equipe agora, irá analisar todos os documentos e informações passadas, para em breve validar a publicação do seu anúncio. Fique atento ao seu email ou acesse aqui para conferir. Te desejamos sucesso nesta negociação!
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {imovel?.codStatusAnuncio == 3 ? (
                <div>
                  <div className="col-lg-12 mt-5">
                    <p className="texto">
                    Para oferecer segurança e transparência a todos os usuários da plataforma, precisamos garantir que os imóveis cadastrados de fato existem, estão desimpedidos, utilizaram fotos adequadas ao objetivo de um anúncio de qualidade e foram publicados pelos seus proprietários de direito.
                    Por este motivo, nossa equipe agora, irá analisar todos os documentos e informações passadas, para em breve validar a publicação do seu anúncio. Fique atento ao seu email ou acesse aqui para conferir. Te desejamos sucesso nesta negociação!
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {imovel?.codStatusAnuncio == 4 ? (
                <div>
                  <div className="col-lg-12 mt-5">
                    <p className="texto">
                    Para oferecer segurança e transparência a todos os usuários da plataforma, precisamos garantir que os imóveis cadastrados de fato existem, estão desimpedidos, utilizaram fotos adequadas ao objetivo de um anúncio de qualidade e foram publicados pelos seus proprietários de direito.
                    Por este motivo, nossa equipe agora, irá analisar todos os documentos e informações passadas, para em breve validar a publicação do seu anúncio. Fique atento ao seu email ou acesse aqui para conferir. Te desejamos sucesso nesta negociação!
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="col-lg-12 mt-0 pt-4 text-end">
                {imovel?.codStatusAnuncio != 4 ? (
                  <button
                    className="buttonVoltar mx-2"
                    onClick={() => {
                      if(usuario.tipo === tipoUsuario.corretor) {
                        history.push("/dashboard/corretor/imoveis");
                      } else {
                        history.push("/dashboard/meus-imoveis");
                      }
                    }}
                  >
                    Sair{" "}
                    <MdExitToApp style={{ marginLeft: 20, fontSize: 25 }} />
                  </button>
                ) : (
                  ""
                )}
                <button className="buttonSalvar" onClick={handleSubmit}>
                  Continuar{" "}
                  <FaArrowRight style={{ marginLeft: 20, fontSize: 18 }} />
                </button>
              </div>
            </section>
          </div>

          <div className="div-card-stepper-contain col-lg-3 mt-2">
            <StepperAnuncioImovel
              Localizacao={imovel?.codStatusAnuncio >= 1}
              Sobre={imovel?.codStatusAnuncio >= 1}
              Imagens={imovel?.codStatusAnuncio >= 1}
              Corretor={imovel?.codStatusAnuncio >= 2}
              Documento={imovel?.codStatusAnuncio >= 2}
              Diferenciais={imovel?.codStatusAnuncio >= 3}
              Detalhes={imovel?.codStatusAnuncio >= 3}
              Pesquisa={imovel?.codStatusAnuncio >= 4}
              codImovel={codImovel}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
