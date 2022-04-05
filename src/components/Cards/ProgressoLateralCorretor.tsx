import { BsFillCheckCircleFill } from "react-icons/bs";
import '../../styles/pages/cadastro/corretor/geral.scss';
import { useEffect, useState } from "react";
export default function ProgressoLateralCorretor() {

  const [success, setSuccess] = useState(false);

  function getUrl(){
    if (window.location.pathname.toLocaleLowerCase() == "/cadastro/corretor/sucesso") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }
  useEffect(()=>{
    getUrl()
  },[])

  return (
    <>
      <div className="card card-lateral">
        <div className="card-body">

          <div className="card mb-3 border-success card-progress">
            <div className="card-body">
              <p>Progresso</p>
              <div >
                <div className="progress-bar-anuncio bg-success" style={{ width: '100%' }} role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div>
          </div>

          {success ? (
            <p className="content" style={{ textAlign: 'justify', marginLeft: 5, marginRight: 5 }}>Etapas de cadastro concluídas.</p>
          ) : (
            <p className="content" style={{ textAlign: 'justify', marginLeft: 5, marginRight: 5 }}>Esta é a porcentagem restante de campos para completar e você se tornar ativo.</p>
          )}

          <hr />

          <div className="card border-success mb-4 card-sucesso">
            <div className="card-header text-white bg-success d-flex justify-content-between align-items-center">
              Dados pessoais <span>3/3</span>
            </div>
            <div className="card-body">
              <p className="card-text text-success">Dados pessoais <BsFillCheckCircleFill /></p>
              <p className="card-text text-success">Upload de documento <BsFillCheckCircleFill /></p>
              <p className="card-text text-success">Upload de comprovante <BsFillCheckCircleFill /></p>
            </div>
          </div>

          <div className="card border-success mb-4 card-sucesso">
            <div className="card-header text-white bg-success d-flex justify-content-between align-items-center">
              Dados profissionais <span>2/2</span>
            </div>
            <div className="card-body">
              <p className="card-text text-success">Sobre você <BsFillCheckCircleFill /></p>
              <p className="card-text text-success">Suas especialidades <BsFillCheckCircleFill /></p>
            </div>
          </div>

          <div className="card border-success mb-4 card-sucesso">
            <div className="card-header text-white bg-success d-flex justify-content-between align-items-center">
              Atuação e Creci <span>2/2</span>
            </div>
            <div className="card-body">
              <p className="card-text text-success">Local de atuação <BsFillCheckCircleFill /></p>
              <p className="card-text text-success">Data/horário de atuação <BsFillCheckCircleFill /></p>
            </div>
          </div>

          <div className="card border-success mb-4 card-sucesso">
            <div className="card-header text-white bg-success d-flex justify-content-between align-items-center">
              Extras <span>1/1</span>
            </div>
            <div className="card-body">
              <p className="card-text text-success">Informações extras <BsFillCheckCircleFill /></p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}