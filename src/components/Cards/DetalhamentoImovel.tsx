import React, { useEffect } from 'react'
import '../../styles/components/Cards/detalhamentoImovel.scss'
import imovelUser from '../../assets/internas/imovel-user.png'
import {MdVerified,MdOutlineWatchLater} from 'react-icons/md'
import {IoClose} from 'react-icons/io5'
import {AiOutlineCheck} from 'react-icons/ai'
import {ImArrowUpRight2} from 'react-icons/im'
import ImgCorretor from '../../assets/internas/corretor-card-selecao.png';
import {BsWhatsapp} from 'react-icons/bs'
import {HiPhone} from 'react-icons/hi'
import { MdOutlineEmail} from 'react-icons/md'
import {BsCheckCircleFill} from 'react-icons/bs'
import { iPropostas } from '../../@types'
import api from '../../services/api'
import { moeda } from '../../utils/Masks'
const DetalhamentoImovel = (props:any) => {


  return (
    <>
      <div className="row mt-1">
        <div className="col-lg-6">
          <div className="title-detalhes my-3">
            <h4>Detalhamento da transação</h4>
          </div>
          <div className="row">
            <div className="col-lg-5">
              {props.fotoCapa === null ? (
                <img src={imovelUser} alt="imovel user" style={{width:'100%'}} />
              ):(
                <img src={props.fotoCapa} alt="imovel user" style={{width:'100%'}} />
              )}
              
            </div>
            <div className="col-lg-7">
              <div className="content-dados">
                <span>Apartamento</span>
                <h5>{props.endereco} <MdVerified color={'#2E2E2E'}/></h5>
                <p>{props.bairro}</p>
                <hr />
                <h4>R$ {moeda(props.valorVenda)}</h4>
                <hr />
                <div>
                  <p><AiOutlineCheck  color={'#3BC14A'} />Aceita bem como pagamento</p>
                  <p> <IoClose color={'#FD4A19'} />imóvel está ocupado</p>
                </div>
                <button className="button-imovel">
                  Ir para imóvel <ImArrowUpRight2/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="title-detalhes my-3">
            <h4>Seu corretor nesse imóvel</h4>
          </div>
            <div className="content-comprador mt-1">
            <div className="row">
              <div className="col-lg-6 col-6">
                <div className="content-information d-flex justify-content-start align-items-center">
                  <img src={ImgCorretor} className="img-comprador" alt="imagem do corretor comprador" />
                  <div className="content-name-comprador">
                    <span>Comprador</span>
                    <p>{props.nomeCorretorCompra}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <div className="d-flex justify-content-end align-items-center " >
                  <div className="text-end">
                    <span className="status">Status</span>
                    {props.descStatusCompra  === null ? (
                      <p>Indisponíel no momento</p>
                    ):(
                      <p><BsCheckCircleFill color={'#3BC14A'} /> Comprado</p>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
              <hr />
              <div className="links  d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <span  className="status">Atualizado em 09.11.2021</span>
                </div>
                <div>
                  <button className="link whatsapp m-1">
                    <BsWhatsapp fontSize={24} color={"#fff"}/>
                  </button>
                  <button className="link phone m-1">
                    <HiPhone fontSize={24} color={"#ADADAD"}/>
                  </button>
                  <button className="link email m-1">
                    <MdOutlineEmail fontSize={24} color={"#ADADAD"}/>
                  </button>
                </div>
              </div>
            </div>
            <div className="content-vendedor mt-1">
            <div className="row">
              <div className="col-lg-6 col-6">
                <div className="content-information d-flex justify-content-start align-items-center">
                  <img src={ImgCorretor} className="img-comprador" alt="imagem do correotr comprador" />
                  <div className="content-name-comprador">
                    <span>Vendedor</span>
                    {props.nomeCompradorVenda ? (
                      <p>{props.nomeCompradorVenda}</p>
                    ):(
                      <p>Não temos um vendedor no momento</p>
                    )}
                    
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <div className="d-flex justify-content-end align-items-center">
                  <div className="text-end">
                    <span className="status">Status</span>
                    {props.descStatusVenda === null ? (
                      <p>Indisponíel no momento</p>
                    ): (
                      <p><MdOutlineWatchLater color={'#FFB30F'} /> Aguard. resposta</p>
                      
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
              <hr />
              <div className="links  d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <span  className="status">Atualizado em 09.11.2021</span>
                </div>
                <div>
                  <button className="link whatsapp m-1">
                    <BsWhatsapp fontSize={24} color={"#fff"}/>
                  </button>
                  <button className="link phone m-1">
                    <HiPhone fontSize={24} color={"#ADADAD"}/>
                  </button>
                  <button className="link email m-1">
                    <MdOutlineEmail fontSize={24} color={"#ADADAD"}/>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DetalhamentoImovel
