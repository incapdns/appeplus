import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import { BsArrowRight, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Alert from "../components/Alert";
import "../styles/global.scss";
import sha256 from "crypto-js/sha256";
import { iDadosUsuario } from "../@types";


interface Props {
    title?: boolean;
}

export function RedefinirSenha() {
    const usuario: iDadosUsuario = JSON.parse(
        localStorage.getItem("@appePlus/usuario") || "{}"
    );
    const history = useHistory();
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [verSenha, setVerSenha] = useState(false);
    const [email, setEmail] = useState("");
    const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
    const [alertErro, setAlertErro] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [alterandoSenha, setAlterandoSenha] = useState(window.location.pathname === "/usuario/alterarSenha");

    useEffect(() => {
    }, []);

    async function submit() {
        setLoading(true);
        const pathname = window.location.pathname.split("/");
        const token = pathname[3];
        console.log(
            "🚀 ~ file: RedefinirSenha.tsx ~ line 10 ~ RedefinirSenha ~ token", token
        );

        if (senha === confirmarSenha) {
            if (alterandoSenha) {
                await api
                    .put(`api/Usuario/atualizar-senha?CodUsuario=${usuario.codUsuario}`,
                        {
                            senha: sha256(senha).toString(),
                            confirmacaoSenha: sha256(confirmarSenha).toString()
                        }
                    )
                    .then((response) => {
                        setLoading(false);
                        history.push("/");
                    })
                    .catch((error) => {
                        console.log("Ocorreu um erro");
                        setLoading(false);
                    });
            } else {
                await api
                    .patch(`api/Usuario/trocar-senha`,
                        {
                            email: email,
                            tokenValidacao: token,
                            senha: sha256(senha).toString(),
                            confirmacaoSenha: sha256(confirmarSenha).toString()
                        }
                    )
                    .then((response) => {
                        setLoading(false);
                        history.push("/");
                    })
                    .catch((error) => {
                        console.log("Ocorreu um erro");
                        setLoading(false);
                    });
            }
        } else {
            setLoading(false);
            setAlertErro(true);
            setMsgErro(
                "As senhas não coincidem."
            );
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-9 mt-3">
                        <div className="row mt-5">
                            <div className="col-md-12 my-5">
                                <h1 className="title">Redefinir sua senha</h1>
                            </div>
                            <div >
                                <div className="row banner">
                                    {alertErro && <Alert msg={msgErro} setAlertErro={setAlertErro} />}
                                    <div className="col-lg-6">
                                        {!alterandoSenha && (
                                            <>
                                                <p>Seu Email:</p>
                                                <div className="col-12 mb-2">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={email}
                                                        required
                                                        onChange={(event) => setEmail(event.target.value)}
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <p>Digite sua nova senha abaixo:</p>
                                        <div className="col-12 mb-2">
                                            <div className="input-group">
                                                <input
                                                    type={verSenha ? "text" : "password"}
                                                    required
                                                    className="form-control"
                                                    value={senha}
                                                    onChange={(event) => setSenha(event.target.value)}
                                                    placeholder="*****"
                                                />
                                                <span
                                                    className="input-group-text"
                                                    id="verSenha"
                                                    onClick={() => setVerSenha(!verSenha)}
                                                >
                                                    {verSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                                </span>
                                            </div>
                                        </div>
                                        <p>Confirmar senha:</p>
                                        <div className="col-12 mb-2">
                                            <div className="input-group">
                                                <input
                                                    type={verConfirmarSenha ? "text" : "password"}
                                                    required
                                                    className="form-control"
                                                    value={confirmarSenha}
                                                    onChange={(event) => setConfirmarSenha(event.target.value)}
                                                    placeholder="*****"
                                                />
                                                <span
                                                    className="input-group-text"
                                                    id="verSenha"
                                                    onClick={() => setVerConfirmarSenha(!verConfirmarSenha)}
                                                >
                                                    {verConfirmarSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-0 pt-4 text-lg-end text-md-end text-center botoes">
                                    <button
                                        className="buttonSearch text-lg-end text-md-end text-center"
                                        onClick={submit}
                                    >{loading ? (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /></>)
                                        : (<>Salvar</>)}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
