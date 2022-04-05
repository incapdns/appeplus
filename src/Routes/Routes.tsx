import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import BuscaImoveis from "../pages/BuscaImoveis";
import DetalhesImovel from "../pages/DetalhesImovel";
import CadastroVendedor from "../pages/CadastroVendedor";
import CadastroAnuncioImovel from "../pages/CadastroAnuncioImovel";
import CadastroCorretor from "../pages/CadastroCorretor";
import AnuncioSimples from "../pages/cadastro/imovel/AnuncioSimples";
import EscolherCorretor from "../pages/cadastro/imovel/EscolherCorretor";
import DocumentosImovel from "../pages/cadastro/imovel/DocumentosImovel";
import DiferenciaisDoImovel from "../pages/cadastro/imovel/DiferenciaisDoImovel";
import DetalhesDoImovel from "../pages/cadastro/imovel/DetalhesDoImovel";
import PesquisaImovel from "../pages/cadastro/imovel/PesquisaImovel";
import MeusCorretores from "../pages/dashboard/MeusCorretores";
import FinalCadastroCorretor from "../pages/cadastro/corretor/FinalCadastroCorretor";
import CadastroCorretorSobreVoce from "../pages/cadastro/corretor/SobreVoce";
import CadastroCorretorAtuacao from "../pages/cadastro/corretor/Atuacao";

import FinalCadastroImovel from "../pages/cadastro/imovel/FinalCadastroImovel";
import MeusImoveis from "../pages/dashboard/MeusImoveis";

import { DashboardNegociacoes } from "../pages/dashboard/corretor/Negociacoes";
import SeusTokens from "../pages/dashboard/seusTokens";
import PesquisaCorretor from "../pages/cadastro/corretor/PesquisaCorretor";
import Propostas from "../pages/dashboard/Propostas";
import QuemSomos from "../pages/QuemSomos";
import { CadastroInteresse } from "../pages/cadastro/interesse";
import { CadastroDetalhes } from "../pages/cadastro/interesse/Detalhes";
import EscolhaCorretor from "../pages/cadastro/comprador/EscolhaCorretor";
import CadastroProposta from "../pages/cadastro/imovel/CadastroProposta";
import DetalhesProposta from "../pages/cadastro/imovel/DetalhesProposta";
import { HistoricoImoveis } from "../pages/dashboard/HistoricoImoveis";
import CadastroComprador from "../pages/CadastroComprador";
import { MeusImoveisPesquisados } from "../pages/dashboard/MeusImoveisPesquisados";
import { RecuperarSenha } from "../pages/RecuperarSenha";
import { Contratos } from "../pages/dashboard/corretor/Contratos";
import DadosBancarios from "../pages/cadastro/corretor/DadosBancarios";
import ListaPropostas from "../pages/dashboard/ListaPropostas";
import PropostaImovel from "../pages/dashboard/PropostaImovel";
import ContraProposta from "../pages/dashboard/ContraProposta";
import Transacoes from "../pages/dashboard/Transacoes";
import { Agenda } from "../pages/dashboard/corretor/Agenda";
import PerguntasFrequentes from "../pages/PerguntasFrequentes";
import CentralAjuda from "../pages/CentralAjuda";
import { DashboardCorretor } from "../pages/dashboard/corretor";

// ADM
import { AdmImoveis } from "../pages/adm/Imoveis";
import { AdmDetalheImovel } from "../pages/adm/DetalheImovel";
import { AdmCorretores } from "../pages/adm/Corretores";
import { AdmCorretor } from "../pages/adm/Corretor";
import { AdmContratos } from "../pages/adm/Contratos";
import { AdmContrato } from "../pages/adm/Contrato";
import SuasAvaliacoes from "../pages/dashboard/corretor/SuasAvaliacoes";
import TermosCondicoesUso from "../pages/TermosCondicoesUso";
import TermosCondicoesUsoCorretor from "../pages/TermosCondicoesUsoCorretor";
import PoliticaPrivacidade from "../pages/PoliticaPrivacidade";
import Contato from "../pages/Contato";
import { DashboardClientes } from "../pages/dashboard/corretor/Clientes";
import { DashboardImoveis } from "../pages/dashboard/corretor/Imoveis";
import { ValidacaoEmail } from "../pages/cadastro/validacaoEmail";
import ListaAgenda from "../pages/dashboard/corretor/ListaAgenda";
import { RedefinirSenha } from "../pages/RedefinirSenha";
import AdmClientesUser from "../pages/adm/ClientesUser";
import { DashboardAdm } from "../pages/adm/Dashboard";

export default function Routes() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
