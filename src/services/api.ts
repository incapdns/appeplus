import axios from "axios";
import { useHistory } from "react-router-dom";
import { iDadosUsuario } from "../@types";

const api = axios.create({
  //baseURL: "https://apidev.appeplus.com",
  //baseURL: "https://apihomolog.appeplus.com",
  baseURL: "https://api.appeplus.com",
  //baseURL: "https://localhost:5000"
});

api.interceptors.request.use(async (config) => {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const token = usuario.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status == 401){
    localStorage.clear();
  
    (window as any)['root_history'].push("/")

    $('#modalRetryLogin').modal("show")
    return error
  }
});

export default api;