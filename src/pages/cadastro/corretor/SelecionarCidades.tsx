import { useEffect, useState } from "react";
import { iDataSelect } from "../../../@types";
import SelecionarCidade from "./SelecionarCidade";

export interface Cidade extends iDataSelect {
    districts: iDataSelect[]
}

interface ListaCidade {
    [key: string]: Cidade;
}

interface ISelecionarCidades {
    Max: number;
    InitCities: Cidade[];
    OnChange: (cities: Cidade[]) => void;
}

export default function SelecionarCidades(props: ISelecionarCidades): JSX.Element {
    const { Max, InitCities, OnChange } = props

    const [cidades, setCidades] = useState<ListaCidade>({})

    function EmitirMudancas(){
        OnChange(
            Object.keys(cidades).map(key => {
                return cidades[key];
            })
        )
    }

    function AdicionarNovaCidade(ret = false, obj = cidades): string | null {
        let unique = new Date().getTime() + Object.keys(obj).length

        let result = !ret ? Object.assign({}, obj) : obj

        let key = 'city-' + unique

        result[key] = {value: 0, label: "", districts: []}

        if(ret)
            return key;

        setCidades(result)

        return null;
    }

    function MudarCidade(key: string, city: iDataSelect){
        let result = Object.assign({}, cidades)

        result[key].value = city.value
        
        result[key].label = city.label

        setCidades(result)
    }
    
    function MudarBairros(key: string, districts: iDataSelect[]){
        let result: ListaCidade = Object.assign({}, cidades)

        let city = cidades[key]

        city.districts = districts

        result[key] = city

        setCidades(result)
    }

    function DeletarCidade(key: string){
        let result = Object.assign({}, cidades)

        delete result[key]

        setCidades(result)
    }

    function AdicionarCidade(city: Cidade, context: ListaCidade) {
        const key = AdicionarNovaCidade(true, context) as string

        context[key].label = city.label

        context[key].value = city.value

        context[key].districts = city.districts

        return context
    }

    useEffect(() => {
        if(!InitCities.length || cidades.length) {           
            if(!cidades.length)
                AdicionarNovaCidade();

            return;
        }

        let context: ListaCidade = {}

        InitCities.forEach(city => {
            AdicionarCidade(city, context)
        })

        setCidades(context)
    }, [InitCities]) 

    useEffect(() => {
        EmitirMudancas()
    }, [cidades])

    return (
        <>
            {Object.keys(cidades).map((key, idx) =>
                <SelecionarCidade 
                    Key={idx} //prop do SelectCity
                    City={cidades[key]}
                    OnChangeCity={city => MudarCidade(key, city)} 
                    OnChangeDistricts={districts => MudarBairros(key, districts)} 
                    OnDelete={() => DeletarCidade(key)}
                    key={key} //identificador do React
                ></SelecionarCidade>
            )}

            {Object.keys(cidades).length < Max && (
                <button type="button" className="btn btn-primary mb-4"
                onClick={() => AdicionarNovaCidade()}>
                    Adicionar mais cidade
                </button>
            )}
        </>
    );
}