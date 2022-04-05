import React from 'react'
import '../../styles/components/Cards/historico.scss'
import {AiFillEye} from 'react-icons/ai'
import {MdOutlineDoubleArrow} from 'react-icons/md'
const Historico = () => {
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
                <p className="ativo">Proposta recebida</p>
              </div>
            </li>
            <li className="">
              <div className="date teste2">
                <p>09.07.2021</p>
              </div>
              <div className="historico-status">
                <p>Contraproposta enviada</p>
              </div>
            </li>
            
            <li className="">
              <div className="date teste3">
                <p>Aguardando</p>
              </div>
              <div className="historico-status">
                <p>Aguardando resposta</p>
              </div>
            </li>
            <li className="">
              <div className="date teste3">
                <p>Aguardando</p>
              </div>
              <div className="historico-status">
                <p>venda concluida</p>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="proposta-status ">
          <p className="proposta-title"><MdOutlineDoubleArrow/> Proposta recebida</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ipsam, quas laboriosam minima adipisci facere unde laudantium culpa autem corporis optio, eos aliquid hic tempora distinctio molestiae! Natus, beatae magnam.</p>
          <div className="links">
            <button type="button" className="proposta-vizualizar"><AiFillEye/>Ver proposta</button>
            <button type="button">Ver histórico</button>
          </div>
        </div>
      </div>
    </div>
    
      
    </>
  )
}

export default Historico
