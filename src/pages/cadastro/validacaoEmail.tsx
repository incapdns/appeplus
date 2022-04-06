import Navbar from "../../components/Navbar";
import "../../styles/pages/cadastro/validacaoEmail.scss";
import BannerMobileAnuncio from "../../assets/internas/banner-anuncio-mobile.jpg";
import { useEffect, useState } from "react";
import api from "../../services/api";

interface Props {
  title?: boolean;
}

export default function ValidacaoEmail() {
  const [endpoint, setEndpoint] = useState("");
  console.log(
    "🚀 ~ file: validacaoEmail.tsx ~ line 10 ~ ValidacaoEmail ~ endpoint",
    endpoint
  );
  const pathname = window.location.pathname.split("/");
  const tipo = pathname[1];
  const action = pathname[2];
  const token = pathname[3];

  const ClienteAprovou = (props: Props) =>
    props.title ? (
      <div className="box-content">
        <div className="box-title-content">
          <h2 className="subTitle">
            Olá. Te damos as boas-vindas ao Appê Plus.
          </h2>
          <p>
            A partir de agora, você poderá contar com todos os nossos serviços,
            na sua busca pela melhor negociação imobiliário.
          </p>
        </div>
      </div>
    ) : (
      <div className="card-texto container">
        <section className="carreira-corretor">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position">
                  <div className="card">
                    <div className="card-body">
                      <p>
                        O Appê Plus é uma imobiliária 100% digital, que traz
                        inovação para a maneira de comprar e vender imóveis, com
                        tecnologia, inteligência de dados e uma rede de
                        corretores parceiros qualificados.
                      </p>
                      <p>
                        Para conhecer um pouco mais sobre nós, acesse nosso site
                        através do menu acima ou então nossas redes sociais.
                      </p>
                      <p>
                        Para acessar a plataforma, basta você utilizar os dados
                        de acesso que criamos para você, e assim acompanhar
                        todas as etapas das suas futuras negociações
                        imobiliárias. Basta clicar em “fazer login” e começar!
                      </p>
                      <p>
                        Conte também com todo apoio do seu corretor e te todo
                        time Appê Plus.
                      </p>
                      <p>
                        Para quaisquer esclarecimentos ou dúvidas, entre em
                        contato conosco através do{" "}
                        <a href="mailto:contato@appeplus.com">
                          contato@appeplus.com
                        </a>
                      </p>
                      <p>Obrigado pela sua confiança</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  const ClienteReprovou = (props: Props) =>
    props.title ? (
      <div className="box-content">
        <div className="box-title-content">
          <h2 className="subTitle">
            Olá. Lamentamos que não tenha aprovado seu cadastro no Appê Plus.
          </h2>
          <p>
            Assim que você tomar a decisão de realizar a venda ou compra de um
            imóvel, estaremos à sua disposição.
          </p>
        </div>
      </div>
    ) : (
      <div className="card-texto container">
        <section className="carreira-corretor">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position">
                  <div className="card">
                    <div className="card-body">
                      <p>
                        O Appê Plus é uma imobiliária 100% digital, que traz
                        inovação para a maneira de comprar e vender imóveis, com
                        tecnologia, inteligência de dados e uma rede de
                        corretores parceiros qualificados.
                      </p>
                      <p>
                        Para conhecer um pouco mais sobre nós, acesse nosso site
                        através do menu acima ou então nossas redes sociais.
                      </p>
                      <p>
                        Para quaisquer esclarecimentos ou dúvidas, entre em
                        contato conosco através do{" "}
                        <a href="mailto:contato@appeplus.com">
                          contato@appeplus.com
                        </a>
                      </p>
                      <p>
                        Esperamos que em breve possamos estar juntos. Muito
                        obrigado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );

  const ClienteReprovouImovel = (props: Props) =>
    props.title ? (
      <div className="box-content">
        <div className="box-title-content">
          <h2 className="subTitle">
            Olá. Você acaba de recusar a publicação do seu imóvel no Appê Plus.
          </h2>
          <p>
            Lamentamos, mas fique tranquilo. Sem sua aprovação, o anúncio do seu
            imóvel não será divulgado em nosso site ou nas nossas demais
            plataformas digitais.
          </p>
        </div>
      </div>
    ) : (
      <div className="card-texto container">
        <section className="carreira-corretor">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position">
                  <div className="card">
                    <div className="card-body">
                      <p>
                        Favor entrar em contato com seu corretor e entender o
                        que pode ter ocorrido, para que o quanto antes, seja
                        possível ajudarmos você na venda do seu imóvel,
                        atendendo da melhor forma suas expectativas.
                      </p>
                      <p>
                        Também estamos à sua disposição, para esclarecer
                        qualquer dúvida que possa ter impedido sua decisão neste
                        momento.
                      </p>
                      <p>
                        Estamos aqui para contribuir e fazer com que se sinta
                        confortável e seguro em contar com nossas soluções e
                        facilidades, na busca pela negociação ideal do seu
                        imóvel. Para falar conosco entre em contato através do
                        nosso e-mail {""}
                        <a href="mailto:contato@appeplus.com">
                          contato@appeplus.com
                        </a>
                      </p>
                      <p>
                        Ficamos na torcida para que em breve estejamos fazendo
                        um bom negócio para você. Obrigado”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  const ClienteAprovouImovel = (props: Props) =>
    props.title ? (
      <div className="box-content">
        <div className="box-title-content">
          <h2 className="subTitle">
            Que ótima notícia! Você aprovou a publicação do seu imóvel no Appê
            Plus.
          </h2>
          <p>
            Estamos muito felizes em ajudar você a realizar a melhor negociação
            para a venda do seu imóvel.
          </p>
        </div>
      </div>
    ) : (
      <div className="card-texto container">
        <section className="carreira-corretor">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position">
                  <div className="card">
                    <div className="card-body">
                      <p>
                        Agora que você autorizou a publicação do anúncio do seu
                        imóvel, falta apenas uma última etapa, que a é validação
                        dos dados cadastrados do seu imóvel. Esta validação,
                        será feita pela nossa equipe especializada, e tem por
                        objetivo, garantir a qualidade das informações e do seu
                        anúncio, trazendo assim ainda mais segurança e
                        credibilidade a futuros compradores interessados.
                      </p>
                      <p>
                        Assim que o cadastro do seu imóvel for aprovado, você
                        será avisado por e-mail ou se preferir pode também
                        acompanhar todas as atualizações e informações sobre seu
                        imóvel, fazendo seu login na plataforma.
                      </p>
                      <p>
                        Em breve faremos a divulgação do seu anuncio em nossa
                        plataforma e canais digitais e você poderá compartilhar
                        a novidade com todos.
                      </p>
                      <p>
                        Conte com o apoio do seu corretor e do time Appê Plus,
                        como facilitadores do processo de negociação e venda do
                        seu imóvel.
                      </p>
                      <p>
                        Para quaisquer esclarecimentos ou dúvidas, entre em
                        contato conosco através do {""}
                        <a href="mailto:contato@appeplus.com">
                          contato@appeplus.com
                        </a>
                      </p>
                      <p>Obrigado e boa sorte na sua negociação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );

  const endpointAprovacao = `cliente/aprovacao/${token}`;
  const endpointRejeicao = `cliente/rejeicao/${token}`;
  const endpointAprovacaoCliente = `imovel/aprovacao/${token}`;
  const endpointRejeicaoCliente = `imovel/rejeicao/${token}`;

  useEffect(() => {
    if (tipo === "cliente" && action === "aprovacao") {
      setEndpoint(endpointAprovacao);
      GetToken(endpointAprovacao);
    } else if (tipo === "cliente" && action === "rejeicao") {
      setEndpoint(endpointRejeicao);
      GetToken(endpointRejeicao);
    } else if (tipo === "imovelaprovar" && action === "aprovacaoCliente") {
      setEndpoint(endpointAprovacaoCliente);
      GetToken(endpointAprovacaoCliente);
    } else if (tipo === "imovelaprovar" && action === "rejeicaoCliente") {
      setEndpoint(endpointRejeicaoCliente);
      GetToken(endpointRejeicaoCliente);
    }
  }, [tipo, action, token]);

  async function GetToken(endpoint: any) {
    await api
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar />
      <div id="validacaoEmail">
        <div className="row banner">
          <div className="col-lg-6">
            <img
              src={BannerMobileAnuncio}
              alt="banner"
              className="banner-mobile"
            />
          </div>
          <div className="col-lg-6 text">
            {action === "aprovacao" && <ClienteAprovou title />}
            {action === "rejeicao" && <ClienteReprovou title />}
            {action === "aprovacaoCliente" && <ClienteAprovouImovel title />}
            {action === "rejeicaoCliente" && <ClienteReprovouImovel title />}
          </div>
        </div>
        {action === "aprovacao" && <ClienteAprovou />}
        {action === "rejeicao" && <ClienteReprovou />}
        {action === "aprovacaoCliente" && <ClienteAprovouImovel />}
        {action === "rejeicaoCliente" && <ClienteReprovouImovel />}
      </div>
    </>
  );
}
