import '../styles/components/footer.scss';
import LogoBlack from '../assets/Logo/logo-footer.svg';
import LogoWhite from '../assets/Logo/logo-vertical-white.svg';
import Logo from '../assets/internas/QuemSomos/logo.png';
import News from '../assets/internas/envelope.png';
import Apple from '../assets/internas/AppStore.svg';
import Google from '../assets/internas/GooglePlay.svg';
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineTwitter
} from "react-icons/ai";
import { Link } from 'react-router-dom';

interface iFooter {
  dark?: boolean;
  white?: boolean;
  black?: boolean;
  blue?: boolean;
  news?: boolean;
}

export default function Footer(props: iFooter) {

  const bgDefault = !(!!(props.black || props.blue || props.dark || props.white));

  return (
    <footer className={`py-4 border-top ${bgDefault && 'bg-info'} ${props.dark && 'bg-dark'} ${props.black && 'bg-black'} ${props.blue && 'bg-info'} ${props.white && 'bg-white'}`} id="footer">
      <div className="mx-lg-5 mx-0">
        {props.news &&
          <>
            <div className="col-12 news">
              <div className="col-lg-5 col-md-5 col-12">
                <div className="news-text">
                  <div className={`news-img ${bgDefault && 'bg-info'} ${props.dark && 'bg-dark'} ${props.black && 'bg-black'} ${props.blue && 'bg-info'} ${props.white && 'bg-white'}`}><img src={News} /></div>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5, paddingTop: 5 }}>Inscreva-se na nossa newsletter</p>
                    <p>E fique por dentro de todas as novidades da Appe+</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-12 news-main">
                <div className="news-box">
                  <div className="col-lg-9 col-md-12 col-12"><input type="text" className="news-input" placeholder="Insira seu email aqui..." /></div>
                  <div className="col-lg-3 col-md-12 col-12"><button className={`news-button ${bgDefault && 'bg-info'} ${props.dark && 'bg-dark'} ${props.black && 'bg-black'} ${props.blue && 'bg-info'} ${props.white && 'bg-white'}`}>Inserir email</button></div>
                </div>
              </div>
            </div>
            <div className={`line-gray ${bgDefault && 'bg-info'} ${props.dark && 'bg-dark'} ${props.black && 'bg-black'} ${props.blue && 'bg-info'} ${props.white && 'bg-white'}`}></div>
          </>
        }
        <div className="foot">
          <div className="row col-6 footer-coluna1">
            <div className="col-4 logos">
              <a href="#" className="align-items-center mb-5 main-logo">
                <img src={`${props.black ? LogoWhite : LogoBlack}`} alt="Logo Appe Plus" height={48} />
                <div className={`line-small ${bgDefault && 'bg-info'} ${props.dark && 'bg-dark'} ${props.black && 'bg-black'} ${props.blue && 'bg-info'} ${props.white && 'bg-white'}`}></div>
              </a>
              <div className="d-flex redes" style={{ marginTop: 20 }} >
                <a href='https://www.facebook.com/appepluscom' aria-label='facebook' style={{ marginRight: 15 }}><AiFillFacebook color={`${props.black ? "white" : "#000000"}`} size={28} /></a>
                <a href='https://www.instagram.com/appeplus/' aria-label='instagram' style={{ marginRight: 15 }}><AiOutlineInstagram color={`${props.black ? "white" : "#000000"}`} size={28} /></a>
                <a href='https://www.linkedin.com/company/appeplus' aria-label='linkedin'><AiFillLinkedin color={`${props.black ? "white" : "#000000"}`} size={28} /></a>
                {/* <a href='#' aria-label='youtube' style={{ marginRight: 15 }}><AiFillYoutube color={`${props.black ? "white" : "#000000"}`} size={28} /></a> */}
              </div>
            </div>
            <div className="col-8 logos">
              <img src={Logo} alt="Logo Appe Plus" height={80} />
            </div>
          </div>

          <div className="row col-6 footer-coluna2">
            <div className="col-lg-4 col-md-4 col-12 contatos">
              <ul className="nav flex-column">
                {/* <li className="nav-item mb-2">
                  <Link to="/quemSomos"><p>Nossa história</p></Link>
                </li> */}
                {/* <li className="nav-item mb-2">
                  <a href='#'><p>Como funciona</p></a>
                </li>
                <li className="nav-item mb-2">
                  <a href='#'><p>Central de ajuda</p></a>
                </li> */}
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 col-12 contatos" >
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/quemSomos"><p>Sobre o Appê Plus</p></Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/contato"><p>Trabalhe conosco</p></Link>
                </li>
                <li className="nav-item mb-2">
                  <a href='https://blog.appeplus.com/' target='_blank' rel="noreferrer"><p>Blog</p></a>
                </li>
                {/* <li className="nav-item mb-2">
                  <a href='#'><p>Sitemap</p></a>
                </li>
                <li className="nav-item mb-2">
                  <a href='#'><p>Perguntas frequentes</p></a>
                </li> */}
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 col-12 contatos" >
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/politica-privacidade"><p>Política de privacidade</p></Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/termos-uso"><p>Termos e condições de uso</p></Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/contato"><p>Fale com a gente</p></Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className={`line-gray ${bgDefault && 'bg-info'} ${props.dark && 'bg-dark'} ${props.black && 'bg-black'} ${props.blue && 'bg-info'} ${props.white && 'bg-white'}`}></div>
        <div className="end-footer">
          <div>
            <p style={{ marginTop: 25 }}>© 2022 - Appe +.  CRECI-MG J0007263. </p>
          </div>
          <div>
            <p style={{ marginTop: 25 }}>Todos os direitos reservados.</p>
          </div>
          <div>
            <p style={{ marginTop: 25 }}>APPÊ DIGITAL SERVIÇOS IMOBIÁLIRIOS LTDA - CNPJ: 44.105.436/0001-10</p>
          </div>
        </div>

      </div >
    </footer >
  );
}