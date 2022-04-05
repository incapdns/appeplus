import "../../styles/pages/dashboard/seusTokens.scss";
import { FaRedoAlt, FaCheckCircle, FaSearch } from "react-icons/fa";
import { HiPaperAirplane, HiOutlineShare } from "react-icons/hi";
import NavbarDashCorretor from "../../components/Navbar/NavbarDashCorretor";
import NavbarDashHeaderCorretor from "../../components/Navbar/NavbarDashHeaderCorretor";
import Corretor from "../../assets/internas/corretor.png";
import Corretor2 from "../../assets/internas/corretor-card-selecao.png";
import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { iDadosUsuario } from "../../@types";
import { IoReload } from "react-icons/io5";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  InstapaperShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import Paginacao from "../../components/Paginacao";
import { useHistory } from "react-router";
import { RiH4 } from "react-icons/ri";
import Footer from "../../components/Footer";
import customTheme from "../../themes/ReactSelect";
import { AiFillDelete, AiOutlineInstagram } from "react-icons/ai";

interface iCorretoresIndicados {
  nomeSocial: string;
  img?: string;
  tokenCadastro?: string;
  tokenStatus?: string;
  dtCadastro: string;
}

interface iEmail{
  id:number,
  text:string,
  completed: boolean
}



export default function SeusTokens() {
  const [token, setToken] = useState("");
  const [contato, setContato] = useState('');
  // const [email, setEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<iEmail[]>([]);
  const [corretores, setCorretores] = useState<iCorretoresIndicados[]>([]);
  const [pagina, setPagina] = useState(1);
  const [envioSucesso, setEnvioSucesso] = useState(false)
  const [adiciona, setAdiciona]= useState(false)
  const shareUrl = window.location.href;
  const shareUrlWhats = '!';

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const history = useHistory();
  const QtdePagina = 10;

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    gerarToken();
    buscarCorretores();
  }, [pagina]);

  async function gerarToken() {
    await api
      .get(
        `tokenIndicacao/criar-tokenCorretor?codCorretor=${usuario.codCorretor}`
      )
      .then((response) => {
        if (response.data.success) {
          setToken(response.data.data);
          console.log(
            "🚀 ~ file: seusTokens.tsx ~ line 66 ~ .then ~ response.data.data",
            response.data.data
          );
        }
      })
      .catch((error) => {
        console.log("gerarToken", "Ocorreu um erro");
      });
  }

  // function tipoContato() {
  //   if (contato.includes("@")) {
  //     setEmail(true);
  //   } else {
  //     setEmail(false);
  //   }
  // }
  const formataData = (date:string) => {
    const dataFormate = date.split('T', 1);
    const newDate = dataFormate[0];
    const d = newDate.split('-');
    const data =  `${d[2]}.${d[1]}.${d[0]}`;
   return data
 }

  async function buscarCorretores() {
    await api
      .get(
        `Corretor/corretores-indicados?codCorretor=${usuario.codCorretor}&QtdePagina=${QtdePagina}&Pagina=${pagina}`
      )
      .then((response) => {
        setCorretores(response.data.data.corretores);
        console.log(response.data.data.corretores);
      })
      .catch((error) => {
        console.log("buscarCorretores", "Ocorreu um erro");
        // console.log(error);
      });
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    if(email === ''){
      console.log('é necessário o preenchimento de pelo menos um email ')
    }else{
      if(email.includes(';')){
        const teste:any = email.split(';')
        console.log(teste)
        teste.map((t:any, index:any) => {
            var newEmail:any ={
            id: new Date().getTime()+index,
            text:t,
            completed:false
          }
          emails.push(newEmail)
          setEmail('') 
        })
       
        setAdiciona(true)
      }else{
        var newEmail:any ={
          id: new Date().getTime(),
          text:email,
          completed:false
        }
        emails.push(newEmail)
        setEmail('') 
        setAdiciona(true)
      }
     
      console.log('emails', emails)
      
    }
    
  }

  function deleteEmail(id:number){
    const remove = emails.filter((email) => email.id !== id)
    setEmails(remove)
  }

  async function enviarTokens(){
    const params = emails.map((email) => (
         email.text
    ))
    await api.post(`/Corretor/indicar/${token}`,params).then(response => {
      console.log(response.data)
      if(response.data.success){
        setEnvioSucesso(true)
        setEmails([])
      }
    }).catch(error =>{
      console.log(error)
      setEnvioSucesso(false)
    })
  }
 
  return (
    <>
      <div className="wrapper-tokens">
        <NavbarDashCorretor />
        <div className="main-content">
          <NavbarDashHeaderCorretor />
          <div className="container">
            <section className="my-4 head">
              <div className="row">
                <div className="col-lg-10 my-3">
                  <button className="buttonPlus" data-bs-toggle="modal" data-bs-target="#modalPlus">O que é o Programa Indica Plus ?</button>
                </div>
                <div className="col-lg-10">
                  <h2>Seus Tokens</h2>
                </div>
                <div className="col-lg-2 refresh">
                  {/* <button className="buttonUpdate">
                    Atualizar
                    <FaRedoAlt size={14} style={{ marginLeft: 10 }} />
                  </button> */}
                </div>
              </div>
            </section>
            <section className="card tokens ">
              <div className=" my-5 col-lg-12">
                 <form className="filtro-corretor" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Adicione um ou mais e-mails separados por ponto e virgula (;) "
                      className="campo-filtro"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <button className="buttonBuscar" >
                    Adicionar{" "}
                      {/* <HiPaperAirplane size={20} className="button-icon" /> */}
                    </button>
                 </form>
              </div>
              
            </section>

            {envioSucesso && (
                <div className="alert alert-success  alert-dismissible  fade show" role="alert">
                  Seu token foi compartilhado com sucesso !
                  <button type="button" className="btn-close" onClick={()=> setEnvioSucesso(false)} data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              {emails.length > 0 && (
                <>
                {adiciona && (
              <section className="card tabela-tokens mb-5 pb-4">
            <div className="table-responsive tokens-list">
                <table className="table ">
                  <tbody>
                    <tr className="table-head">
                      <td className="table-head-cell">E-mail</td>
                      <td className="table-head-cell">Ações</td>
                    </tr>
                    {emails.map((email) =>
                    <tr key={email.id}>
                      {!!email && 
                        <>
                          <td className="table-cell">
                            {email.text}
                          </td>
                          <td className="table-cell">
                            <button className="buttonRemove" onClick={() => deleteEmail(email.id)}>
                              <AiFillDelete fontSize={20} color={'#474747'}/>
                            </button>
                          </td>
                        </>
                      }
                  </tr>
                    )}
                  </tbody>
                </table>
                <div className="d-flex align-items-center justify-content-end">
                  <button className="buttonEnviarToken" onClick={enviarTokens} >
                      Enviar tokens{" "}
                        {/* <HiPaperAirplane size={20} className="button-icon" /> */}
                  </button>
                </div>
                
              </div>
              </section>
            )}
                </>
              )}
            
              
            
            

            <section className="card tokens">
              {/* <div className="filtro-corretor my-3 col-lg-12">
                <div className="icone-container">
                  <FaSearch size={18} className="icone-busca" />
                </div>
                <input
                  type="text"
                  placeholder="Adcione um corretor por Telefone ou E-mail"
                  className="campo-filtro"
                  value={contato}
                  onChange={(e) => {
                    setContato(e.target.value);
                    tipoContato();
                  }}
                />

                <button className="buttonBuscar" onClick={gerarToken}>
                  Enviar token{" "}
                  <HiPaperAirplane size={20} className="button-icon" />
                </button>
              </div> */}

              <div className="token-facil">
                <p className="token-divisor">
                  UTILIZE AS OPÇÕES DO TOKEN FÁCIL
                </p>
                <div className="token-facil-content">
                  <div className="botoes-token">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#modalShare"
                      className="buttonCompartilhar"
                    >
                      Compartilhar número de token{" "}
                      <HiOutlineShare size={20} style={{ marginLeft: 5 }} />
                    </button>
                    <button className="buttonGerar" onClick={gerarToken}>
                      Gerar novo{" "}
                      <IoReload size={20} style={{ marginLeft: 5 }} />{" "}
                    </button>
                  </div>

                  <div className="d-block" style={{ marginRight: 20 }}>
                    <p style={{ fontSize: 12 }}>
                      Seu número de token compatilhável
                    </p>
                    <p style={{ fontSize: 32, fontWeight: 600 }}>{token}</p>
                  </div>
                </div>
              </div>
            </section>
            

            <div className="line-gray"></div>

            <section className="card tabela-tokens">
              <div className="tokens-header">
                <p>Mostrando tokens gerados por você</p>
              </div>
              <div className="table-responsive tokens-list">
                <table className="table ">
                  <tbody>
                    <tr className="table-head">
                      <td className="table-head-cell">Meu corretor</td>
                      <td className="table-head-cell">Status do Token</td>
                      <td className="table-head-cell">Nº Token</td>
                      <td className="table-head-cell">Data de envio</td>
                    </tr>
                    {corretores.map((corretor) => (
                      <tr>
                        <td className="table-cell">
                          <img src={corretor.img} alt={corretor.nomeSocial} />
                          {corretor.nomeSocial}
                        </td>
                        <td className="status-token">
                          <FaCheckCircle color="#3BC14A" /> Token Utilizado
                        </td>
                        <td className="table-cell">{corretor.tokenCadastro}</td>
                        <td className="table-cell">{formataData(corretor.dtCadastro)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="px-4 d-flex justify-content-between  flex-wrap">
                <div className="status-page">
                  <p>
                    Mostrando transações <span>de 1 a 24</span>
                  </p>
                </div>
                <div>
                  {corretores.length >= 10 ? (
                    <p>Busca realizada !</p>
                  ) : (
                    <Paginacao
                      total={100}
                      limit={10}
                      paginaAtual={pagina}
                      setPagina={setPagina}
                    />
                  )}
                </div>
              </div> */}
              <div className="cod-md-2 line-gray"></div>
              <div className="px-4 my-4">
                {/* <p className="status-information">
                  Monstrando transações já creditadas. Última atualização em
                  09.12.2021 às 09:38
                </p> */}
              </div>
            </section>
          </div>
        </div>

        <div
          className="modal fade"
          id="modalShare"
          aria-labelledby="modalShare"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Compartilhe esta oportunidade com sua rede de corretores:</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex justify-content-around align-items-center ">
                <FacebookShareButton
                  url={shareUrl}
                  quote={`Token compartilhado do AppePlus:\n ${token}`}
                >
                  <FacebookIcon size={42} round />
                </FacebookShareButton>
                {/* <Instagra
                  url={shareUrl}
                  title={`Token compartilhado do AppePlus: ${token} `}
                >
                  <AiOutlineInstagram size={42} round />
                </InstapaperShareButton> */}

                <TelegramShareButton
                  url={shareUrl}                
                  title={`Token compartilhado do AppePlus.\n ${token} `}
                >
                  <TelegramIcon size={42} round />
                </TelegramShareButton>

                <WhatsappShareButton
                  
                  title = {`Olá! Estou aqui para te convidar a ser um corretor parceiro Appê Plus, assim como eu. Para saber mais e se cadastrar, basta acessar www.appeplus.com/cadastro/corretor e no seu cadastro informar este Token: ${token} . Claro que você pode contar comigo para também te dar mais detalhes sobre a minha experiência com a plataforma. Espero que possamos fazer negócios juntos. Obrigado e um abraço`}
                  url={shareUrlWhats}
                >
                  <WhatsappIcon size={42} round />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="modalPlus" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>Programa Indica Plus</h4>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">X</button>
                </div>
                <div className="modal-body">
                    <h3>É o programa exclusivo de indicações do Appê Plus, que gera mais possibilidades de ganhos para você corretor. Confira como funciona.
                    </h3>
                    <p className="subTitle">Como funciona?</p>
                    <p>Neste programa inédito no mercado imobiliário brasileiro, o corretor que já é parceiro do Appê Plus, indica outros profissionais para atuarem como parceiros da plataforma e assim que estes novos parceiro indicados começarem a fazer negócios pela plataforma, você passa a receber comissões extras a cada negociação que estes seus parceiros indicados concretizarem. Os profissionais indicados por você, também poderão indicar novos parceiros, que da mesma forma poderão indicar outros, chegando a ter cada corretor, no máximo, até 7 níveis abaixo dele.</p>
                    <p className="subTitle">Quais são as comissões recebidas de cada nível abaixo de mim?</p>
                    <p>No indica plus, você vai receber um % da comissão dos corretores da sua rede, conforme o nível que eles estejam abaixo de você. Daqueles que estão no primeiro nível abaixo de você e que foram seus indicados diretos, você vai receber 0,6% da comissão da venda deles. Já daqueles, que estes seus indicados tiverem indicado, ou seja, o nível 2 abaixo de você, você recebe 0,40% da comissão, depois 0,30% dos que estiverem no nível 3 abaixo de você, 0,25% do nível 4, 0,20% do nível 5, 0,15% do nível 6 e finalmente 0,10% do nível 7 abaixo de você.</p>
                    <p>Quanto maior o número de indicações que você fizer imediatamente abaixo de você,  maiores serão as chances de formar uma rede forte, de confiança, rentável e com os melhores corretores da sua região.</p>
                    <p>É o único programa no mercado que possibilita a você, ganhar duas vezes, com seu próprio trabalho conduzindo suas negociações de sucesso e com o trabalho de sucesso realizado por aqueles que conseguir atrair para sua rede. </p>
                    <p className="subTitle">Como faço para indicar e quem posso indicar?</p>
                    <p>A única maneira de indicar um parceiro para sua rede é através do compartilhamento dos seus tokens que a plataforma gera automaticamente para você. Além disto, seus indicados também precisam ser corretores profissionais e com CRECI ativo dentro da nossa região de atuação, fazerem o cadastro na plataforma e serem aprovados.</p>
                    <p>Não perca tempo e comece agora a formar sua rede campeã de corretores e ganhar ainda mais.</p>
                    <p>Utilize o nosso módulo de geração de tokens logo abaixo e compartilhe com seus contatos. </p>
                    <p><strong>Lembre-se:</strong> somente corretores indicados por atuais corretores entram na plataforma e para estarem dentro da sua rede precisam utilizar o token gerado por você no momento do cadastro. Boa sorte e boas vendas!</p>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer dark/>
    </>
  );
}
