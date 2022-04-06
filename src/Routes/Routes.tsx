import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"))
const BuscaImoveis = React.lazy(() => import("../pages/BuscaImoveis"))
const DetalhesImovel = React.lazy(() => import("../pages/DetalhesImovel"))
const CadastroVendedor = React.lazy(() => import("../pages/CadastroVendedor"))
const CadastroAnuncioImovel = React.lazy(() => import("../pages/CadastroAnuncioImovel"))
const CadastroCorretor = React.lazy(() => import("../pages/CadastroCorretor"))
const AnuncioSimples = React.lazy(() => import("../pages/cadastro/imovel/AnuncioSimples"))
const EscolherCorretor = React.lazy(() => import("../pages/cadastro/imovel/EscolherCorretor"))
const DocumentosImovel = React.lazy(() => import("../pages/cadastro/imovel/DocumentosImovel"))
const DiferenciaisDoImovel = React.lazy(() => import("../pages/cadastro/imovel/DiferenciaisDoImovel"))
const DetalhesDoImovel = React.lazy(() => import("../pages/cadastro/imovel/DetalhesDoImovel"))
const PesquisaImovel = React.lazy(() => import("../pages/cadastro/imovel/PesquisaImovel"))
const MeusCorretores = React.lazy(() => import("../pages/dashboard/MeusCorretores"))
const FinalCadastroCorretor = React.lazy(() => import("../pages/cadastro/corretor/FinalCadastroCorretor"))
const CadastroCorretorSobreVoce = React.lazy(() => import("../pages/cadastro/corretor/SobreVoce"))
const CadastroCorretorAtuacao = React.lazy(() => import("../pages/cadastro/corretor/Atuacao"))
const FinalCadastroImovel = React.lazy(() => import("../pages/cadastro/imovel/FinalCadastroImovel"))
const MeusImoveis = React.lazy(() => import("../pages/dashboard/MeusImoveis"))
const SeusTokens = React.lazy(() => import("../pages/dashboard/seusTokens"))
const PesquisaCorretor = React.lazy(() => import("../pages/cadastro/corretor/PesquisaCorretor"))
const Propostas = React.lazy(() => import("../pages/dashboard/Propostas"))
const QuemSomos = React.lazy(() => import("../pages/QuemSomos"))
const EscolhaCorretor = React.lazy(() => import("../pages/cadastro/comprador/EscolhaCorretor"))
const CadastroProposta = React.lazy(() => import("../pages/cadastro/imovel/CadastroProposta"))
const DetalhesProposta = React.lazy(() => import("../pages/cadastro/imovel/DetalhesProposta"))
const CadastroComprador = React.lazy(() => import("../pages/CadastroComprador"))
const DadosBancarios = React.lazy(() => import("../pages/cadastro/corretor/DadosBancarios"))
const ListaPropostas = React.lazy(() => import("../pages/dashboard/ListaPropostas"))
const PropostaImovel = React.lazy(() => import("../pages/dashboard/PropostaImovel"))
const ContraProposta = React.lazy(() => import("../pages/dashboard/ContraProposta"))
const Transacoes = React.lazy(() => import("../pages/dashboard/Transacoes"))
const PerguntasFrequentes = React.lazy(() => import("../pages/PerguntasFrequentes"))
const CentralAjuda = React.lazy(() => import("../pages/CentralAjuda"))

// ADM
const SuasAvaliacoes = React.lazy(() => import("../pages/dashboard/corretor/SuasAvaliacoes"))
const TermosCondicoesUso = React.lazy(() => import("../pages/TermosCondicoesUso"))
const TermosCondicoesUsoCorretor = React.lazy(() => import("../pages/TermosCondicoesUsoCorretor"))
const PoliticaPrivacidade = React.lazy(() => import("../pages/PoliticaPrivacidade"))
const Contato = React.lazy(() => import("../pages/Contato"))
const ListaAgenda = React.lazy(() => import("../pages/dashboard/corretor/ListaAgenda"))
const AdmClientesUser = React.lazy(() => import("../pages/adm/ClientesUser"))

