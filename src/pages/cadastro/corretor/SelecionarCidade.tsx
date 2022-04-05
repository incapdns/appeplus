import makeAnimated from "react-select/animated";
import customTheme from "../../../themes/ReactSelect";
import Select from "react-select";
import { useEffect, useState } from "react";
import { iDataSelect } from "../../../@types";
import api from "../../../services/api";
import { Cidade } from "./SelecionarCidades";

export interface ISelecionarCidade {
    Key: number;
    City: Cidade;
    OnChangeCity: (city: iDataSelect) => void;
    OnChangeDistricts: (districts: iDataSelect[]) => void;
    OnDelete: () => void;
}

export default function SelecionarCidade(data: ISelecionarCidade): JSX.Element {
    const { OnChangeCity, OnChangeDistricts, OnDelete, Key, City } = data;

    const [carregandoCidades, setCarregandoCidades] = useState(false);

    const [cidades, setCidades] = useState<iDataSelect[]>([]);
    
    const [bairros, setBairros] = useState<iDataSelect[]>([]);

    async function ObterBairros(city: any) {
        await api
            .get(`bairro/buscar/autoComplete/${city.value}`)
            .then((response) => {
                setBairros(response.data.data);
            })
            .catch((error) => {
                console.log("Ocorreu um erro");
            });
    }

    const animatedComponents = makeAnimated();

    function ObterCidades() {
        setCarregandoCidades(true)

        api
            .get("cidade/buscar/autoComplete")
            .then((response) => {
                setCidades(response.data.data);
                setCarregandoCidades(false);
            })
            .catch((error) => {
                console.log("Ocorreu um erro");
            });
    }

    function obterCidadePadrao(){
        let result = cidades.filter(city => city.value == City.value)

        if(!result.length) return

        return result[0]
        
    }

    function obterBairrosPadrao(){
        if(!City) return;

        return bairros.filter(district => 
            City.districts.find(item => item.value == district.value)
        );
    }

    useEffect(() => {
        ObterCidades()
    }, [])

    useEffect(() => {
        if(City)
            ObterBairros(City)
    }, [City])

    return <div className="card mb-3" style={{ maxWidth: 720 }}>
        {Key > 0 &&
            <button onClick={OnDelete} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>}

        <div className="card-body">
            <div className="mb-3">
                <label
                    htmlFor="inputCidade"
                    className="form-label label-nome"
                >
                    Informe a cidade que deseja atuar<span>*</span>
                </label>

                <Select
                    options={cidades}
                    value={obterCidadePadrao()}
                    components={animatedComponents}
                    placeholder="Escolha uma cidade"
                    noOptionsMessage={() =>
                        "Nenhuma cidade encontrada"
                    }
                    theme={customTheme}
                    isLoading={carregandoCidades}
                    onChange={(value: any) => {
                        OnChangeCity(value)

                        ObterBairros(value)
                    }}
                />
            </div>

            <div className="mb-3">
                <p>
                    Quais regiões ou bairros prioritários de atuação?
                    <span>*</span>
                </p>

                <Select
                    classNamePrefix="select-multi"
                    options={bairros}
                    value={obterBairrosPadrao()}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    placeholder="Escolha um ou mais bairros de atuação"
                    noOptionsMessage={() =>
                        "Nenhum bairro encontrado"
                    }
                    theme={customTheme}
                    onChange={(values: any) => {
                        OnChangeDistricts(values)
                    }}
                />
            </div>
        </div>
    </div>;
}