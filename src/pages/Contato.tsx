
import {FormEvent, useEffect, useState} from 'react';
import { AiFillFacebook, AiFillLinkedin, AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai';
import { BiMap, BiRightArrowAlt } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Alert from "../components/Alert";

import '../styles/pages/contato.scss';

const Contato = () => {

  const [ nome, setNome ]= useState('');
  const [ email, setEmail ]= useState('');
  const [ assunto, setAssunto ]= useState('');
  const [telefone, setTelefone] =useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [envioSuccess, setEnvioSuccess] = useState(false);
  const [envioSuccessMgs, setEnvioSuccessMgs] = useState('');


  async function enviarEmail(event:FormEvent){
    event.preventDefault()
    setLoading(true);
    const request ={
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        nome:nome,
        assunto: assunto,
        email: email,
        corpo: msgEmail,
        telefone: telefone
      })
    }
    await fetch(`https://apihomolog.appeplus.com/contato/criar-mensagem`,request).then(response => response.json()).then(response=> {
      if(!!response.message){
          console.log(response.message)
          setLoading(false)
          setEnvioSuccess(true)
          setEnvioSuccessMgs('Email enviado com sucesso.');
          setNome('');
          setEmail('');
          setAssunto('');
          setMsgEmail('')

      }
    }).catch(error =>{
      console.log(error)
      setAlertErro(true);
        setMsgErro(
          "Não foi possivel enviar o email. Tente novamente mais tarde."
        );
        setLoading(false);
        setEnvioSuccess(false)
    })
  }

  useEffect(()=> {

  },[])


  return (
    <>
    <Navbar />
    <div className="cabecalho-contato mb-5">
      <div className="container">
        <div className="row">
          <p>Central de ajuda / <span>Contato</span></p>
        </div>
      </div>
    </div>
    <div id="contato" className="container ">
      <div className="row">
        <div className="col-lg-6">
            <div className="content-contato pb-4">
              <p>Para entrar em contato com a Appê+ basta escolher a forma mais fácil abaixo e entraremos em contato prontamente.
              </p>
            </div>
            <div className="row">
              
              <div className="col-12 py-3 border-top ">
                <p><AiOutlineMail fontSize={24} color={'#0065DD'}/> contato@appeplus.com.br</p>
              </div>
              <div className="col-12 py-3 border-top border-bottom ">
                <p><BiMap fontSize={24} color={'#0065DD'}/>Av. Olegário Maciel, 1217, 7º andar, Bairro de Lourdes - Belo Horizonte - MG - CEP: 30.180-111</p>
              </div>
              <div className="col-12 mb-4 mt-5 ">
              <iframe className='mapa-contato' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.9887205432656!2d-43.94761838453923!3d-19.92488014329686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6975f0816fd37%3A0xeebc768dffba96a4!2sAv.%20Oleg%C3%A1rio%20Maciel%2C%201217%20-%20Lourdes%2C%20Belo%20Horizonte%20-%20MG%2C%2030180-111!5e0!3m2!1spt-BR!2sbr!4v1643894846053!5m2!1spt-BR!2sbr" width="100%" height="200" ></iframe>
               
              </div>
              <div className="col-12 mb-2">
                <p className='title-redes'>Estamos nas mídias abaixo</p>
              </div>
              <div className="d-flex redes"  >
                <a href='https://www.facebook.com/appepluscom' aria-label='facebook' style={{ marginRight: 15 }}><AiFillFacebook color={  `#000000`} size={28} /></a>
                <a href='https://www.instagram.com/appeplus/' aria-label='instagram' style={{ marginRight: 15 }}><AiOutlineInstagram color={  `#000000`}  size={28} /></a>
                <a href='https://www.linkedin.com/company/appeplus' aria-label='linkedin'><AiFillLinkedin color={  `#000000`}  size={28} /></a>
                {/* <a href='#' aria-label='youtube' style={{ marginRight: 15 }}><AiFillYoutube color={`${props.black ? "white" : "#000000"}`} size={28} /></a> */}
              </div>

            </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <h4>Ou deixe-nos uma mensagem, assim que possível retornaremos</h4>
            </div>
          </div>
          <div className="mt-4">
            <form onSubmit={enviarEmail}>
              <div className='form-row align-items-center'>
                <div className="col-12 mt-3">
                  <label className="sr-only mb-2">Seu nome<span>*</span></label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      value={nome}
                      required
                      onChange={(e) => setNome(e.target.value)}
                      className="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Nome ou apelido"
                    />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <label className="sr-only mb-2">Seu Email<span>*</span></label>
                  <div className="input-group mb-2">
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <label className="sr-only mb-2">Telefone</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Telefone"
                    />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <label className="sr-only mb-2">Escreva o assunto do seu email<span>*</span></label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      value={assunto}
                      required
                      onChange={(e) => setAssunto(e.target.value)}
                      className="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Assunto"
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <label>Sua mensagem<span>*</span></label>
                  <textarea
                    className="form-control mt-2 form-control-text-area"
                    value={msgEmail}
                    required
                    onChange={(e) => setMsgEmail(e.target.value)}
                    id="exampleFormControlTextarea1"
                    placeholder="sua mensagem"
                    rows={10}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-12 mt-4 mb-5">
                <button className='button-enviar-email' >
                {loading ? (<>Enviando </>) : (<>Enviar email <BiRightArrowAlt fontSize={24}/> </>) }
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                </button>
              </div>
            </form>
          </div>
          {envioSuccess && (
            <div className='alert alert-success'>
              {envioSuccessMgs}
              <button 
                type="button" 
                className="btn-close float-right" 
                aria-label="Close" 
                onClick={() => setEnvioSuccess(false)}
              />
            </div>
          )}
          
          {alertErro && <Alert msg={msgErro} setAlertErro={setAlertErro} />}
        </div>
      </div>
    </div>

    <Footer white/>
    </>
  );
};

export default Contato;