const DashboardNegociacoes = React.lazy(() => import("../pages/dashboard/corretor/Negociacoes"))
const CadastroInteresse = React.lazy(() => import("../pages/cadastro/interesse"))
const CadastroDetalhes = React.lazy(() => import("../pages/cadastro/interesse/Detalhes"))
const HistoricoImoveis = React.lazy(() => import("../pages/dashboard/HistoricoImoveis"))
const MeusImoveisPesquisados = React.lazy(() => import("../pages/dashboard/MeusImoveisPesquisados"))
const RecuperarSenha = React.lazy(() => import("../pages/RecuperarSenha"))
const Contratos = React.lazy(() => import("../pages/dashboard/corretor/Contratos"))
const Agenda = React.lazy(() => import("../pages/dashboard/corretor/Agenda"))
const DashboardCorretor = React.lazy(() => import("../pages/dashboard/corretor"))
const AdmImoveis = React.lazy(() => import("../pages/adm/Imoveis"))
const AdmDetalheImovel = React.lazy(() => import("../pages/adm/DetalheImovel"))
const AdmCorretores = React.lazy(() => import("../pages/adm/Corretores"))
const AdmCorretor = React.lazy(() => import("../pages/adm/Corretor"))
const AdmContratos = React.lazy(() => import("../pages/adm/Contratos"))
const AdmContrato = React.lazy(() => import("../pages/adm/Contrato"))
const DashboardClientes = React.lazy(() => import("../pages/dashboard/corretor/Clientes"))
const DashboardImoveis = React.lazy(() => import("../pages/dashboard/corretor/Imoveis"))
const ValidacaoEmail = React.lazy(() => import("../pages/cadastro/validacaoEmail"))
const RedefinirSenha = React.lazy(() => import("../pages/RedefinirSenha"))
const DashboardAdm = React.lazy(() => import("../pages/adm/Dashboard"))

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/" exact component={CadastroCorretor} /> */}
        <Route path="/cadastro/vendedor" component={CadastroVendedor} />
        <Route path="/cadastro/anuncio" component={CadastroAnuncioImovel} />
        <Route path="/cadastro/corretor" exact component={CadastroCorretor} />
        <Route path="/cadastro/comprador" exact component={CadastroComprador} />
        <Route
          path="/cadastro/corretor/sobre-voce"
          component={CadastroCorretorSobreVoce}
        />
        <Route
          path="/cadastro/corretor/atuacao"
          component={CadastroCorretorAtuacao}
        />
        <Route
          path="/cadastro/corretor/dados-bancarios"
          component={DadosBancarios}
        />
        <Route
          path="/cadastro/corretor/sucesso"
          component={FinalCadastroCorretor}
        />
        <Route path="/cadastro/corretor/pesquisa" component={PesquisaCorretor} />
        <Route path="/cadastro/dadosCorretor" component={CadastroVendedor} />
        <Route path="/cadastro/interesse" exact component={CadastroInteresse} />
        <Route path="/cadastro/interesse/detalhes" component={CadastroDetalhes} />
        <Route path="/imoveis" exact component={BuscaImoveis} />
        <Route path="/imovel/:id" component={DetalhesImovel} />
        <Route
          path="/cadastro/imovel/anuncioSimples"
          component={AnuncioSimples}
        />
        <Route
          path="/cadastro/imovel/anuncioAzul/corretor"
          component={EscolherCorretor}
        />
        <Route
          path="/cadastro/imovel/anuncioAzul/documentosImovel"
          component={DocumentosImovel}
        />
        <Route path="/quemSomos" component={QuemSomos} />
        <Route
          path="/cadastro/imovel/anuncioLaranja/diferenciaisImovel"
          component={DiferenciaisDoImovel}
        />
        <Route
          path="/cadastro/imovel/anuncioLaranja/detalhesImovel"
          component={DetalhesDoImovel}
        />
        <Route
          path="/cadastro/imovel/anuncioBlack/pesquisa"
          component={PesquisaImovel}
        />
        <Route path="/dashboard/MeusCorretores" component={MeusCorretores} />
        <Route
          path="/cadastro/imovel/finalizacao"
          component={FinalCadastroImovel}
        />
        <Route path="/dashboard" exact component={DashboardAdm} />
        <Route path="/dashboard/meus-imoveis" component={MeusImoveis} />
        <Route
          path="/dashboard/corretor/negociacoes"
          component={DashboardNegociacoes}
        />
        <Route
          path="/dashboard/corretor/clientes"
          component={DashboardClientes}
        />
        <Route path="/dashboard/corretor/imoveis" component={DashboardImoveis} />
        <Route path="/dashboard/corretor/contratos" component={Contratos} />
        <Route
          path="/dashboard/meus-imoveis-pesquisados"
          component={MeusImoveisPesquisados}
        />
        <Route path="/dashboard/lista-agenda" component={ListaAgenda} />
        <Route path="/dashboard/corretor/lista-agenda" component={ListaAgenda} />
        <Route path="/dashboard/seus-tokens" component={SeusTokens} />
        <Route path="/dashboard/propostas" component={Propostas} />
        <Route path="/perguntas-frequentes" component={PerguntasFrequentes} />
        <Route path="/central-ajuda" component={CentralAjuda} />
        <Route
          path="/cadastro/cliente/escolhaCorretor"
          component={EscolhaCorretor}
        />
        <Route path="/dashboard/lista-propostas" component={ListaPropostas} />
        <Route path="/dashboard/proposta-imovel" component={PropostaImovel} />
        <Route path="/dashboard/contra-proposta" component={ContraProposta} />
        <Route path="/dashboard/transacoes" component={Transacoes} />
        <Route path="/cadastro/dadosComprador" component={CadastroVendedor} />
        <Route path="/cadastro/proposta" component={CadastroProposta} />
        <Route path="/cadastro/detalhes-proposta" component={DetalhesProposta} />
        <Route path="/dashboard/historico" component={HistoricoImoveis} />
        <Route path="/dashboard/agenda" component={Agenda} />
        <Route path="/dashboard/suas-avaliacoes" component={SuasAvaliacoes} />
        <Route path="/dashboard/corretor" exact component={DashboardCorretor} />
        <Route path="/recuperar-senha" component={RecuperarSenha} />
        <Route path="/adm/dashboard" exact component={DashboardAdm} />
        <Route path="/adm/imoveis" component={AdmImoveis} />
        <Route path="/adm/detalhe-imovel/:id" component={AdmDetalheImovel} />
        <Route path="/adm/corretores" component={AdmCorretores} />
        <Route path="/adm/clientes" component={AdmClientesUser} />
        <Route path="/adm/corretor/:id" component={AdmCorretor} />
        <Route path="/adm/contratos" component={AdmContratos} />
        <Route path="/adm/contrato/:id" component={AdmContrato} />
        <Route path="/termos-uso" component={TermosCondicoesUso} />
        <Route
          path="/termos-uso-corretor"
          component={TermosCondicoesUsoCorretor}
        />
        <Route path="/contato" component={Contato} />
        <Route
          path="/termos-uso-corretor"
          component={TermosCondicoesUsoCorretor}
        />
        <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
        <Route path="/cadastro/cliente/comprador" component={CadastroVendedor} />
        <Route path="/cadastro/cliente/vendedor" component={CadastroVendedor} />
        <Route path="/cliente/aprovacao" component={ValidacaoEmail} />
        <Route path="/cliente/rejeicao" component={ValidacaoEmail} />
        <Route
          path="/imovelaprovar/aprovacaoCliente"
          component={ValidacaoEmail}
        />
        <Route path="/imovelaprovar/rejeicaoCliente" component={ValidacaoEmail} />
        <Route path="/usuario/redefinirSenha" component={RedefinirSenha} />
        <Route path="/usuario/alterarSenha" component={RedefinirSenha} />
      </Switch>
    </BrowserRouter>
  );
}