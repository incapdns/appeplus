import { useEffect, useState } from "react";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { FaChevronRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import { format, parseISO } from "date-fns";
import "../../styles/pages/adm/imoveis.scss";
import Footer from "../../components/Footer";

interface iContratosPendentes {
  corretorCompradorNomeCompleto: string;
  corretorVendedorNomeCompleto: string;
  clienteCompradorNomeCompleto: string;
  clienteVendedorNomeCompleto: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  codContrato: number;
  dataCadastroContrato: string;
}

export default function AdmContratos() {
  const history = useHistory();
  function handleClick(id: number) {
    history.push(`/adm/contrato/${id}`);
  }
  const [contratos, setContratos] = useState<iContratosPendentes[]>([]);

  useEffect(() => {
    GetCorretores();
  }, []);

  async function GetCorretores() {
    await api
      .get("contrato/status?statusContrato=6")
      .then((response) => {
        setContratos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  return (
    <>
      <div className="wrapper-imoveis" id="adm-imoveis">
        <NavbarDashAdm />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-8">
                  <h2>Contratos</h2>
                </div>
              </div>
            </section>
            <section className="meus-imoveis mb-3">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Corretor comprador</th>
                      <th scope="col">Corretor vendedor</th>
                      <th scope="col">Endereço do imóvel</th>
                      <th scope="col" colSpan={2}>
                        Data do contrato
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contratos?.length ? (
                      contratos.map((contrato, index) => (
                        <tr key={index}>
                          <td>{contrato.corretorCompradorNomeCompleto}</td>
                          <td>{contrato.clienteVendedorNomeCompleto}</td>
                          <td className="endereco">
                            <p>
                              {contrato.endereco}, {contrato.numero}
                            </p>
                            <span>
                              {contrato.bairro}, {contrato.cidade} -{" "}
                              {contrato.uf}
                            </span>
                          </td>
                          <td>
                            {contrato.dataCadastroContrato
                              ? format(
                                  parseISO(contrato.dataCadastroContrato),
                                  "dd/MM/yyyy"
                                )
                              : null}
                          </td>
                          <td className="td-button">
                            <button
                              className="btn"
                              onClick={() => handleClick(contrato.codContrato)}
                            >
                              <FaChevronRight />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>Nenhum contrato pendente</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
