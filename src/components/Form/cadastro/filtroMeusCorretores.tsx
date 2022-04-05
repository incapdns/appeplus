import { IoOptions } from "react-icons/io5";
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

export default function FiltroMeusCorretores() {
    const [valor, setValor] = useState('');
    const [statusProposta, setStatusProposta] = useState('');
    const [statusContrato, setStatusContrato] = useState('');
    const [select, setSelect] = useState('');
    const [ordenar, setOrdenar] = useState('');
    return (
        <>
            <div className="filtro-corretor my-3 col-lg-12">
                <input type="text" placeholder="Busque por nome ou CRECI" className="campo-filtro" />
                <button className="buttonBuscar">Encontrar corretor <FaSearch style={{ marginLeft: 10 }} /></button>
            </div>
            <div className="row mx-2 my-4">
                <div className="col-lg-3 mb-3 mb-lg-0">
                    <select className="form-select campo-select" aria-label="Valor do imóvel" defaultValue="1"
                        onChange={(e) => setValor(e.target.value)} >
                        <option value="1">Valor do imóvel</option>
                        <option value="2">R$ 150 mil a 250 mil</option>
                        <option value="3">R$ 350 mil a 450 mil</option>
                        <option value="4">R$ 450 mil a 650 mil</option>
                        <option value="5">R$ 650 mil a 1 milhão</option>
                        <option value="6">mais de R$ 1 milhão</option>
                    </select>
                </div>
                <div className="col-lg-3 mb-3 mb-lg-0">
                    <select className="form-select campo-select" aria-label="Status da proposta" defaultValue=""
                        onChange={(e) => setStatusProposta(e.target.value)}
                    >
                        <option value="">Status da proposta</option>
                        <option value="1">Vendido</option>
                        <option value="2">Aguard. aprovação</option>
                        <option value="3">Em elaboração</option>

                    </select>
                </div>
                {/* <div className="col-lg-3 mb-3 mb-lg-0">
                    <select className="form-select campo-select" aria-label="Escolha o número de quartos" defaultValue=""
                        onChange={(e) => setStatusContrato(e.target.value)}>
                        <option value="">Status do contrato</option>
                        <option value="1">Vendido</option>
                        <option value="2">Aguard. aprovação</option>
                        <option value="3">Em elaboração</option>
                    </select>
                </div> */}

                {/* <div className="col-lg-3 d-flex justify-content-lg-end">
                    <button type="button" className="buttonMais" >
                        <IoOptions style={{ marginRight: 10 }} size={22} />
                        Mais filtros
                    </button>
                </div> */}
            </div>
            <div className="row mx-2 blue-filter col-lg-12">
                {/* <div className="col-lg-6  my-2 d-flex first-filter">
                    <p>Tipo de corretor: </p>
                    <select className="caixa-select" value={select} onChange={({ target }) => setSelect(target.value)}>
                        <option value="comprador">Comprador</option>
                        <option value="vendedor">Vendedor</option>
                    </select>
                </div> */}
                <div className="col-lg-6  my-2 d-flex second-filter" >
                    <p>Ordenar por: </p>
                    <select className="caixa-select" value={ordenar} onChange={({ target }) => setOrdenar(target.value)}>
                        <option value="historico">Histórico</option>
                        <option value="maiorValor">Maior valor</option>
                        <option value="menorValor">Menor valor</option>
                    </select>
                </div>
            </div>
        </>
    )
}