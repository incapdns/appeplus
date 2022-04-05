import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { iDadosUsuario } from "../@types";
import api from "../services/api";

import '../styles/pages/cadastro/corretor/geral.scss';

interface iStepperCadastroInteresse {
  tipoImovel?: boolean;
  localPreferencia?: boolean;
  sobreImovel?: boolean;
  escolhaCorretor?: boolean;
  detalhesImovel?: boolean;
}

export function StepperCadastroInteresse(props: iStepperCadastroInteresse) {
  const [progressBar, setProgressBar] = useState(0);
  const [passo1, setPasso1] = useState(0);
  const [passo2, setPasso2] = useState(0);
  const [passo3, setPasso3] = useState(0);
  const [faseComprador, setFaseComprador] = useState(0);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@appePlus/usuario') || '{}'
  );

  const {
    tipoImovel,
    localPreferencia,
    sobreImovel,
    escolhaCorretor,
    detalhesImovel,
  } = props;

  useEffect(() => {
    ProgressBar();
    buscarFase();
  }, [
    tipoImovel,
    localPreferencia,
    sobreImovel,
    escolhaCorretor,
    detalhesImovel,
  ]);

  async function buscarFase() {
    await api
      .get(
        `cliente/fase-comprador?codCliente=${usuario.codCliente}`
      )
      .then((Response) => {
        setFaseComprador(Response.data.data);
      });
  }

  function ProgressBar() {
    let progress = 0;
    let passo1 = 0;
    let passo2 = 0;
    let passo3 = 0;
    if (faseComprador >= 1) {
      progress += 20;
      passo1 += 1;
    }
    if (faseComprador >= 1) {
      progress += 20;
      passo1 += 1;
    }
    if (faseComprador >= 1) {
      progress += 20;
      passo1 += 1;
    }
    if (faseComprador >= 2) {
      progress += 20;
      passo2 += 1;
    }
    if (faseComprador >= 3) {
      progress += 20;
      passo3 += 1;
    }
    setProgressBar(progress);
    setPasso1(passo1);
    setPasso2(passo2);
    setPasso3(passo3);
  }

  return (
    <div className="card card-lateral position-sticky" id="stepper-corretor">
      <div className="card-body">

        <div className="card mb-3 border-success card-progress">
          <div className="card-body">
            <p>Progresso</p>
            <div className="progress">
              <div className="progress-bar-anuncio bg-success" style={{ width: `${progressBar}%` }} role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
            </div>
          </div>
        </div>

        <p className="content">Esta é a porcentagem restante de campos para completa para o seu anúncio ir ao ar.</p>

        <hr />

        <div className={`card  mb-4 ${(faseComprador >= 1) ? 'border-success card-sucesso' : 'card-incompleto'}`}>
          <div className={`card-header d-flex justify-content-between align-items-center ${(faseComprador >= 1) && 'text-white bg-success'}`}>
            {(faseComprador >= 1 )
              ? <><Link to="/cadastro/interesse">Passo 1</Link> <span>{passo1}/3</span></>
              : <>Passo 1  <span>{passo1}/4</span></>
            }
          </div>
          <div className="card-body">

          <p className={`card-text ${(faseComprador >= 1) && 'text-success'}`}>
              {faseComprador >= 1
                ? <><Link to="/cadastro/dadosComprador">Dados pessoais {faseComprador >= 1 && <BsFillCheckCircleFill />}</Link></>
                : <>Dados pessoais {faseComprador >= 1 && <BsFillCheckCircleFill />}</>
              }
            </p>

            <p className={`card-text ${(faseComprador >= 1) && 'text-success'}`}>
              {faseComprador >= 1
                ? <><Link to="/cadastro/interesse">Tipo do seu imóvel {faseComprador >= 1 && <BsFillCheckCircleFill />}</Link></>
                : <>Tipo do seu imóvel {faseComprador >= 1 && <BsFillCheckCircleFill />}</>
              }
            </p>

            <p className={`card-text ${(faseComprador >= 1 && faseComprador >= 1) && 'text-success'}`}>
              {faseComprador >= 1
                ? <><Link to="/cadastro/interesse">Local de preferência {faseComprador >= 1 && <BsFillCheckCircleFill />}</Link></>
                : <>Local de preferência {faseComprador >= 1 && <BsFillCheckCircleFill />}</>
              }
            </p>

            <p className={`card-text ${(faseComprador >= 1 ) && 'text-success'}`}>

              {faseComprador >= 1
                ? <><Link to="/cadastro/interesse">Sobre o imóvel {faseComprador >= 1 && <BsFillCheckCircleFill />}</Link></>
                : <>Sobre o imóvel {faseComprador >= 1 && <BsFillCheckCircleFill />}</>
              }
            </p>
          </div>
        </div>

        <div className={`card  mb-4 ${faseComprador >= 2 ? 'border-success card-sucesso' : 'card-incompleto'}`}>
          <div className={`card-header d-flex justify-content-between align-items-center ${faseComprador >= 2 && 'text-white bg-success'}`}>
            {faseComprador >= 2
              ? <><Link to="/cadastro/cliente/escolhaCorretor">Passo 2</Link> <span>{passo2}/1</span></>
              : <>Passo 2 <span>{passo2}/1</span></>
            }
          </div>
          <div className="card-body">
            <p className={`card-text ${faseComprador >= 2 && 'text-success'}`}>
              {faseComprador >= 2
                ? <><Link to="/cadastro/cliente/escolhaCorretor">Escolha seu corretor {faseComprador >= 2 && <BsFillCheckCircleFill />}</Link></>
                : <>Escolha seu corretor {faseComprador >= 2 && <BsFillCheckCircleFill />}</>
              }
            </p>
          </div>
        </div>

        <div className={`card  mb-1 ${faseComprador >= 3 ? 'border-success card-sucesso' : 'card-incompleto'}`}>
          <div className={`card-header d-flex justify-content-between align-items-center ${faseComprador >= 3 && 'text-white bg-success'}`}>
            {faseComprador >= 3
              ? <><Link to="/cadastro/interesse/detalhes">Passo 3</Link> <span>{passo3}/1</span></>
              : <>Passo 3 <span>{passo3}/1</span></>
            }
          </div>
          <div className="card-body">

            <p className={`card-text ${faseComprador >= 3 && 'text-success'}`}>
              {faseComprador >= 3
                ? <><Link to="/cadastro/interesse/detalhes">Detalhes do seu imóvel {faseComprador >= 3 && <BsFillCheckCircleFill />}</Link></>
                : <>Detalhes do seu imóvel {faseComprador >= 3 && <BsFillCheckCircleFill />}</>
              }
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}