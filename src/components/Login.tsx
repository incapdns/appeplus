import sha256 from "crypto-js/sha256";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import api from "../services/api";
import { tipoUsuario } from "../@types";
import { GoogleLogin } from "react-google-login";
import Alert from "../components/Alert";
import "../styles/components/login.scss";
import * as bootstrap from "bootstrap";
import * as jquery from "jquery";
import { BsGoogle } from "react-icons/bs";
import { IoMdArrowForward } from "react-icons/io";
import LogoModal from '../assets/Logo/logo-vertical-white.svg'
declare var jQuery: any;

export function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    if (email !== "" && senha !== "") {
      api
        .post("api/Auth/authenticar", {
          email,
          senha: sha256(senha).toString(),
        })
        .then((response) => {
          console.log(
            "🚀 ~ file: Login.tsx ~ line 37 ~ .then ~ response.data.data",
            response.data.data
          );
          localStorage.setItem(
            "@appePlus/usuario",
            JSON.stringify(response.data.data)
          );
          // sessionStorage.setItem("@appePlus/usuario",
          //   JSON.stringify(response.data.data));

          setLoading(false);
          console.log(response.data.data)
          if (response.data.data.tipo === tipoUsuario.corretor) {
            $("#modalLogin").modal("hide");
            if (response.data.data.codStatus == 1) {
              history.push("/dashboard/corretor/clientes");
            } else if (response.data.data.codStatus == 3) {
              history.push("/cadastro/corretor/sucesso");
            } else {
              history.push("/cadastro/dadosCorretor");
            }
          } else if (response.data.data.tipo === tipoUsuario.cliente) {
            $("#modalLogin").modal("hide");
            history.push("/dashboard/meus-imoveis");
          } else if (response.data.data.tipo === tipoUsuario.admin) {
            $("#modalLogin").modal("hide");
            history.push("/adm/dashboard");
          } else {
            $("#modalLogin").modal("hide");
            history.push("/");
          }
        })
        .catch((error) => {
					if(error){
						setError("Usuário ou senha inválido.");
						setLoading(false);
					}
        });
    } else {
      setError("Digite seu e-mail e sua senha para logar.");
      setLoading(false);
    }
  }

  const responseGoogleSucess = (response: any) => {
    setEmail(response.Vs.Gt);
    setSenha(response.Vs.TS);
  };

  const responseGoogleError = (response: any) => {
    setAlertErro(true);
    setMsgErro(
      "Houve um erro ao tentar efetuar o seu login com o Google. Tente novamente mais tarde."
    );
  };

  function RecuperarSenha() {
    $("#modalLogin").modal("hide");
    history.push("/recuperar-senha");
  }

  return (
	<>
		<div className="modal fade bd-example-modal-lg" id="modalRetryLogin" aria-hidden="true">
			<div className="modal-dialog " role="document">
			<div className="modal-content">
				<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">A sessão expirou</h5>
				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				</div>
				<div className="modal-body">
				<h2>Ops! Parece que você não esta logado.</h2>
				<p>Para continuar navegando é preciso fazer o <button className="cadastro-button" onClick={() => history.push('/')} data-bs-dismiss="modal" >cadastro</button>, ou se já possui, realizar o login.</p>
				</div>
				<div className="modal-footer text-center">
				<button type="button" className="btn btn-primary login-imovel" data-bs-toggle="modal" data-bs-target="#modalLogin"> Login</button>
				</div>

			</div>
			</div>
		</div>
		<div
			className="modal fade"
			id="modalLogin"
			tabIndex={-1}
			aria-labelledby="modalLoginLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-sm modal-dialog-centered modal-fullscreen-sm-down">
			<div className="modal-content">
				<form onSubmit={handleSubmit}>
				<div className="modal-header">
					<div className="modal-title" id="modalLoginLabel">
					<img src={LogoModal} alt="logo modal" />
					</div>
					<button
					type="button"
					className="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
					></button>
				</div>
				<div className="modal-body">
					<p>Acesse com seu email e senha</p>

					<div className="form-floating mb-3">
					<input
						placeholder="Email"
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={loading}
						required
					/>
					<label htmlFor="email">Email</label>
					</div>
					<div className="form-floating mb-3">
					<input
						placeholder="Senha"
						type="password"
						className="form-control"
						id="senha"
						value={senha}
						onChange={(e) => setSenha(e.target.value)}
						disabled={loading}
						required
					/>
					<label htmlFor="senha">Senha</label>
					</div>

					{error && (
					<div className="alert alert-warning alert-dismissible fade show mt-3 mb-0">
						{error}
						<button
						type="button"
						className="btn-close"
						data-bs-dismiss="alert"
						aria-label="Close"
						/>
					</div>
					)}

					<div className="d-grid gap-2">
					<button
						type="submit"
						className="btn btn-primary btn-lg"
						disabled={loading}
					>
						Entrar
						{loading && (
						<div
							className="spinner-border spinner-border-sm mx-2"
							role="status"
						/>
						)}
					</button>
					<button
						type="button"
						className="btn btn-link"
						disabled={loading}
						onClick={RecuperarSenha}
					>
						Esqueci minha senha <IoMdArrowForward />
					</button>
					</div>

					<hr />

					{/* <p>Ou acesse com sua conta Google</p>

					<div className="d-grid r-linha">
					<GoogleLogin
						clientId={
						"1067749589313-6eltbgbhmdteon48tj37l1tj1r2bebq4.apps.googleusercontent.com"
						}
						onSuccess={responseGoogleSucess}
						onFailure={responseGoogleError}
						render={(renderProps) => (
						<button
							className="btn btn-google"
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
						>
							<BsGoogle />
							<span>Entrar com Google</span>
						</button>
						)}
					/>
					</div> */}
					{alertErro && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErro} />
					</div>
					)}
				</div>
				</form>
			</div>
			</div>
		</div>
	</>
  );
}
