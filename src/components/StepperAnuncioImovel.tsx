
import { useEffect, useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../styles/components/Form/modalProfileCadastro.scss';
import { AiOutlineGoogle } from 'react-icons/ai';
import { BsArrowRight, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { ProgressBar } from 'react-bootstrap';
import '../styles/components/stepperanuncioimovel.scss';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { iImovel } from '../@types';
import api from "../services/api";

interface Stepps {
  Localizacao?: boolean;
  Sobre?: boolean;
  Imagens?: boolean;
  Corretor?: boolean;
  Documento?: boolean;
  Diferenciais?: boolean;
  Detalhes?: boolean;
  Pesquisa?: boolean;
  codImovel?: number;
}

export default function StepperAnuncioImovel(stepps?: Stepps) {
  const history = useHistory();
  const [imovel, setImovel] = useState({} as iImovel);
  let [progress, setProgress] = useState(0)

  async function GetImovel() {
    console.log(stepps?.codImovel);
    api
      .get(`imovel/selecao?codImovel=${stepps?.codImovel}`)
      .then(async (response) => {
        console.log(response.data.data);
        setImovel(response.data.data);

      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  useEffect(() => {
    GetImovel()
  }, [])

  return (
    <div id="StepperImovel" className="card-steppe card card-lateral position-sticky">
      <div className="card-body">
        <div className="mb-2">
          <div className="anuncio-progress-card" >
            <h5 className="card-title">Progresso</h5>
            <ProgressBar variant="success"
              now={imovel?.codStatusAnuncio >= 4 ? 100 : (imovel?.codStatusAnuncio >= 3 ? 85 : (imovel?.codStatusAnuncio >= 2 ? 70 : (imovel?.codStatusAnuncio >= 1 ? 45 : 0)))} className="progress-bar-anuncio" ></ProgressBar>
          </div>
        </div>
        <div className="col-12 mb-2">
          <p className="information-text">Esse é o seu progresso no preenchimento de informações para o anuncio do seu imovel ir ao ar.</p>
        </div>
        <div className="anuncio-simples-card mb-3 " >
          <div className="anuncio-simples-card-header">
            <p className="anuncio-simples-card-header-text">Anuncio Simples</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className={imovel?.codStatusAnuncio >= 1 ? "list-group-item text-anuncio-card-simples" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 1) { history.push('/cadastro/imovel/anuncioSimples') } }}>Tipo e Localização do imóvel &nbsp;
              {imovel?.codStatusAnuncio >= 1 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
            <li className={imovel?.codStatusAnuncio >= 1 ? "list-group-item text-anuncio-card-simples" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 1) { history.push('/cadastro/imovel/anuncioSimples') } }}>Sobre seu imóvel &nbsp;
              {imovel?.codStatusAnuncio >= 1 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
            <li className={imovel?.codStatusAnuncio >= 1 ? "list-group-item text-anuncio-card-simples" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 1) { history.push('/cadastro/imovel/anuncioSimples') } }}>Imagens &nbsp;
              {imovel?.codStatusAnuncio >= 1 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
          </ul>
        </div>
        <div className="anuncio-azul-card mb-3" >
          <div className="anuncio-azul-card-header">
            <p className="anuncio-azul-card-header-text">Anuncio Azul</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className={imovel?.codStatusAnuncio >= 2 ? "list-group-item text-anuncio-card-azul" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 2) { history.push('/cadastro/imovel/anuncioAzul/corretor') } }}>Visita ao imóvel&nbsp;
              {imovel?.codStatusAnuncio >= 2 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
            <li className={imovel?.codStatusAnuncio >= 2 ? "list-group-item text-anuncio-card-azul" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 2) { history.push('/cadastro/imovel/anuncioAzul/documentosImovel') } }}>Documentos do seu imóvel &nbsp;
              {imovel?.codStatusAnuncio >= 2 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
          </ul>
        </div>
        <div className="anuncio-laranja-card mb-3" >
          <div className="anuncio-laranja-card-header">
            <p className="anuncio-laranja-card-header-text">Anuncio Laranja</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className={imovel?.codStatusAnuncio >= 3 ? "list-group-item text-anuncio-card-laranja" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 3) { history.push('/cadastro/imovel/anuncioLaranja/detalhesImovel') } }}>Detalhes do imóvel &nbsp;
              {imovel?.codStatusAnuncio >= 3 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
            <li className={imovel?.codStatusAnuncio >= 3 ? "list-group-item text-anuncio-card-laranja" : "list-group-item text-anuncio-card"}
              onClick={() => { if (imovel?.codStatusAnuncio >= 3) { history.push('/cadastro/imovel/anuncioLaranja/diferenciaisImovel') } }}>Diferenciais do imóvel &nbsp;
              {imovel?.codStatusAnuncio >= 3 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
          </ul>
        </div>
        <div className="anuncio-black-card" >
          <div className="anuncio-black-card-header">
            <p className="anuncio-black-card-header-text" >Anuncio Plus</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-anuncio-card"
              onClick={() => {
                if (imovel?.codStatusAnuncio >= 4) {
                  history.push('/cadastro/imovel/finalizacao')
                } else if (imovel?.codStatusAnuncio >= 3) {
                  history.push('/cadastro/imovel/anuncioBlack/pesquisa')
                }
              }}>Conte-nos sobre você &nbsp;
              {imovel?.codStatusAnuncio >= 4 ?
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : ''}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
