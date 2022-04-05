export function DataAtual() {
  // dataAtual
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = data
    .getHours()
    .toLocaleString("pt-BR", { minimumIntegerDigits: 2 });
  const minutos = data
    .getMinutes()
    .toLocaleString("pt-BR", { minimumIntegerDigits: 2 });
  const dataAtual: String =
    dia + "/" + mes + "/" + ano + " às " + hora + ":" + minutos + "h";

  return dataAtual;
}
