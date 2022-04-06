import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/pages/recuperarSenha.scss";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    await api
      .post(`api/Usuario/esqueceu-senha?email=${email}`)
      .then((response) => {
        setLoading(false);
        setSuccess(
          "Enviamos um email com informações para recuperar sua senha."
        );
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setError(error.response.data.message);
        setLoading(false);
      });
  }
  return (
    <>
      <Navbar />

      <div className={`container para-trabalhar`} id="recuperar-senha">
        <div className="container">
          <p className="subtitle">Esqueceu sua senha?</p>
          <hr />
          <h3>Recuperar senha</h3>
          <p>informe seu email cadastrado no appê+ para recuperar sua senha:</p>
          <form onSubmit={handleSubmit}>
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

            {error && (
              <div className="alert alert-warning alert-dismissible fade show my-3">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setError("")}
                />
              </div>
            )}

            {success && (
              <div className="alert alert-success alert-dismissible fade show my-3">
                {success}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setSuccess("")}
                />
              </div>
            )}

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                Enviar
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm mx-2"
                    role="status"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
