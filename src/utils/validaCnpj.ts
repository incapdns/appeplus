

export default function validaCnpj(cnpj:any){
  
  let numeros = cnpj.split("-")[0].replace(/[.|\/]/g,"");
  
  let digitos = cnpj.split("-")[1];
  
  if(getPrimeiroDigito(numeros) != digitos[0] && getSegundoDigito(numeros+""+digitos[0]) !== digitos[1]){
    return false
  }else{
    return true
  }
        
}

function getPrimeiroDigito(numeros:any){
  let peso = 2
  let resultado = 0
  for (let i = numeros.length - 1; i>= 0 ; i-- ){
    resultado += numeros[i] * peso
    peso = (peso == 9 ? 2 : peso+1)
  }
  let modulo = resultado % 11;
  resultado = (modulo < 2 ? 0 : 11 - modulo)

  return resultado;
}
function getSegundoDigito(numeros:any){
  let peso = 2
  let resultado = 0
  
  for(let i = numeros.length - 1; i>= 0 ; i--  ){
    resultado += numeros[1] * peso
    peso = (peso == 9 ? 2 : peso +1)
  }
  let modulo = resultado % 11;
  resultado = (modulo < 2 ? 0 : 11 - modulo )
  
  return resultado
  
}




