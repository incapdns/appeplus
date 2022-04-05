import {useState} from 'react'
import '../../styles/components/Cards/meuimovel.scss'
import{ IoEllipsisHorizontal} from 'react-icons/io5'
import {BiEditAlt} from 'react-icons/bi'
import {HiPhone} from 'react-icons/hi'
import {MdDeleteOutline,MdVerified, MdOutlineEmail} from 'react-icons/md'
import {BsQuestionCircle,BsWhatsapp} from 'react-icons/bs'
import {RiArrowLeftRightFill} from 'react-icons/ri'
import Imovel from '../../assets/internas/imovel.png'
import ImgCorretor from '../../assets/internas/corretor-card-selecao.png';
import { moeda } from '../../utils/Masks'
import api from '../../services/api'
import { useHistory } from 'react-router'
import { format, parseISO } from "date-fns";

const MeuImovel = (props:any) => { 

  const history = useHistory()
  const [motivoDeleteImovel, setMotivoDeleteImovel] = useState("");


  function getData(codImovel:any){
    const codigoImovel = codImovel; 
    localStorage.setItem('DeletarImovel', codigoImovel)
  }
  async function deletarImovelCorretor() {
    const codImovel = localStorage.getItem('DeletarImovel');
    const codigoImovel = Number(codImovel)
    await api.delete(`/imovel?CodImovel=${codigoImovel}&MotivoExclusao=${motivoDeleteImovel}&DesejaExcluir=${true}`)
    .catch(error =>{
      console.log("Ocorreu um erro")
    })
    localStorage.removeItem('DeletarImovel')
    setMotivoDeleteImovel("")
    window.location.reload();
    
  }

  async function editarImovel(codImovel:any){
    const codImovelEditar = codImovel;
    localStorage.setItem('@appePlus/codImovel', codImovelEditar);
    history.push('/cadastro/imovel/anuncioSimples')
  }

  return (
    <>
    <div className="card" id="meuimovel">
      <div className="card-header d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap">
        <div className="action">
          <button><BiEditAlt fontSize={24} color={'#adadad'} onClick={() => editarImovel(props.codImovel)}/></button>
          <button onClick={() => getData(props.codImovel)} data-bs-toggle="modal" data-bs-target="#modalExcluirImovel"><MdDeleteOutline fontSize={24} color={'#adadad'}/></button>
        </div>
        <div className="information">
          <span>Atualizado em 09.11.2021 às 17:58</span>
          <button className="mx-3"><BsQuestionCircle fontSize={24} color={'#4BB7F1'}/></button>
          <button><IoEllipsisHorizontal fontSize={24} color={'#4BB7F1'}/></button>
        </div>
      </div>
      <div className="card-body p-0 pt-3">
        <div className="d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap">
          <div className="col-lg-2 p-0">
            {props.fotoCapaImovel === null ?(
               
               <img src={Imovel} alt="card com foto imóvel" width="100%" />
            ): (
              <img src={props.fotoCapaImovel} alt="card com foto imóvel" width="100%" />
              
            )}
            
          </div>
          <div className="col-lg-4 content-dados p-2">
            <span>Criado em {props.dtCadastro? format( parseISO(props.dtCadastro),  "dd/MM/yyyy"  )  : null}  </span>
            <h4> {props.endereco}<MdVerified color={'#2E2E2E'}/></h4>
            <p>{props.bairro}</p>
            <hr />
            <h4>{moeda(props.valorVendaOriginal)}</h4>
            <p><RiArrowLeftRightFill color={'#4BB7F1'}/> {props.statusNegociacao}</p>
          </div>
          <div className="col-lg-6 content-dados-corretor">
            <div className="content">
              <div className="content-title">
                <p>Corretores envolvidos</p>
              </div>
            
            <div className="row mt-2">
              <div className="col-lg-6 col-md-6 col-12 px-2 mt-1">
                <div className="content-comprador">
                  <div className="content-information d-flex justify-content-center align-items-center">
                    
                    
                    <div className="content-name-comprador">
                      <span>Comprador</span>
                      {props.nomeCorretorCompra === null ? (
                        <p>Corretor não disponivel</p>
                      ): (
                        <p>{props.nomeCorretorCompra}</p>
                      )}
                      
                    </div>
                  </div>
                  <hr />
                  <div className="links  d-flex justify-content-around align-items-center">
                   
                    <button className="link whatsapp">
                    <a
                      className=""
                      href={`https://wa.me/${props.telefone}`}
                      target="_blank" rel="noreferrer">
                        <BsWhatsapp fontSize={24} color={"#fff"}/>
                      </a>
                      
                    </button>
                    <button className="link phone">

                      <HiPhone fontSize={24} color={"#ADADAD"}/>
                    </button>
                    <button className="link email">
                      <MdOutlineEmail fontSize={24} color={"#ADADAD"}/>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 px-2 mt-1">
                <div className="content-comprador">
                  <div className="content-information d-flex justify-content-center align-items-center">
                  {props.fotoCorretorVenda?.map((fotoCorretor:any)=>(
                      <img src={fotoCorretor.url} className="img-comprador" alt="imagem do correotr comprador" />
                  ))}
                    <div className="content-name-vendedor">
                      <span>Vendedor</span>
                      {props.nomeCorretorVenda === null ? (
                        <p>corretor não disponivel</p>
                      ):(
                        <p>{props.nomeCorretorVenda}</p>
                      )}
                      
                    </div>
                  </div>
                  <hr />
                  <div className="links  d-flex justify-content-around align-items-center">
                    <div className="link whatsapp">
                      <a
                      className=""
                      href={`https://wa.me/${props.telefoneCorretorVenda}`}
                      target="_blank" rel="noreferrer">
                        <BsWhatsapp fontSize={24} color={"#fff"}/>
                      </a>
                      
                    </div>
                    <div className="link phone">
                    <a
                      className=""
                      href={`tel:+55${props.telefoneCorretorVenda}`}
                      target="_blank" rel="noreferrer">
                        <HiPhone fontSize={24} color={"#ADADAD"}/>
                      </a>
                      
                    </div>
                    <div className="link email">
                    <a
                      className=""
                      href={`mailto:${props.emailVendedor}`}
                      target="_blank" rel="noreferrer">
                        <MdOutlineEmail fontSize={24} color={"#ADADAD"}/>
                      </a>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="modalExcluirImovel" tabIndex={-1} aria-labelledby="modalExcluirLabelImovel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalExcluirImovelLabel">Qual o motivo da exclusão ?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <input type="text" className="form-control" value={motivoDeleteImovel} onChange={e => setMotivoDeleteImovel(e.target.value)} />
                </div>
                <div className="modal-footer">
                  {motivoDeleteImovel === "" ? (
                    <button type="button" className="btn btn-primary" disabled data-bs-toggle="modal" data-bs-target="#modalExcluirImovel" >Confirmar</button>
                  ) : (
                    <button type="button" className="btn btn-primary" onClick={deletarImovelCorretor} data-bs-toggle="modal" data-bs-target="#modalExcluirImovel" >Confirmar</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeuImovel
