import { useEffect, useState } from "react";
import { EStatusProspeccao, iDadosUsuario } from "../../@types";
import api from "../../services/api";
import "../../styles/components/Dasboard/ultimasNegociacoes.scss";
import { moeda } from "../../utils/Masks";
import Loading from "../Loading";

interface iTrasacoesVenda {
  arquivosClienteFotoPerfil: any;
  bairro: string;
  cidade: string;
  codCliente: number;
  codProspeccao: number;
  codTermometroProspeccao: number;
  descStatusProspeccao: string;
  descTermometroProspeccao: any;
  descTipoImove: any;
  dtCadastro: string;
  dtConclusao: string;
  email: any;
  endereco: string;
  nomeCompleto: string;
  numero: string;
  percentualTermometro: number;
  qtdeImoveis: number;
  telefone: string;
  uf: string;
  valorVenda: number;
  valorVendaOriginal: number;
}

export function UltimasNegociacoesVendaDashboard() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [negociacoes, setNegociacoes] = useState<iTrasacoesVenda[]>([]);
  const [loading, setLoading] = useState(false);
  const qtdPagina = 5;
  const pagina = 1;

  useEffect(() => {
    GetNegociacao();
  }, []);

  async function GetNegociacao() {
    setLoading(true);
    await api
      .get(
        `prospeccao/busca-avancada-venda?CodCorretor=${usuario.codCorretor}&QtdePagina=${qtdPagina}&Pagina=${pagina}`
      )
      .then((response) => {
        // console.log("GetNegociacao VENDA -> ", response.data);
        setNegociacoes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log("GetNegociacao: ", error);
        setLoading(false);
      });
  }

  return (
    <div className="card" id="ultimas-negociacoes-dashboard">
      <div className="card-body">
        <h4 className="card-title">Últimas negociações - venda</h4>
        {loading ? (
          <Loading />
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Status</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {negociacoes ? (
                  negociacoes.map((negociacao) => (
                    <tr>
                      <td>{negociacao.nomeCompleto}</td>
                      <td>
                        {negociacao.descStatusProspeccao ===
                          EStatusProspeccao.Aberta && (
                          <span className="aprovada">
                            {negociacao.descStatusProspeccao}
                          </span>
                        )}
                        {negociacao.descStatusProspeccao ===
                          EStatusProspeccao.Cancelado && (
                          <span className="reprovada">
                            {negociacao.descStatusProspeccao}
                          </span>
                        )}
                        {negociacao.descStatusProspeccao ===
                          EStatusProspeccao.Concluido && (
                          <span className="pendente">
                            {negociacao.descStatusProspeccao}
                          </span>
                        )}
                      </td>
                      <td>
                        R${" "}
                        {negociacao.valorVendaOriginal
                          ? moeda(negociacao.valorVendaOriginal)
                          : null}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Nenhuma negociação encontrada</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
