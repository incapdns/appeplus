import { useEffect, useState } from "react";
import {
  MdSearch,
  MdSingleBed,
  MdApartment,
  MdAttachMoney,
  MdPhotoSizeSelectSmall
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { iDataSelect, iTipos } from "../@types";
import api from "../services/api";
import Select, { components } from 'react-select';
import customTheme from "../themes/ReactSelect";
import {
  dataEspaco,
  dataQuartos,
  dataValores
} from '../data/ReactSelect';

import '../styles/components/searchbox.scss';
interface iSearchbox {
  paraMorar: boolean;
  setParaMorar: (value: boolean) => void;
  colorButton?: boolean;
  setColorButton?:(value: boolean) => void
}

export default function SearchBox(props: iSearchbox) {
  const history = useHistory();

  const [loadingTipos, setLoadingTipos] = useState(false);
  const [tipos, setTipos] = useState<iTipos[]>([])
  const [tipoSelecionado, setTipoSelecionado] = useState('');

  const [loadingCidades, setLoadingCidades] = useState(false);
  const [cidades, setCidades] = useState<iDataSelect[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState({} as iDataSelect);
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');

  const [loadingBairros, setLoadingBairros] = useState(false);
  const [bairros, setBairros] = useState<iDataSelect[]>([]);
  const [bairroSelecionado, setBairroSelecionado] = useState({} as iDataSelect);

  const [valor, setValor] = useState({} as iDataSelect);
  const [quartos, setQuartos] = useState({} as iDataSelect);
  const [espaco, setEspaco] = useState({} as iDataSelect);

  let [finalidade, setFinalidade] = useState(1);

  const styleSelect = {
    control: (base: any) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none"
    })
  };

  useEffect(() => {
    GetTiposFinalidade();
    GetCidades();
  }, [props.paraMorar]);

  async function GetCidades() {
    setLoadingCidades(true);
    await api.get('cidade/buscar/autoComplete')
      .then(response => {
        setCidades(response.data.data);
        setLoadingCidades(false);
      })
      .catch(error => {
        console.log("Ocorreu um erro");
        setLoadingCidades(false);
      })
  }

  async function GetBairros(cidade: any) {
    setLoadingBairros(true);

    await api.get(`bairro/buscar/autoComplete/${cidade.value}`)
      .then(response => {
        setBairros(response.data.data);
        setLoadingBairros(false);
      })
      .catch(error => {
        console.log("Ocorreu um erro");
        setLoadingBairros(false);
      })
  }

  async function GetTiposFinalidade() {
    setLoadingTipos(true);
    finalidade = (props.paraMorar ? 1 : 2);
    await api
      .get(
        `Finalidade-Tipo-Imovel/buscar/autoComplete?codFinalidade=${finalidade}`
      )
      .then((response) => {
        setTipos(response.data.data);
        setLoadingTipos(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingTipos(false);
      });
  }

  // async function GetTipos() {
  //   setLoadingTipos(true);
  //   await api.get('imovel/tipos')
  //     .then(response => {
  //       console.log(response.data.data)
  //       let tiposImoveis:any = response.data.data
  //       if(props.paraMorar){
  //         const filter:any = tiposImoveis.filter((tipo:any) =>{
  //           const value = Number(tipo.value)
  //             return (
  //               value === 2 ||
  //               value === 9 || 
  //               value === 1 ||
  //               value === 7 ||
  //               value === 3 ||
  //               value === 5 ||
  //               value === 21 ||
  //               value === 22 ||
  //               value === 23 ||
  //               value === 24
  //             )
  //           })
  //         setTipos(filter)
  //       }else{
  //         const filter = tiposImoveis.filter((tipo:any) =>{
  //           const value = Number(tipo.value)
  //             return (
  //               value === 8 || 
  //               value === 10 ||
  //               value === 11 ||
  //               value === 12 ||
  //               value === 13 ||
  //               value === 14 ||
  //               value === 15 ||
  //               value === 16 ||
  //               value === 17 ||
  //               value === 18 ||
  //               value === 19 ||
  //               value === 20 ||
  //               value === 22 ||
  //               value === 24 
  //             )
  //           })
  //         setTipos(filter)
  //       }
  //       setLoadingTipos(false);
  //     })
  //     .catch(error => {
  //       console.log("Ocorreu um erro");
  //       setLoadingTipos(false);
  //     })
  // }

  function PesquisarImovel() {
    finalidade = (props.paraMorar ? 1 : 2);    
    const params: any = {valor: valor?.value, finalidade, tipo: tipoSelecionado, cidade: cidadeSelecionada?.label, bairro: bairroSelecionado?.label};

    Object.keys(params).forEach(key => {
      if(!params[key])
        delete params[key]
    })

    let u = new URLSearchParams(params).toString();

    console.log({params, u, valor})

    history.push({
      pathname: '/imoveis',
      search: u,
      state: { detail: 'response.data' }
    });
  }

  return (
    <div className="container" id="searchBox">

      <div className="searchBox">

        <div className="buttons row">
          {props.colorButton ? (
            <>
              <button
              className={`btn ${props.paraMorar ? 'btn-black' : 'btn-light'} col`}
              onClick={() => props.setParaMorar(true)}
              >
              Para morar
              </button>
              <button
              className={`btn ${!props.paraMorar ? 'btn-black' : 'btn-light'} col`}
              onClick={() => props.setParaMorar(false)}
              >
              Para trabalhar
              </button>
            </>
            
          ) :(
            <>
              <button
              className={`btn ${props.paraMorar ? 'btn-primary' : 'btn-light'} col`}
              onClick={() => props.setParaMorar(true)}
              >
              Para morar
              </button>
              <button
              className={`btn ${!props.paraMorar ? 'btn-primary' : 'btn-light'} col`}
              onClick={() => props.setParaMorar(false)}
              >
              Para trabalhar
              </button>
            </>
            
          )
          }
         
        </div>

        <div className="body">
          <div className="row">

            <div className="col-lg-9">
              <div className="mb-3">
                <Select
                  classNamePrefix="form-control"
                  options={cidades}
                  placeholder="Busque por cidade"
                  noOptionsMessage={() => "Nenhuma cidade encontrada"}
                  theme={customTheme}
                  styles={styleSelect}
                  isLoading={loadingCidades}
                  onChange={(value: any) => {
                    setCidadeSelecionada(value);
                    GetBairros(value);
                  }}
                />
              </div>
            </div>

            <div className="col-lg-3">
              <div className="mb-3 d-grid">
                {props.colorButton ? (
                  <button type="button" className="btn btn-black" onClick={PesquisarImovel}>Encontrar Imóveis <MdSearch /></button>
                ):(
                  <button type="button" className="btn btn-primary" onClick={PesquisarImovel}>Encontrar Imóveis <MdSearch /></button>
                )}
                
              </div>
            </div>

          </div>
          <div className="row">

            <div className="col-lg-3">
              <div className="mb-3 mb-lg-0">
                <Select
                  classNamePrefix="form-control"
                  options={bairros}
                  placeholder="Busque por bairro"
                  noOptionsMessage={() => "Nenhum bairro encontrado"}
                  theme={customTheme}
                  styles={styleSelect}
                  isLoading={loadingBairros}
                  onChange={(value: any) => { setBairroSelecionado(value) }}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mb-3 mb-lg-0">

                <Select
                  id="teste"
                  inputId="teste"
                  classNamePrefix="form-select"
                  options={dataValores}
                  placeholder="Escolha o valor"
                  noOptionsMessage={() => "Sem dados"}
                  components={{
                    Control: ({ children, ...rest }) => (
                      <components.Control {...rest}>
                        <MdAttachMoney size={24} /> {children}
                      </components.Control>
                    )
                  }}
                  theme={customTheme}
                  styles={styleSelect}
                  onChange={(value: any) => {
                    setValor(value)
                  }}
                />

              </div>

            </div>
            <div className="col-lg-3">
              <div className="mb-3 mb-lg-0">
                <Select
                  classNamePrefix="form-select"
                  options={tipos}
                  placeholder="Tipo do imóvel"
                  noOptionsMessage={() => "Sem dados"}
                  theme={customTheme}
                  styles={styleSelect}
                  isLoading={loadingTipos}
                  components={{
                    Control: ({ children, ...rest }) => (
                      <components.Control {...rest}>
                        <MdApartment size={24} /> {children}
                      </components.Control>
                    )
                  }}
                  onChange={(value: any) => setTipoSelecionado(value.value)}
                />
              </div>

            </div>
            <div className="col-lg-3">
              <div className="mb-lg-0">
                {props.paraMorar
                  ? (
                    <Select
                      classNamePrefix="form-select"
                      options={dataQuartos}
                      placeholder="Nº de quartos"
                      noOptionsMessage={() => "Sem dados"}
                      theme={customTheme}
                      styles={styleSelect}
                      components={{
                        Control: ({ children, ...rest }) => (
                          <components.Control {...rest}>
                            <MdSingleBed size={24} /> {children}
                          </components.Control>
                        )
                      }}
                      onChange={(value: any) => setQuartos(value.value)}
                    />
                  )
                  : (
                    <Select
                      classNamePrefix="form-select"
                      options={dataEspaco}
                      placeholder="Espaço em m²"
                      noOptionsMessage={() => "Sem dados"}
                      theme={customTheme}
                      styles={styleSelect}
                      components={{
                        Control: ({ children, ...rest }) => (
                          <components.Control {...rest}>
                            <MdPhotoSizeSelectSmall size={24} /> {children}
                          </components.Control>
                        )
                      }}
                      onChange={(value: any) => setEspaco(value.value)}
                    />
                  )}

              </div>

            </div>

          </div>


        </div>
      </div>

    </div >
  );
}