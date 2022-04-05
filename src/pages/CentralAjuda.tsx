import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MdArrowForwardIos } from "react-icons/md";
import '../styles/pages/centralAjuda.scss'
import { AiOutlineFacebook, AiOutlineLinkedin, AiFillTwitterSquare, AiOutlineClose, AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";

export default function CentralAjuda() {
    return (
        <>
            <div className="mb-5"><Navbar /></div>
            <div id="central-ajuda" className="mt-5">
                <div className="central-header" style={{ backgroundColor: '#FAFAFA' }}>
                    <div className="container central-header">
                        <p style={{ color: "#ADADAD" }}>Central de ajuda / Compradores <span style={{ color: "#0065DD" }}>/ Encontre um imóvel </span></p>
                        <div className="d-flex" style={{ backgroundColor: "#fff", borderRadius: "6px", borderBottom: "1px solid #E1E1E1" }}><AiOutlineSearch size={20} style={{ marginTop: 10, marginLeft: 10, backgroundColor: '#fff' }} /><input type="text" className="form-control campo" placeholder="Pesquisa" /></div>
                    </div>
                </div>
                <div className="container">
                    <div className="col-12 mt-5 central-body">
                        <div className="col-3 central-outros">
                            <p>Mais artigos nessa seção</p>
                            <div className="central-lista">
                                <div><button>Lorem ipsum <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                <div><button>Lorem ipsum <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                <div><button>Lorem ipsum <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                            </div>
                        </div>
                        <div className="col-9 central-artigo">
                            <h3 className="artigo-title">O que é Compromisso de Compra e Venda (CCV)?</h3>
                            <div className="mb-4">
                                <AiOutlineFacebook size={28} color="#4BB7F1" style={{ marginRight: 20 }} />
                                <AiFillTwitterSquare size={28} color="#4BB7F1" style={{ marginRight: 20 }} />
                                <AiOutlineLinkedin size={28} color="#4BB7F1" />
                            </div>
                            <p>O Compromisso de Compra e Venda (CCV) é uma espécie de contrato preliminar da compra do imóvel que traz maior segurança às partes em relação ao negócio realizado. </p>
                            <p>O CCV é uma promessa entre comprador e vendedor. Ambos concordam em entrar num acordo quanto ao imóvel. </p>
                            <p>Esse contrato, portanto, tem o efeito de vincular comprador e vendedor, sejam eles Pessoas Físicas ou Jurídicas, e levar transparência às cláusulas negociadas; bem como garantir ao comprador e vendedor que sejam respeitados os termos combinados.</p>
                            <p>Por isso, o CCV é tão importante e precisa ser assinado por todos os envolvidos. Ele é o primeiro documento que se assina ao comprar um imóvel.</p>
                            <p>No CCV constam:os valores da negociação, as condições acordadas, as penalidades e hipóteses de rescisão, a forma de pagamento escolhida para a compra e o prazo estipulado.</p>
                            <p> <strong> Mas atenção: </strong> o CCV não é a Escritura Pública de compra e venda. Os dois são documentos bem diferentes. Enquanto o CCV é um contrato inicial, uma promessa, a Escritura Pública é um documento oficial que transfere a propriedade do imóvel e por isso tem uma força jurídica bem específica. Saiba mais sobre a Escritura Pública aqui.</p>
                            <p>A assinatura do CCV é a garantia do aceite da sua oferta. Nas próximas etapas, ocorre a concretização de fato da sua compra com a transferência da posse e propriedade.</p>
                            <h4>Este artigo foi útil?</h4>
                            <div className="foi-util">
                                <button className="botao-nao">Não <AiOutlineClose /> </button>
                                <button className="botao-sim">Sim <AiOutlineCheck /> </button>
                            </div>
                            <span style={{ fontSize: 12 }}>160 de 100 usuários acharam isso útil</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer dark />
        </>
    )
}