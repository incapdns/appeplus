import '../styles/anuncioimovel.scss';
import { ProgressBar } from 'react-bootstrap';
import { useEffect, useState } from "react";

interface AnuncioSimples {
  Localizacao?: boolean;
  Sobre?: boolean;
  Imagens?: boolean;
}

interface AnuncioAzul {
  Corretor?: boolean;
  Documento?: boolean;
}

interface AnuncioLaranja {
  Diferenciais?: boolean;
  Detalhes?: boolean;
}

interface AnuncioBlack {
  Pesquisa?: boolean;
}

export default function StepperAnuncio(simples: AnuncioSimples, azul: AnuncioAzul, laranja: AnuncioLaranja, black: AnuncioBlack) {
  const [progressBar, setProgressBar] = useState(0);

  function progress_bar_value() {
    if (simples) {
      if (simples.Localizacao) setProgressBar(progressBar + 15);
      if (simples.Sobre) setProgressBar(progressBar + 15);
      if (simples.Imagens) setProgressBar(progressBar + 15);
    }
    if (azul) {
      if (azul.Corretor) setProgressBar(progressBar + 15);
      if (azul.Documento) setProgressBar(progressBar + 10);
    }
    if (laranja) {
      if (laranja.Diferenciais) setProgressBar(progressBar + 10);
      if (laranja.Detalhes) setProgressBar(progressBar + 10);
    }
    if (black) {
      if (black.Pesquisa) setProgressBar(progressBar + 10);
    }
    return progressBar;
  }

  return (
    <div className="stepper-anuncio-card" >
      <div className="anuncio-progress-card" >
        <h5 className="card-title">Progresso</h5>
        <ProgressBar variant="success" now={30} className="progress-bar-anuncio" ></ProgressBar>
      </div>
      <div className="text-information-card" >
        <p className="information-text">Esse é o seu progresso no preenchimento de informações para o anuncio do seu imovel ir ao ar.</p>
      </div>
      <div>
        <div className="anuncio-simples-card " >
          <div className="anuncio-simples-card-header">
            <p className="anuncio-simples-card-header-text">Anuncio Simples</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-anuncio-card">Tipo e Localização do imóvel</li>
            <li className="list-group-item text-anuncio-card">Sobre seu imóvel</li>
            <li className="list-group-item text-anuncio-card">Imagens</li>
          </ul>
        </div>

        <div className="anuncio-azul-card" >
          <div className="anuncio-azul-card-header">
            <p className="anuncio-azul-card-header-text">Anuncio Azul</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-anuncio-card">Visita ao imóvel</li>
            <li className="list-group-item text-anuncio-card">Documentos do seu imóvel</li>
          </ul>
        </div>

        <div className="anuncio-laranja-card" >
          <div className="anuncio-laranja-card-header">
            <p className="anuncio-laranja-card-header-text">Anuncio Laranja</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-anuncio-card">Diferenciais do imóvel</li>
            <li className="list-group-item text-anuncio-card">Detalhes do imóvel</li>
          </ul>
        </div>

        <div className="anuncio-black-card" >
          <div className="anuncio-black-card-header">
            <p className="anuncio-black-card-header-text">Anuncio Black</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-anuncio-card">Conte-nos sobre você</li>
          </ul>
        </div>
      </div>
    </div>
  );
}