import React from 'react'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import '../../styles/components/Cards/historico.scss'
const Updates = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="timeline">
            <ul>
              <li className="active">
                <div className="date teste">
                  <p>09.07.2021</p>
                </div>
                <div className="historico-status">
                  <p className="ativo">Pagamento enviado</p>
                </div>
              </li>
              <li className="">
                <div className="date teste2">
                  <p>09.07.2021</p>
                </div>
                <div className="historico-status">
                  <p>Análise de dados</p>
                </div>
              </li>
              
              <li className="">
                <div className="date teste3">
                  <p>Aguardando</p>
                </div>
                <div className="historico-status">
                  <p>Pagamento aprovado</p>
                </div>
              </li>
              <li className="">
                <div className="date teste3">
                  <p>Aguardando</p>
                </div>
                <div className="historico-status">
                  <p>Pagamento creditado em conta</p>
                </div>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="proposta-status ">
            <p className="proposta-title"><MdOutlineDoubleArrow/>Análise de dados</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ipsam, quas laboriosam minima adipisci facere unde laudantium culpa autem corporis optio, eos aliquid hic tempora distinctio molestiae! Natus, beatae magnam.</p>
            
          </div>
        </div>
      </div>

    </>
  )
}

export default Updates
