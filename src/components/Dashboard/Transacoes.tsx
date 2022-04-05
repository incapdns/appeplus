import "../../styles/components/Dasboard/transacoes.scss";
export function TrasacoesDashboard() {
  return (
    <div className="card" id="negociacoes-dashboard">
      <div className="card-body">
        <h4 className="card-title">Últimas negociações</h4>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Valor</th>
                <th scope="col">Referência</th>
                <th scope="col">data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R$ 1.500,00</td>
                <td>
                  <span>Ref.</span> 4º nível
                </td>
                <td>21/01/2022</td>
              </tr>
              <tr>
                <td>R$ 3.500,00</td>
                <td>
                  <span>Ref.</span> 2º nível
                </td>
                <td>21/01/2022</td>
              </tr>
              <tr>
                <td>R$ 3.500,00</td>
                <td>
                  <span>Ref.</span> 5º nível
                </td>
                <td>21/01/2022</td>
              </tr>
              <tr>
                <td>R$ 3.500,00</td>
                <td>
                  <span>Ref.</span> 4º nível
                </td>
                <td>21/01/2022</td>
              </tr>
              <tr>
                <td>R$ 1.500,00</td>
                <td>
                  <span>Ref.</span> 3º nível
                </td>
                <td>21/01/2022</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
