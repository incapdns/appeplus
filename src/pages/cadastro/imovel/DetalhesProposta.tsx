import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { BiSave } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { iPropostaCriar, iDadosUsuario } from "../../../@types";
import api from "../../../services/api";
import { moeda } from "../../../utils/Masks";
import { useHistory } from "react-router";

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);

const DetalhesProposta = () => {
  const [checked, setChecked] = useState(false);
  const [criarProposta, setCriarProposta] = useState<iPropostaCriar>();
  const [valorEntrada, setValorEntrada] = useState("0");
  const [valorTotal, setValorTotal] = useState("0");
  const [total, setTotal] = useState<number>(0);
  const [valorFinanciado, setValorFinanciado] = useState<number>();
  const [valorPorcento, setValorPorcento] = useState('');
  const [valorPorcentoTotal, setValorPorcentoTotal] = useState('');
  const [valorMeses, setValorMeses] = useState('0');
  const [mes, setMes] =useState('');
  const [anos, setAnos] = useState('');
  const [descriptionImovel, setDescriptionImovel] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  async function getProposta() {
    const codImovel = localStorage.getItem("CodImovel");
    const codigoImovel = Number(codImovel);
    if (usuario.token) {
      await api
        .get(`/Proposta/informacoes-proposta?codImovel=${codigoImovel}`)
        .then((response) => {
          setCriarProposta(response.data.data);
          const valorTotal = Number(
            response.data.data.imovel.valorVendaOriginal
          );
          setTotal(valorTotal);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }
  function valorPorcentagemTotal() {
    const novoValorTotal = Number(valorTotal);
    const valueTotal = Number(total);
    const resultado = (novoValorTotal * 100) / valueTotal;
    const resultadoTotal = resultado.toFixed();
    setValorPorcentoTotal(resultadoTotal);
  }
  function valorPorcentagemEntrada() {
    const entrada = Number(valorEntrada);
    const valueTotal = Number(valorTotal);
    const resultado = entrada * 100 / valueTotal
    const novoValor = resultado.toFixed()
    setValorPorcento(novoValor)
  }
  function MesesParcela() {
    switch (valorMeses) {
      case "0":
        setAnos("0");
        setMes("0");
        break;

      case "1":
        setAnos("5");
        setMes("60");
        break;
      case "2":
        setAnos("10");
        setMes("120");
        break;
      case "3":
        setAnos("15");
        setMes("180");
        break;
      case "4":
        setAnos("20");
        setMes("240");
        break;
      case "5":
        setAnos("25");
        setMes("300");
        break;
      case "6":
        setAnos("30");
        setMes("360");
        break;
    }
  }
  async function propostaEnviar(){
    if(usuario.token){
      const valorTotalNumber = Number(valorTotal)
      const date = new Date();
      const financiamentoValor = Number(valorTotal) - Number(valorEntrada);
      setValorFinanciado(financiamentoValor);
      console.log({
        codImovelProspeccao: criarProposta?.codImovelProspeccao,
        dtCadastro: date,
        userCadastro: usuario.codCliente,
        valor: valorTotalNumber,
        valorEntrada: Number(valorEntrada),
        valorFinanciado: valorFinanciado,
        obsCondicoesPagamento: descriptionImovel,
        dtValidade: date,
        observacoes: "Proposta criada"
      })
      await api.post(`/Proposta/criar-proposta`, {
        codImovelProspeccao: criarProposta?.codImovelProspeccao,
        dtCadastro: date,
        userCadastro: usuario.codCliente,
        valor: valorTotalNumber,
        valorEntrada: Number(valorEntrada),
        valorFinanciado: valorFinanciado,
        obsCondicoesPagamento: descriptionImovel,
        dtValidade: date,
        observacoes: "Proposta criada"
      }).then(response => {
        console.log(response.data.message)
      }).catch(error =>{
        console.log(error)
        setError('Não foi possivel efetuar a requisição, tente novamente mais tarde');
        setLoading(false);
        setAlertErro(true)
      })
      
    }
  }
  useEffect(() => {
    getProposta();
  }, []);

  useEffect(() => {
    valorPorcentagemEntrada();
    MesesParcela();
    valorPorcentagemTotal();
    checaUsuarioLogado();
  }, [valorEntrada, valorMeses, valorTotal]);

  return (
    <>
      <Navbar />
      <section id="detalhes-propostas" className="detalhes-propostas mb-5" >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4>Detalhes da proposta</h4>
            </div>
          </div>
          <div className="row-gray mb-3 mt-1"></div>
          <div className="col-lg-12">
            <p className="m-0">
              Você viu alguma irregularidade ou deseja realizar algum comentario
              sobre o imóvel
            </p>
          </div>
          <div className="d-flex align-items-center flex-wrap box-checked-row py-4">
            <div className={`checked-box d-flex align-items-center `}>
              <div
                className={`box-input-checked d-flex align-items-center justify-content-around mr-1 `}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={checked}
                  onChange={({ target }) => setChecked(target.checked)}
                  value="vendedor"
                  name="flexRadioDefault"
                />
              </div>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Sim tenho comentários a fazer sobre o imóvel
              </label>
            </div>
          </div>
          <div className="row-gray "></div>
          {checked && (
            <div className="text-comentario">
              <div className="content">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={descriptionImovel}
                    onChange={(changeEvent) =>
                      setDescriptionImovel(changeEvent.target.value)
                    }
                    rows={10}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          <div className="col-lg-12 mt-5">
            <h4>Valores do imóvel</h4>
          </div>
          <div className="row-gray"></div>
          <div className="valores-imovel mt-4">
            <div className="row mt-3">
              <div className="col-lg-4">
                <p>Valor total</p>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-evenly">
                  <input
                    type="range"
                    className="form-range"
                    min={0}
                    max={criarProposta?.imovel.valorVendaOriginal}
                    value={valorTotal}
                    onChange={(changeEvent) =>
                      setValorTotal(changeEvent.target.value)
                    }
                    id="customRange2"
                    style={{ width: "70%" }}
                  />
                  <span>
                    {valorPorcentoTotal == "NaN" ? <>0</> : valorPorcentoTotal}%{" "}
                    <AiOutlineCheck color={"#3BC14A"} />
                  </span>
                </div>
              </div>
              <div className="col-lg-4 d-flex align-items-center justify-content-end">
                <div className="valor">
                  <p>R$ {moeda(valorTotal)}</p>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4">
                <p>Valor de entrada</p>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-evenly">
                  <input type="range" className="form-range"  value={valorEntrada} onChange={changeEvent => setValorEntrada(changeEvent.target.value)} min={0} max={valorTotal} id="customRange2" style={{width:'70%'}}/>
                    <span>{valorPorcento == 'NaN' ?  (<>0</>) : (valorPorcento)}% {Number(valorPorcento) >= 20 ? (<AiOutlineCheck color={'#3BC14A'}/>) : (<RiCloseLine color={'#FF715B'}/>)}</span>
                </div>
              </div>
              <div className="col-lg-4 d-flex align-items-center justify-content-end">
                <div className="valor">
                  <p>R$ {moeda(valorEntrada)}</p>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4">
                <p>Tempo Parcelado</p>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-evenly">
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="6"
                    value={valorMeses}
                    onChange={(changeEvent) =>
                      setValorMeses(changeEvent.target.value)
                    }
                    id="customRange2"
                    style={{ width: "70%" }}
                  />
                  <span>
                    {" "}
                    {mes} {mes !== "0" && <>meses</>}
                    <AiOutlineCheck color={"#3BC14A"} />
                  </span>
                </div>
              </div>
              <div className="col-lg-4 text-end d-flex align-items-center justify-content-end">
                <div className="valor">
                  <p>
                    {anos} {anos !== "0" && <>Anos</>}
                  </p>
                </div>
              </div>
            </div>
            <div className="row-gray my-4"></div>
            <div className="row">
              <div className="col-lg-6">
                <p>IPTU</p>
              </div>
              <div className="col-lg-6 text-end">
                <p className="font-bold">
                  R$ {moeda(criarProposta?.imovel.valorIptu)}
                </p>
              </div>
              <div className="col-lg-6">
                <p>Condomínio</p>
              </div>
              <div className="col-lg-6 text-end">
                <p className="font-bold">
                  R$ {moeda(criarProposta?.imovel.valorCondominio)}
                </p>
              </div>
              <div className="col-lg-6">
                <p>Seguro incêndio</p>
              </div>
              <div className="col-lg-6 text-end">
                <p className="font-bold">R$ 16,24</p>
              </div>
            </div>
            <div className="row-gray my-5"></div>
            <div className="row">
              <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap">
                <button className="salvar-rascunho">
                  Saval rascunho <BiSave />
                </button>
                <button
                  className="enviar-proposta"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAceitarPropostaManual"
                  onClick={propostaEnviar}
                >
                  Enviar Proposta <AiOutlineCheck />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="modalAceitarPropostaManual"
        tabIndex={-1}
        aria-labelledby="modalAceitarPropostaManualLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalAceitarPropostaManualLabel">
                Proposta
              </h4>
            </div>
            <div className="modal-body">
              {alertErro ? (
                <div className=" fade show mt-3 mb-0">
                  <p>{error}</p>
                </div>
              ) : (
                <h2>
                  Sua proposta foi aceita com sucesso.
                  <AiOutlineCheckCircle color={"#3BC14A"} fontSize={40} />
                </h2>
              )}
            </div>
            <div className="modal-footer">
              {alertErro ? (
                <button
                  type="button"
                  className="btn btn-primary buttonAceitar"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary buttonAceitar"
                  data-bs-dismiss="modal"
                  onClick={() => history.push("/dashboard")}
                >
                  Voltar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetalhesProposta;
