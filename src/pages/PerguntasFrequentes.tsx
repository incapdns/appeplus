import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/perguntasFrequentes.scss'
import { FaSearch, FaAngleRight, FaDollarSign, FaUserTie } from "react-icons/fa";
import { BsHouseDoor } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import { useHistory } from "react-router";

export default function PerguntasFrequentes() {
    const history = useHistory();

    return (
        <>
            <Navbar />
            <div id="perguntas-frequentes" className="mt-5">
                <section className="banner">
                    <div className="col-lg-12">
                        <div className="col-lg-12 text">
                            <h1 className="banner-title">Perguntas frequentes</h1>
                            <p className="banner-text">Pesquise nos nossos tópicos de perguntas mais frequentes, ou utilize nossa barra de busca para
                                pesquisar sobre o tema solicitado.
                            </p>
                            <div className="col-lg-12 pesquisa">
                                <input type="text" className="form-control campo" placeholder="Busque por palavras, termos ..." />
                                <button className="search">Procurar<FaSearch style={{ marginLeft: 10 }} /> </button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container mt-5">
                    <section className="duvidas-gerais mt-5">
                        <h4 className="duvidas-title">Pesquise pelas nossas dúvidas gerais</h4>
                        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dui magna nibh eget. Malesuada senectus varius
                            nisl ornare faucibus nunc viverra. Morbi sagittis, placerat felis tempor. Elementum consectetur imperdiet lectus maecenas.
                            Sollicitudin.</p>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item mb-4">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        Lorem ipsum dolor sit amet consectuer?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-4">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Lorem ipsum dolor sit amet consectuer?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Lorem ipsum dolor sit amet consectuer?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="col-12 secoes my-5">
                        <p className="secoes-title">OU BUSQUE POR SEÇÕES       </p>
                        <div className="row secao-compradores">
                            <div className="col-lg-5 linha" >
                                <h4><FaDollarSign color="#4BB7F1" style={{ marginRight: 15 }} />Ajuda para Compradores</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dui magna nibh eget. Malesuada senectus varius nisl ornare faucibus nunc viverra..</p>
                            </div>
                            <div className="col-lg-6 lista-botoes">
                                <div className="d-block col-6">
                                    <div><button onClick={() => history.push('/central-ajuda')}>Compromisso com compra <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Proposta <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Análise de crédito <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                </div>
                                <div className="d-block col-6">
                                    <div><button onClick={() => history.push('/central-ajuda')}>Pagamentos <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Rescisão de contrato <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Visitas <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                </div>

                            </div>
                        </div>
                        <div className="row secao-compradores">
                            <div className="col-lg-5 linha" >
                                <h4><BsHouseDoor color="#4BB7F1" style={{ marginRight: 15 }} />Ajuda para Proprietários</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dui magna nibh eget. Malesuada senectus varius nisl ornare faucibus nunc viverra..</p>
                            </div>
                            <div className="col-lg-6 lista-botoes">
                                <div className="d-block col-6">
                                    <div><button onClick={() => history.push('/central-ajuda')}>Primeiros passos <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Visitas e propostas <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Vistoria <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                </div>
                                <div className="d-block col-6">
                                    <div><button onClick={() => history.push('/central-ajuda')}>Financeiro <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Meu anúncio <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Entrega do imóvel <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                </div>

                            </div>
                        </div>
                        <div className="row secao-corretores">
                            <div className="col-lg-5 linha" >
                                <h4><FaUserTie color="#4BB7F1" style={{ marginRight: 15 }} />Ajuda para Corretores</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dui magna nibh eget. Malesuada senectus varius nisl ornare faucibus nunc viverra..</p>
                            </div>
                            <div className="col-lg-6 lista-botoes">
                                <div className="d-block col-6">
                                    <div><button onClick={() => history.push('/central-ajuda')}>Primeiros passos <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Visitas e propostas <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Visitas e vistorias <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                </div>
                                <div className="d-block col-6">
                                    <div><button onClick={() => history.push('/central-ajuda')}>Plataforma Plus <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Negociação <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                    <div><button onClick={() => history.push('/central-ajuda')}>Financeiro <MdArrowForwardIos style={{ position: 'absolute', right: '1%', top: '35%' }} /></button></div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer dark />
        </>
    )
}