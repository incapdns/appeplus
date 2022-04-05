import { useEffect, useState } from "react";
import { iFinanciamento } from "../../@types";
import { moeda } from "../../utils/Masks";
import { AiOutlineCheck } from 'react-icons/ai'

interface props {
    financiamentos: iFinanciamento[],
    valorEntrada: string,
    valorImovel: number,
    qtdParcelas: number
}
export default function ModalFinanciamento(props: props) {
    const [primeiraParcela, setPrimeiraParcela] = useState(0);
    const [ultimaParcela, setUltimaParcela] = useState(0);
    const [valorParaFinanciar, setValorParaFinanciar] = useState(0);

    const porcentagemEntrada = Number(props.valorEntrada) / (props.valorImovel / 100)
    function getPrimeiraUltimaParcela(){
        props.financiamentos.filter( financiamento =>{
            if(financiamento.banco === "Melhortaxa"){
                setPrimeiraParcela(financiamento.primeiraParcela)
                setUltimaParcela(financiamento.ultimaParcela)
            }
        })
        
    }
    useEffect(()=>{
        getPrimeiraUltimaParcela()
    },[])

    return (
        <>
            <div className="card mb-3 col-lg-12" >
                <div className="row">
                    <div className="col-lg-7 col-12 modal-info">
                        <div className="row card-body info-valores">
                            <div className="col-md-6 col-12 col-lg-12 col-xl-6 primeiro-valor">
                                <p className="valores-title">Valor do imóvel</p>
                                <h2>R${moeda(props.valorImovel)}</h2>
                            </div>
                            <div className="col-md-3 col-6 col-lg-6 col-xl-3">
                                <p className="valores-title">Entrada</p>
                                <p className="valor">R$ {props.valorEntrada}</p>
                            </div>
                            <div className="col-md-3 col-6 col-lg-6 col-xl-3">
                                <p className="valores-title">Parcelas</p>
                                <p className="valor">{Math.trunc(Number(props.qtdParcelas) / 12)} anos</p>
                            </div>
                        </div>

                        <div className="col-12 info-bancos">
                            <div className="card-body">
                                <p className="bancos-title">Selecione o banco e a taxa</p>
                                <div className="row">
                                    {
                                        props.financiamentos.map((financiamento,index) => (
                                            <div className="col-12 col-lg-6 col-md-6 col-xl-3" key={index}>
                                                <button onClick={() => { 
                                                    setPrimeiraParcela(financiamento.primeiraParcela)
                                                    setUltimaParcela(financiamento.ultimaParcela) 
                                                    setValorParaFinanciar(financiamento.valorParaFinanciar)
                                                }} className="bancos-botoes">{financiamento.banco}</button>
                                                <p className="bancos-porcentagem">{financiamento.jurosPercentualAoAno}%</p>
                                            </div>
                                        )
                                        )
                                    }
                                </div>
                                <div className="bancos-parcelas">
                                    <div className="valor-financiamento">
                                        <div><p className="primeira">Valor para financiar</p></div>
                                        <div className="valor-parcela">R$ {moeda(valorParaFinanciar)}</div>
                                    </div>
                                    <div className="primeira-parcela">
                                        <div><p className="primeira">Primeira parcela</p></div>
                                        <div className="valor-parcela">R$ {moeda(primeiraParcela)}</div>
                                    </div>
                                    <div className="ultima-parcela">
                                        <div><p className="ultima">Última parcela</p></div>
                                        <div className="valor-parcela">R$ {moeda(ultimaParcela)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 info-simulacao">
                            <div className="card-body">
                                <p className="sim-title">Valores utilizados nessa simulação</p>
                                <div className="mb-3 row">
                                    <div className="col-sm-3 col-xs-6" style={{paddingRight: 0}}><p className="title-slider">Valor de entrada</p></div>
                                    <div className="col-sm-5 col-xs-6 slider-valor" style={{marginTop: 10}}>
                                        <div className="slidecontainer">
                                            <input type="range" min="0" max="100" value={porcentagemEntrada} className="slider" id="myRange" disabled/>
                                        </div>
                                        <div style={{marginLeft: 10}}><span>{porcentagemEntrada.toFixed(0)}% <AiOutlineCheck color={'#3BC14A'} /></span></div>
                                    </div>
                                    <div className="col-sm-4 col-xs-6"><button>R$ {props.valorEntrada}</button></div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-3 col-xs-6" style={{paddingRight: 0}}><p className="title-slider">Tempo parcelado</p></div>
                                    <div className="col-sm-5 col-xs-6 slider-valor" style={{marginTop: 10}}>
                                        <div className="slidecontainer">
                                            <input type="range" min="0" max="100" value="100" className="slider" id="myRange" disabled/>
                                        </div>
                                        <div style={{marginLeft: 10}}><span>{props.qtdParcelas}x <AiOutlineCheck color={'#3BC14A'} /></span></div>
                                    </div>
                                    <div className="col-sm-4 col-xs-6"><button>{Math.trunc(Number(props.qtdParcelas) / 12)} anos</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-12 lateral">
                        <div>
                            <p className="lateral-title">Informação importante</p>
                            <p className="lateral-text">
                                Estes dados são apenas uma simulação, que tem como base informações obtidas junto a algumas instituições financeiras e que podem a todo momento alterar suas condições de financiamento.
                            </p>
                            <p className="lateral-text">
                                Nosso objetivo é dar aos nossos clientes, uma noção de como será seu fluxo de pagamentos, de acordo com a forma de pagamento desejada, mas recomendamos que procure sua instituição de confiança para ter as informações o mais corretas e atualizadas possível.
                            </p>
                            <p className="lateral-text">
                                Equipe Appê Plus
                            </p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}