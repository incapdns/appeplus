import ImgCorretor from '../../assets/BuscaImovel/corretor.png';
import ImgDefault from '../../assets/Logo/HorizontalBlack.svg';
import { MdVerified } from "react-icons/md";
import { iCorretores } from '../../@types';

import '../../styles/components/Cards/imovel.scss';

export default function CardCorretor(props: iCorretores) {
  return (
    <div className="card" id="cardImovel">
      {/* <div className="card-img-top default"> */}
      <img
        src={props.img ? props.img : ImgCorretor}
        className="card-img-top default"
        alt={props.nomeCompleto}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src=ImgCorretor;
        }}
      />
      {/* </div> */}
      <div className="card-body">
        <p className="card-type">Corretor</p>
        <h5 className="card-title">{props.nomeSocial} <MdVerified size={22} /></h5>
        <p className="card-bairro">CRECI {props.numeroCreci}</p>
        <div className="dadosCorretor">
          <p className="card-text">Avaliação <span>{props.mediaAvaliacao}</span></p>
          <p className="card-text">Imóveis no Appe+ <span>23</span></p>
          <p className="card-text">Corretor desde <span>1990</span></p>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary" type="button">Entrar em contato</button>
        </div>
      </div>
    </div>
  );
}