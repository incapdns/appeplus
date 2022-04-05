import '../../styles/components/Cards/selecaoCorretor.scss';
import ImgCorretor from '../../assets/internas/corretor-card-selecao.png';


import { MdFavoriteBorder } from "react-icons/md";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface iCorretores {
  codCorretor?: number,
  codUsuario?: number,
  nomeCompleto?: string,
  numeroCreci?: string,
  dtCadastro?: string,
  pontuacaoAtual?: number,
  mediaAvaliacao?: number,
  img?: string,
  corretorImovel?: boolean,
  topCorretorImovel?: boolean,
  historicoCorretorImovel?: boolean,
  imoveisNoAppePlus?: number,
  nomeSocial?: string,
  selecionado?: boolean,
}

export default function SelecaoCorretor(props: iCorretores) {
  const [selecionado, setSelecionado] = useState(props?.selecionado);

  return (
    <div id="selecaoCorretor" onClick={() => { setSelecionado(!selecionado) }} className={props?.selecionado ? "card card-corretor-selecionado col-md-12" : "card card-corretor col-md-12"} >
      <div className="row g-0">
        <div className="col-md-5 col-6">
          <div className='box-img'>
            <img
              src={props.img ? props.img : ImgCorretor}
              className="img-fluid rounded-start card-img"
              alt="Nome Corretor"
            />
          </div>
          {/* <button className="button-favorite">
            <MdFavoriteBorder />
          </button> */}
        </div>

        <div className="col-md-7 col-6">
          <div className="card-body">
            <label>Corretor</label>
            <p><strong>{props.nomeSocial}</strong></p>
            <div className="avaliacao">
            </div>
            <label ><strong>CRECI: {props.numeroCreci}</strong></label>
            <div className="cod-md-2 row-gray mb-2"></div>
            <label>Avaliação: &nbsp;<strong>{props.mediaAvaliacao}</strong></label>
            <label>Imoveis no Appe+: &nbsp;<strong>{props.imoveisNoAppePlus}</strong></label>
            {/* <label>Corretor desde: &nbsp;<strong>{props.dtCadastro}</strong></label> */}
          </div>
        </div>
      </div>
    </div>
  );
}