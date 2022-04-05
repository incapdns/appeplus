import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { iDadosUsuario } from "../@types";
import api from "../services/api";

import "../styles/pages/cadastro/corretor/geral.scss";

interface iStepperCadastroCorretor {
  dadosPessoais?: boolean;
  uploadDocumento?: boolean;
  uploadComprovante?: boolean;
  sobreVoce?: boolean;
  informacoesExtras?: boolean;
  suasEspecialidades?: boolean;
  localDeAtuacao?: boolean;
  dataHoraAtuacao?: boolean;
  dadosBancarios?: boolean;
  editar?: boolean;
}

export function StepperCadastroCorretor(props: iStepperCadastroCorretor) {
  let [progressBar, setProgressBar] = useState(0);
  const [dadosPessoais, setDadosPessoais] = useState(0);
  const [dadosAdicionais, setDadosAdicionais] = useState(0);
  const [dadosProficionais, setDadosProficionais] = useState(0);
  const [dadosBancarios, setDadosBancarios] = useState(0);
  let [status, setStatus] = useState(0);

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  useEffect(() => {
    // ProgressBar();
    GetStatusCadastro();
  }, [
    props.dadosPessoais,
    props.uploadDocumento,
    props.uploadComprovante,
    props.sobreVoce,
    props.informacoesExtras,
    props.suasEspecialidades,
    props.localDeAtuacao,
    props.dataHoraAtuacao,
    props.dadosBancarios,
    status,
  ]);

  function ProgressBar() {
    let progress = 0;
    let dadosPessoais = 0;
    let dadosAdicionais = 0;
    let dadosProficionais = 0;
    let dadosBancarios = 0;

    if (props.dadosPessoais) {
      progress += 11.5;
      dadosPessoais += 1;
    }
    if (props.uploadDocumento) {
      progress += 11.5;
      dadosPessoais += 1;
    }
    if (props.uploadComprovante) {
      progress += 12.5;
      dadosPessoais += 1;
    }
    if (props.sobreVoce) {
      progress += 11.5;
      dadosAdicionais += 1;
    }
    if (props.informacoesExtras) {
      progress += 11.5;
      dadosAdicionais += 1;
    }
    if (props.suasEspecialidades) {
      progress += 11.5;
      dadosProficionais += 1;
    }
    if (props.localDeAtuacao) {
      progress += 11.5;
      dadosProficionais += 1;
    }
    if (props.dataHoraAtuacao) {
      progress += 11.5;
      dadosProficionais += 1;
    }
    if (props.dadosBancarios) {
      progress += 11.5;
      dadosBancarios += 1;
    }
    setProgressBar(progress);
    setDadosPessoais(dadosPessoais);
    setDadosAdicionais(dadosAdicionais);
    setDadosProficionais(dadosProficionais);
    setDadosBancarios(dadosBancarios);
  }

  async function GetStatusCadastro() {
    await api
      .get(`Corretor/buscar-status-cadastro?codCorretor=${usuario.codCorretor}`)
      .then((response) => {
        const res = response.data.data;
        status = res;
        console.log('getdados',res);
        if (res === 1) {
          setProgressBar(20);
        } else if (res === 2) {
          setProgressBar(40);
        } else if (res === 3) {
          setProgressBar(60);
        } else if (res === 4) {
          setProgressBar(80);
        } else if (res === 5) {
          setProgressBar(100);
        } else {
          setProgressBar(0);
        }
        console.log(`res ${res}`);
        console.log(`progressBar ${progressBar}`);
        setStatus(res);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  return (
    <div className="card card-lateral position-sticky" id="stepper-corretor">
      <div className="card-body">
        <div className="card mb-3 border-success card-progress">
          <div className="card-body">
            <p>Progresso</p>
            <div className="progress">
              <div
                className="progress-bar-anuncio bg-success"
                style={{ width: `${progressBar}%` }}
                role="progressbar"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
        <hr />
        <div
          className={`card  mb-4 ${
            status >= 1 ? "border-success card-sucesso" : "card-incompleto"
          }`}
        >
          <div
            className={`card-header d-flex justify-content-between align-items-center ${
              status >= 1 && "text-white bg-success"
            }`}
          >
            {status >= 1 ? (
              <>
                <Link to="/cadastro/dadosCorretor">Dados pessoais</Link>{" "}
              </>
            ) : (
              <>Dados pessoais </>
            )}
          </div>
          <div className="card-body">
            <p className={`card-text ${status >= 1 && "text-success"}`}>
              {status >= 1 ? (
                <>
                  <Link to="/cadastro/dadosCorretor">
                    Dados pessoais {status >= 1 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>Dados pessoais {status >= 1 && <BsFillCheckCircleFill />}</>
              )}
            </p>

            <p className={`card-text ${status >= 1 && "text-success"}`}>
              {status >= 1 ? (
                <>
                  <Link to="/cadastro/dadosCorretor">
                    Upload de documento{" "}
                    {status >= 1 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>
                  Upload de documento {status >= 1 && <BsFillCheckCircleFill />}
                </>
              )}
            </p>

            <p className={`card-text ${status >= 1 && "text-success"}`}>
              {status >= 1 ? (
                <>
                  <Link to="/cadastro/dadosCorretor">
                    Upload de comprovante{" "}
                    {status >= 1 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>
                  Upload de comprovante{" "}
                  {status >= 1 && <BsFillCheckCircleFill />}
                </>
              )}
            </p>
          </div>
        </div>

        <div
          className={`card  mb-4 ${
            status >= 2 ? "border-success card-sucesso" : "card-incompleto"
          }`}
        >
          <div
            className={`card-header d-flex justify-content-between align-items-center ${
              status >= 2 && "text-white bg-success"
            }`}
          >
            {status >= 2 ? (
              <>
                <Link to="/cadastro/corretor/sobre-voce">Dados adicionais</Link>{" "}
              </>
            ) : (
              <>Dados adicionais </>
            )}
          </div>
          <div className="card-body">
            <p className={`card-text ${status >= 2 && "text-success"}`}>
              {status >= 2 ? (
                <>
                  <Link to="/cadastro/corretor/sobre-voce">
                    Sobre você {status >= 2 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>Sobre você {status >= 2 && <BsFillCheckCircleFill />}</>
              )}
            </p>

            <p className={`card-text ${status >= 2 && "text-success"}`}>
              {status >= 2 ? (
                <>
                  <Link to="/cadastro/corretor/sobre-voce">
                    Informações extras{" "}
                    {status >= 2 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>
                  Informações extras {status >= 2 && <BsFillCheckCircleFill />}
                </>
              )}
            </p>
          </div>
        </div>

        <div
          className={`card  mb-4 ${
            status >= 3 ? "border-success card-sucesso" : "card-incompleto"
          }`}
        >
          <div
            className={`card-header d-flex justify-content-between align-items-center ${
              status >= 3 && "text-white bg-success"
            }`}
          >
            {status >= 3 ? (
              <>
                <Link to="/cadastro/corretor/atuacao">Dados profissionais</Link>{" "}
              </>
            ) : (
              <>Dados profissionais </>
            )}
          </div>
          <div className="card-body">
            <p className={`card-text ${status >= 3 && "text-success"}`}>
              {status >= 3 ? (
                <>
                  <Link to="/cadastro/corretor/atuacao">
                    Suas especialidades{" "}
                    {status >= 3 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>
                  Suas especialidades {status >= 3 && <BsFillCheckCircleFill />}
                </>
              )}
            </p>

            <p className={`card-text ${status >= 3 && "text-success"}`}>
              {status >= 3 ? (
                <>
                  <Link to="/cadastro/corretor/atuacao">
                    Local de atuação {status >= 3 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>Local de atuação {status >= 3 && <BsFillCheckCircleFill />}</>
              )}
            </p>

            <p className={`card-text ${status >= 3 && "text-success"}`}>
              {status >= 3 ? (
                <>
                  <Link to="/cadastro/corretor/atuacao">
                    Data e horário de atuação{" "}
                    {status >= 3 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>
                  Data e horário de atuação{" "}
                  {status >= 3 && <BsFillCheckCircleFill />}
                </>
              )}
            </p>
          </div>
        </div>

        <div
          className={`card  mb-4  ${
            status >= 4 ? "border-success card-sucesso" : "card-incompleto"
          }`}
        >
          <div
            className={`card-header d-flex justify-content-between align-items-center ${
              status >= 4 && "text-white bg-success"
            }`}
          >
            {status >= 4 ? (
              <>
                <Link to="/cadastro/corretor/dados-bancarios">
                  Dados Bancários
                </Link>{" "}
              </>
            ) : (
              <>Dados Bancários </>
            )}
          </div>
          <div className="card-body">
            <p className={`card-text ${status >= 4 && "text-success"}`}>
              {status >= 4 ? (
                <>
                  <Link to="/cadastro/corretor/dados-bancarios">
                    Dados do seu banco{" "}
                    {status >= 4 && <BsFillCheckCircleFill />}
                  </Link>
                </>
              ) : (
                <>
                  Dados do seu banco {status >= 4 && <BsFillCheckCircleFill />}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
