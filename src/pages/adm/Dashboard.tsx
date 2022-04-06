import { ClientRequest } from "http";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { setTimeout } from "timers";
import { iDadosUsuario } from "../../@types";
import Grafico from "../../components/Dashboard/Grafico";

import Footer from "../../components/Footer";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import NavbarDashCorretor from "../../components/Navbar/NavbarDashCorretor";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import api from "../../services/api";
import "../../styles/pages/dashboard/meusImoveis.scss";


interface iDadosGraficos {
  name:string,
  value:number
}


export default function DashboardAdm() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );


  
 

  const history = useHistory();
  const [dadosClientes, setDadosClientes] = useState([]);
  const [dadosClientesTotal, setDadosClientesTotal] = useState<iDadosGraficos[]>([]);
  const [dadosImoveis, setDadosImoveis] = useState([]);
  const [dadosImoveisTotal, setDadosImoveisTotal] = useState<iDadosGraficos[]>([]);
  const [dadosCorretores, setDadosCorretores] = useState([]);
  const [dadosCorretoresTotal, setDadosCorretoresTotal] = useState<iDadosGraficos[]>([]);
  const [dadosColorClientes, setDadosColorClientes] = useState([]);
  const [dadosColorImoveis, setDadosColorImoveis] = useState([]);
  const [dadosColorCorretores, setDadosColorCorretores] = useState([]);

  const [totalValorCliente, setTotalvalorCliente] = useState('')
  const [totalValorImovel, setTotalvalorImovel] = useState('')
  const [totalValorCorretor, setTotalvalorCorretor] = useState('')
  const[loading,setLoading] = useState(false)
  


  async function getDadosGraficoClientes(){
    let arrayCliente:any = []
    var dados:any =[]
    setLoading(true)
    await api.get(`cliente/status`).then(response =>{
       dados = response.data.data
       arrayCliente = response.data.data
       setDadosClientes(response.data.data)
       setLoading(false)
    }).catch(error =>{
      console.log(error)
    })
    var arrayClienteNovo:any = []
    arrayCliente.map((cliente:any)=> {
      return(
        arrayClienteNovo.push(cliente.value)
      )
    })
    var result:number = 0
    for(let i = 0; i < arrayClienteNovo.length; i++){
      result += arrayClienteNovo[i]
    }
    var resultado = String(result)
   setTotalvalorCliente(resultado)
   const colors:any = [
      "#FF734D",
      "#20c997",
      "#318CF7",
      "#ffb30f",
      "#C7C7C7",
      "#005AC4",
      "#0dcaf0",
      "#318CF7",
      "#C93B14",
      "#8ACCDB",
      
    ];

    let  cor = colors.slice(0,dados.length) 
    setDadosColorClientes(cor)
    

  }

  async  function getDadosGraficoImoveis(){
    let arrayImovel:any = []
    var dados:any =[]
    setLoading(true)
      await api.get(`imovel/status`).then(response =>{
      dados = response.data.data
      arrayImovel = response.data.data
      setDadosImoveis(response.data)
      setLoading(false)
    }).catch(error =>{
      console.log(error)
    })
    var arrayImovelNovo:any = []
    arrayImovel.map((imovel:any)=> {
      return(
        arrayImovelNovo.push(imovel.value)
      )
    })
    

    var result:number = 0
    for(let i = 0; i < arrayImovelNovo.length; i++){
      result += arrayImovelNovo[i]
    }
    var resultado = String(result)
   setTotalvalorImovel(resultado)
    
   const colors:any = [
    "#FF734D",
    "#20c997",
    "#318CF7",
    "#ffb30f",
    "#C7C7C7",
    "#005AC4",
    "#0dcaf0",
    "#318CF7",
    "#C93B14",
    "#8ACCDB",
    
  ];

  let  cor = colors.slice(0,dados.length) 
  setDadosColorImoveis(cor)
  

    setDadosImoveis(dados)
  }

  async  function getDadosGraficoCorretores(){
    setLoading(true)
    let arrayCorretores:any = []
    var dados:any =[]
    await api.get(`corretor/status`).then(response =>{
      dados = response.data.data
      arrayCorretores = response.data.data
      setLoading(false)
    }).catch(error =>{
      console.log(error)
    })
    var arrayCorretorNovo:any = []
    arrayCorretores.map((corretor:any)=> {
      return(
         arrayCorretorNovo.push(corretor.value)
      )
    })
    var result:number = 0
    for(let i = 0; i <  arrayCorretorNovo.length; i++){
      result +=  arrayCorretorNovo[i]
    }
    var resultado = String(result)
   setTotalvalorCorretor(resultado)
    setDadosCorretores(dados)
    
    const colors:any = [
      "#20c997",
      "#ffb30f",
      "#FF734D",
      "#318CF7",
      "#C7C7C7",
      "#005AC4",
      "#0dcaf0",
      "#318CF7",
      "#C93B14",
      "#8ACCDB",
      
    ];

    let  cor = colors.slice(0,dados.length) 
    setDadosColorCorretores(cor)
    

  }
  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }
  useEffect(() => {
    checaUsuarioLogado();
    getDadosGraficoClientes()
    getDadosGraficoImoveis()
    getDadosGraficoCorretores();
  }, []);
  return (
    <>
    <div className="wrapper-imoveis pb-5" id="dashboard-adm">
    <NavbarDashAdm />
      <div className="main-content">
        <NavbarDashHeader />
        <div className="container">
          <h2>Dashboard</h2>
          
            <div className="row">
              <div className="col-lg-12">

                {dadosClientes?.length > 0  ? (<Grafico dados={dadosClientes} colors={dadosColorClientes} total={totalValorCliente} heading='Meus Clientes' />) : ('')}
              </div>
              <div className="col-lg-12">
               
                 {dadosImoveis?.length > 0  ? (<Grafico dados={dadosImoveis} colors={dadosColorImoveis} total={totalValorImovel} heading='Imoveis'/>): ('')} 
                
                
              </div>
              <div className="col-lg-12">
               
                  {dadosCorretores?.length > 0  ? (<Grafico dados={dadosCorretores}  colors={dadosColorCorretores}  total={totalValorCorretor}  heading='Corretores' />) : ('')}
                
                
              </div>
              
            </div>
        </div>
      </div>
    </div>
     <Footer dark/>
    </>
  );
}
