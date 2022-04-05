import "../../styles/components/Cards/corretor.scss";
import { FaUser } from "react-icons/fa";
import { iCorretores } from "../../@types";
import { format, parseISO } from "date-fns";
import ImgCorretor from '../../assets/internas/corretor-card-selecao.png';

export default function CardCorretorHorizontal(props: iCorretores) {
  return (
    <div className="card mb-3 p-1" id="cardCorretor">
      <div className="row g-0 m-auto">
        <div className="col-md-5 col-6  p-1 d-flex align-items-center">
          <div className="box-img">
              <img
              src={props.img ? props.img : ImgCorretor}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src=ImgCorretor;
              }}            
              className="img-fluid rounded-start card-img"
              alt="Nome Corretor"
            />
          </div>
        </div>
        <div className="col-md-7 col-6 p-1">
          <div className="card-body p-0">
            <label>Corretor</label>
            {/* <h5 className="card-title">
              {props.nomeSocial ? props.nomeSocial : props.nomeCompleto}
            </h5> */}
            <p className="m-0"><strong>{props.nomeSocial ? props.nomeSocial : props.nomeCompleto}</strong></p>
            <label className="card-text"><strong>CRECI: {props.numeroCreci}</strong></label>
            <div className="cod-md-2 row-gray mb-2"></div>
            <label className="card-text">Avaliação: &nbsp;<strong>{props.mediaAvaliacao}</strong></label>
            <label className="card-text">Imoveis no Appe+: &nbsp;<strong>{props.imoveisNoAppePlus}</strong></label>
          </div>
        </div>
      </div>
    </div>
  );
}
