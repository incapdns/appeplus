import { v4 as uuidv4 } from "uuid";

const minValue = (at: number | string) => {
    let index = parseInt(String(at))

    let range = [0, 0, 150000, 350000, 450000, 650000, 1000000]

    return range[index] || 0
}

const maxValue = (at: number | string) => {
    let index = parseInt(String(at))

    let max = 1000000000

    let range = [max, max, 250000, 450000, 650000, 1000000, max]

    return range[index] || 0
}

type UpdateCb = (at: string) => void

class FiltroCore {
    /*START: Parameters to filter*/
    private rangePrice: number[] = [0, 1000000000];
    private rangeArea: number[] = [1, 30000000];
    private city?: string;
    private district?: string;
    private qtyDorms?: number;
    private qtyToilets?: number;
    private qtyParking?: number;
    private qtySuits?: number;

    public value?: number;
    public type?: number;
    public features: number[] = []
    public itens: number[] = []
    public qtyPerPage: number = 10;
    /*END: Parameters to filter*/

    //Need reload the component?
    public needReload: boolean = false;

    //Type of sort
    public sort: number = 0;

    //Callback to reflect the changes
    private update!: UpdateCb;

    constructor(update: UpdateCb){
        this.update = update

        this.scope()
    }

    //Apply scope
    private scope(){
        this.applyPrice = this.applyPrice.bind(this)
    }

    //Set the type of immobile
    public setType(type: number){
        this.type = type

        this.reflect(false)
    }
    
    //Set itens of immobile
    public setItens(itens: number[]){
        this.itens = itens
    }

    //Set feature of immobile
    public setFeatures(features: number[]){
        this.features = features
    }

    //Set the city name
    public setCity(city: string){
        this.city = city
    }

    //Set the district name
    public setDistrict(district: string){
        this.district = district
    }

    //Set the quantity of dormitories
    public setQtyDorms(qty: number){
        this.qtyDorms = qty
    }

    //Set the quantity of toilet
    public setQtyToilets(qty: number){
        this.qtyToilets = qty
    }

    //Set the quantity of parking spaces
    public setQtyParking(qty: number){
        this.qtyParking = qty
    }

    //Set the quantiy of suits
    public setQtySuits(qty: number){
        this.qtySuits = qty
    }

    //Apply price range
    public applyPrice(range: number[]){
        this.rangePrice = range
    }

    //Apply area range
    public applyArea(range: number[]){
        this.rangeArea = range
    }

    //Parse input from "valor" filter
    public parse(filter: number | string){
        let range = [minValue(filter), maxValue(filter)]

        this.value = parseInt(String(filter))
        
        this.applyPrice(range)

        this.reflect(false)
    }

    get query(){
        return {
            codTipoImovel: this.type ? [this.type] : null,
            bairro: this.district,
            cidade: this.city,
            valorVendaMin: this.rangePrice[0],
            valorVendaMax: this.rangePrice[1],
            qtdeDormitorios: this.qtyDorms,
            qtdeBanheiros: this.qtyToilets,
            qtdeVagasGaragem: this.qtyParking,
            qtdeSuites: this.qtySuits,
            areaTotalMin: this.rangeArea[0],
            areaTotalMax: this.rangeArea[1],
            caracteristicas: this.features,
            itens: this.itens,
            tipoOrdenacao: this.sort
        };
    }

    //Reflect the changes to component
    public reflect(reload = true){
        this.needReload = reload

        this.update(uuidv4())
    }
}

export default FiltroCore;

export { FiltroCore }