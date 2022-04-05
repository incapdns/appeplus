import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import '../../styles/pages/cadastro/corretor/geral.scss';

export default function ProgressoLateralComprador() {

  const [success, setSuccess] = useState(false);

  function getUrl(){
    if (window.location.pathname.toLocaleLowerCase() == "/cadastro/comprador/sucesso") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }
  useEffect(()=>{
    getUrl()
  },[])

  return (
    <div className="card card-lateral position-sticky" id="stepper-corretor">
      <div className="card card-lateral">
        <div className="card-body">

          <div className="card mb-3 border-success card-progress">
            <div className="card-body">
              <p>Progresso</p>
              <div >
                <div className="progress-bar-anuncio bg-success" style={{ width: '50%' }} role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div>
          </div>
          {success ? (
            <p className="content" style={{ textAlign: 'justify', marginLeft: 5, marginRight: 5 }}>Esta é a porcentagem restante de campos para completar e você se tornar ativo.</p>
          ) : (
            <p className="content" style={{ textAlign: 'justify', marginLeft: 5, marginRight: 5 }}>Esta é a porcentagem restante de campos para completar e você se tornar ativo.</p>
          )}


          <hr />

          <div className="card border-success mb-4 card-sucesso">
            <div className="card-header text-white bg-success d-flex justify-content-between align-items-center">
              Passo um <span>2/2</span>
            </div>
            <div className="card-body">
              <p className="card-text text-success">Tipo do seu imóvel <BsFillCheckCircleFill /></p>
              <p className="card-text text-success">Local de preferência <BsFillCheckCircleFill /></p>
            </div>
          </div>

          <div className="card  mb-4 card-incompleto">
            <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#E1E1E1'}}>
              Passo 2 <span>0/1</span>
            </div>
            <div className="card-body">
              <p className="card-text ">Escolha seu corretor </p>
            </div>
          </div>

          <div className="card mb-4 card-incompleto">
            <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#E1E1E1'}}>
              Passo 3 <span>0/1</span>
            </div>
            <div className="card-body">
              <p className="card-text ">Detalher do seu imóvel </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}