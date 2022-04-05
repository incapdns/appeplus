import "../../styles/components/Dasboard/propostas.scss";
export function PropostasDashboard() {
  return (
    <div className="card" id="card-propostas-dashboard">
      <div className="card-body">
        <h4 className="card-title">Propostas realizadas</h4>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Valor</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>José</td>
                <td>R$ 1.500,00</td>
                <td>
                  <span className="aprovada">Aprovada</span>
                </td>
              </tr>
              <tr>
                <td>João</td>
                <td>R$ 3.500,00</td>
                <td>
                  <span className="reprovada">Reprovada</span>
                </td>
              </tr>
              <tr>
                <td>Aldo</td>
                <td>R$ 3.500,00</td>
                <td>
                  <span className="pendente">Aguardando</span>
                </td>
              </tr>
              <tr>
                <td>João</td>
                <td>R$ 3.500,00</td>
                <td>
                  <span className="pendente">Aguardando</span>
                </td>
              </tr>
              <tr>
                <td>Roberto</td>
                <td>R$ 1.500,00</td>
                <td>
                  <span className="aprovada">Aprovada</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
