import { TrasacoesDashboard } from "../../../components/Dashboard/Transacoes";
import { PropostasDashboard } from "../../../components/Dashboard/Propostas";
import { UltimasNegociacoesCompraDashboard } from "../../../components/Dashboard/UltimasNegociacoesCompra";
import { UltimasNegociacoesVendaDashboard } from "../../../components/Dashboard/UltimasNegociacoesVenda";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import "../../../styles/pages/dashboard/dashboard.scss";
import { iDadosUsuario } from "../../../@types";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../../components/Footer";
import Grafico from "../../../components/Dashboard/Grafico";

export function DashboardCorretor() {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  useEffect(() => {
    // checaUsuarioLogado();
  }, []);

  function checaUsuarioLogado() {
    if (!usuario.token || usuario.codStatus !== 1) {
      window.alert(
        "Você precisar estar logado e aprovado para acessar este menu!"
      );
      history.push("/");
    }
  }

  return (
    <>
    <div className="wrapper-imoveis" id="dashboard">
      <NavbarDashCorretor />
      <div className="main-content">
        <NavbarDashHeader />
        <div className="container">
          
          <div className="row">
            <div className="col-lg-6">
              <TrasacoesDashboard />
            </div>
            <div className="col-lg-6">
              <PropostasDashboard />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <UltimasNegociacoesCompraDashboard />
            </div>
            <div className="col-lg-6">
              <UltimasNegociacoesVendaDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer dark/>
    </>
  );
}
