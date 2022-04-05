export interface iDadosUsuario {
  token: string;
  codUsuario: number;
  codCliente: number;
  codCorretor: number;
  nomeCompleto: string;
  telefone: string;
  email: string;
  tipo: number;
  nomeSocial: string;
  codStatus: number;
  nivel:number;
  cPFCNPJ: string;
}

export interface iCaracteristica {
  codImovel: number;
  codCaracteristicaImovel: number;
  codCaracteristica: number;
  descCaracteristicas: string;
  destaque: boolean;
  icone: string;
}

export interface iItem {
  codImovel: number;
  codItemImovel: number;
  codItem: number;
  descItem: string;
  destaque: boolean;
  icone: string;
}

export interface iImovel {
  codImovel: number;
  codClienteVendedor: number;
  codCorretorVendedor: number;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  latitude: string;
  longitude: string;
  codStatus: number;
  codTipoImovel: number;
  codFinalidade: number;
  codStatusAnuncio: number;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeBanheiros: number;
  qtdeVagasGaragem: number;
  areaTotal: number;
  areaPrivativa: number;
  valorVendaOriginal: number;
  valorVenda: number;
  descCompletaPredio: string;
  descComplementar: string;
  valorIptu: number;
  valorCondominio: number;
  descTipoImovel: string;
  qtdeVisualizacoes: number;
  favoritoUsuarioLogado?: boolean;
  descCaracteristica: [any];
  descItem: [string];
  imgsDoImovel: [string];
  caracteristicasDestaque: [iCaracteristica];
  itemsDestaque: [iItem];
  conjuntoCaracteristicas: [iConjuntoCaracteristica];
  conjuntoItens: [iConjuntoItens];
  estabelecimentosImovel: Array<{
    codEstabelecimentoImovel: number;
    descEstabelecimentoImovel: string;
    qtdEstabelecimentos: number;
  }>;
  bairrosProximos: Array<{
    value: number;
    label: string;
  }>;
}

export interface iConjuntoCaracteristica {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  caracteristicas: iDataSelect[];
}


export interface iConjuntoItens {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  itens: iDataSelect[];
}

export interface iFinanciamento {
  banco: string;
  valorTotal: number;
  valorParaFinanciar: number;
  totalParcelasMeses: number;
  jurosPercentualAoAno: number;
  custoEfetivoTotalAoAno: number;
  custoEfetivoTotalAoMes: number;
  primeiraParcela: number;
  ultimaParcela: number;
  observacao: string;
  qtdeParcelasMes: number;
  valorDesejado: number;
  rendaMensal: number;
  url: string;
}

export interface iImoveisSimilares {
  codImovel: number;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeBanheiros: number;
  qtdeVagasGaragem: number;
  areaTotal: number;
  valorVendaOriginal: number;
  valorVenda: number;
  descImovel: string;
  descTipoImovel: string;
  imgsDoImovel: [string];
  itens: [number];
}

export interface iCorretor {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  numeroCreci: string;
  dtCadastro?: string;
  pontuacaoAtual?: number;
  mediaAvaliacao: number;
  qtdCompra: number;
  qtdVenda: number;
  imoveisNoAppePlus: number;
  nomeSocial: string;
  img: [string];
}

export interface iDiasDisponiveis {
  diaDisponivel: string;
  horariosDisponiveis: [string];
}

export interface iImoveis {
  codImovel?: number;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  qtdeDormitorios?: number;
  qtdeSuites?: number;
  qtdeBanheiros?: number;
  qtdeVagasGaragem?: number;
  areaTotal?: number;
  valorVendaOriginal?: number;
  valorVenda?: number;
  descImovel?: string;
  descTipoImovel?: string;
  codStatusAnuncio?: number;
  itens?: [number];
  imgsDoImovel?: [string];
}

export interface iImoveisPesquisados {
  areaTotal: number;
  bairro: string;
  cidade: string;
  codAgenda?: number;
  codCliente?: number;
  codCorretor?: number;
  codImovel: number;
  dtVisita?: string;
  nomeCliente?: string;
  nomeCorretor?: string;
  qtdeDormitorios?: number;
  urlArquivos?: [any];
  valorVenda: number;
  imovel: {
    codImovel: number;
    codClienteVendedor: number;
    codCorretorVendedor: number;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    latitude: string;
    longitude: string;
    codStatus: number;
    codTipoImovel: number;
    codStatusAnuncio: number;
    qtdeDormitorios: number;
    qtdeSuites: number;
    qtdeBanheiros: number;
    qtdeVagasGaragem: number;
    areaTotal: number;
    areaPrivativa: number;
    valorVendaOriginal: number;
    valorVenda: number;
    descCompletaPredio: string;
    descComplementar: string;
    valorIptu: number;
    valorCondominio: number;
    descTipoImovel: string;
    qtdeVisualizacoes: number;
    favoritoUsuarioLogado?: boolean;
    descCaracteristica: [any];
    descItem: [string];
    imgsDoImovel: [string];
  };
}
export interface iCardImoveisPesquisados {
  areaTotal: number;
  bairro: string;
  cidade: string;
  codAgenda?: number;
  codCliente?: number;
  codCorretor?: number;
  codImovel: number;
  dtVisita?: string;
  nomeCliente?: string;
  nomeCorretor?: string;
  qtdeDormitorios?: number;
  urlArquivos?: [any];
  valorVenda: number;
  endereco?: string;
  uf?: string;
  qtdeSuites?: number;
  qtdeBanheiros?: number;
  qtdeVagasGaragem?: number;
  valorVendaOriginal?: number;
  descImovel?: string;
  descTipoImovel?: string;
  imgsDoImovel?: [string];
}

export interface iCorretores {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  numeroCreci: string;
  dtCadastro: string;
  pontuacaoAtual: number;
  mediaAvaliacao: number;
  imgCorretor?: string;
  nomeSocial: string;
  img?: string;
  qtdCompra?: number;
  qtdVenda?: number;
  imoveisNoAppePlus?: number;
}

export interface iBuscaImoveis extends iImoveis {
  listarTopCorretoresQueryResult: iCorretores;
  tipoCard: number;
  codStatusAnuncio: number;
}
export interface iTipos {
  value: number;
  label: string;
}

export interface iDataSelect {
  value?: number;
  label?: string;
}

export interface iNavbar {
  dark?: boolean;
  type?: "dark" | "light" | "search";
}

export enum tipoUsuario {
  admin = 1,
  cliente = 2,
  corretor = 3,
}

export enum statusCorretor {
  ativo = 1,
  inativo = 2,
  pendenteAprovação = 3,
  reprovado = 4,
  cadastroIncompleto = 5,
}

export interface iCorretorCompra {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  dtNascimento: string;
  numeroCreci: string;
  rg: string;
  cpfcnpj: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomeSocial: string;
  cep: string;
  codOrigemCadastro: string;
  codCorretorIndicacao: string;
  tokenCadastro: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: number;
  motivoExclusao: string;
  pontuacaoAtual: number;
  mediaAvaliacao: number;
  img: [string];
  codCorretorCompra: number;
  codCorretorVenda: number;
  descStatusImovel: string;
  codImovel: number;
  fotoCapaImovel: string;
}
export interface iCorretorVenda {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  dtNascimento: string;
  numeroCreci: string;
  rg: string;
  cpfcnpj: string;
  telefone: string;
  endereco: string;
  email:string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomeSocial: string;
  cep: string;
  codOrigemCadastro: string;
  codCorretorIndicacao: string;
  tokenCadastro: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: number;
  motivoExclusao: string;
  pontuacaoAtual: number;
  mediaAvaliacao: number;
  img: [string];
  codCorretorCompra: number;
  codCorretorVenda: number;
  descStatusImovel: string;
  codImovel: number;
  fotoCapaImovel: string;
  arquivos: [
    string
  ]
}
export interface iImovelCorretor {
  codImovel: number;
  codClienteVendedor: number;
  codCorretorVendedor: number;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  latitude: number;
  longitude: number;
  qtdeVisualizacoes: number;
  codStatus: number;
  codTipoImovel: number;
  valorVendaOriginal: number;
  valorVenda: number;
  dtVenda: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: number;
  motivoExclusao: string;
  codMotivoExclusao: number;
  codStatusAnuncio: number;
  descStatus: string;
  fotoCapaImovel: string;
  codcorretorCompra: number;
}

export interface iImoveisCorretor {
  corretorCompra: iCorretorCompra;
  corretorVenda: iCorretorVenda;
  imovel: iImovelCorretor;
}
export interface iPropostas {
  bairro: string;
  cep: string;
  cidade: string;
  codAditivo: number;
  codClienteVendedor: number;
  codCorretorCompra: number;
  codCorretorVendedor: number;
  codHistoricoProspeccao: number;
  codImovel: number;
  codImovelProspeccao: number;
  codMotivoCancelamento: number;
  codMotivoExclusao: number;
  codProposta: number;
  codPropostaPai: number;
  codProspeccao: number;
  codStatus: number;
  codStatusAnuncio: number;
  codStatusProposta: number;
  codTermmometroProposta: number;
  codTipoImovel: number;
  codTipoProspeccao: number;
  complemento: string;
  corretorCompra: iCorretorCompra;
  corretorVenda: iCorretorVenda;
  descHistoricoProspeccao: string;
  descStatusProposta: string;
  dtAceite: string;
  dtAtualizacao: string;
  dtCadastro: string;
  dtCadastroHistoricoProspeccao: string;
  dtCancelamento: string;
  dtConclusao: string;
  dtExclusao: string;
  dtRecusa: string;
  dtValidade: string;
  dtVenda: string;
  endereco: string;
  fotoCapaImovel: string;
  latitude: string;
  longitude: string;
  motivoCancelamento: string;
  motivoExclusao: string;
  motivoRecusa: string;
  numProposta: 1;
  numero: string;
  obsCondicoesPagamento: string;
  observacoes: string;
  qtdeVisualizacoes: number;
  uf: string;
  userAceite: number;
  userAtualizacao: number;
  userCadastro: number;
  userCadastroHistoricoProspeccao: number;
  userCancelamento: number;
  userConclusao: number;
  userExclusao: number;
  userRecusa: number;
  valor: number;
  valorVenda: number;
  valorVendaOriginal: number;
}
export enum EStatusProspeccao {
  Aberta = "Aberta",
  Cancelado = "Cancelado",
  Concluido = "Concluido",
}

export enum EStatusProposta {
  Aberta = "Aberta",
  Cancelada = "Cancelada",
  Concluida = "Concluida",
  Aceita = "Aceita",
  Recusada = "Recusada",
  Renegociada = "Renegociada",
}

export interface iBancos {
  codBanco: number;
  descBanco: string;
  numBanco: number;
  extensaoArquivo: string;
}

export interface iClienteProposta {
  arquivosCliente: [string];
  codCliente: number;
  codEstadoCivil: number;
  cpfcnpj: null;
  dtNascimento: string;
  email: string;
  genero: number;
  nomeCompleto: string;
  rg: null;
  telefone: string;
  tipoCliente: null;
}
export interface iCorretorProposta {
  bairro: string;
  cep: string;
  cidade: string;
  codCorretor: number;
  codCorretorCompra: number;
  codCorretorIndicacao: string;
  codCorretorVenda: number;
  codImovel: number;
  codOrigemCadastro: string;
  codUsuario: number;
  complemento: string;
  cpfcnpj: string;
  descStatusImovel: null;
  dtAtualizacao: string;
  dtCadastro: string;
  dtExclusao: null;
  dtNascimento: string;
  endereco: string;
  fotoCapaImovel: string;
  img: [string];
  mediaAvaliacao: number;
  motivoExclusao: null;
  nomeCompleto: string;
  nomeSocial: string;
  numero: string;
  numeroCreci: string;
  pontuacaoAtual: number;
  rg: string;
  telefone: string;
  tokenCadastro: string;
  uf: string;
  userAtualizacao: number;
  userCadastro: number;
  userExclusao: null;
  email:string;
}
export interface iImovelProposta {
  areaPrivativa: 0;
  areaTotal: 160;
  bairro: string;
  bairrosProximos: Array<{
    value: number;
    label: string;
  }>;
  caracteristicas: null;
  cep: string;
  cidade: string;
  codCaracteristica: number;
  codClienteVendedor: number;
  codCorretorVendedor: number;
  codImovel: number;
  codItem: null;
  codStatus: number;
  codStatusAnuncio: number;
  codTipoImovel: number;
  complemento: string;
  descCaracteristica: [null, null, null];
  descComplementar: string;
  descCompletaImovel: string;
  descCompletaPredio: string;
  descExibicao: [];
  descItem: [string];
  descStatus: string;
  descTipoImovel: string;
  endereco: string;
  estabelecimentosImovel: Array<{
    codEstabelecimentoImovel: number;
    descEstabelecimentoImovel: string;
    qtdEstabelecimentos: number;
  }>;
  imgsDoImovel: [string];
  items: null;
  latitude: string;
  longitude: string;
  numero: string;
  qtdeBanheiros: number;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeVagasGaragem: number;
  qtdeVisualizacoes: number;
  uf: string;
  valorCondominio: number;
  valorIptu: number;
  valorVenda: number;
  valorVendaOriginal: number;
}
export interface iPropostaCriar {
  cliente: iClienteProposta;
  codImovelProspeccao: number;
  imovel: iImovelProposta;
  corretor: iCorretorProposta;
}

// teste

export interface iCompradorProposta {
  arquivosCliente: [];
  codCliente: number;
  codEstadoCivil: number;
  cpfcnpj: number;
  dtNascimento: string;
  email: string;
  genero: number;
  nomeCompleto: string;
  rg: string;
  telefone: string;
  tipoCliente: null;
}

export interface iImovelPropostaRecuperar {
  areaPrivativa: number;
  areaTotal: number;
  bairro: string;
  bairrosProximos: [string];
  caracteristicas: null;
  cep: string;
  cidade: string;
  codCaracteristica: null;
  codClienteVendedor: number;
  codCorretorVendedor: number;
  codImovel: number;
  codItem: null;
  codStatus: number;
  codStatusAnuncio: number;
  codTipoImovel: number;
  complemento: string;
  descCaracteristica: [string];
  descComplementar: string;
  descCompletaImovel: null;
  descCompletaPredio: null;
  descExibicao: [string];
  descItem: [string];
  descStatus: string;
  descTipoImovel: string;
  endereco: string;
  estabelecimentosImovel: [string];
  imgsDoImovel: [string];
  items: null;
  latitude: string;
  longitude: string;
  numero: string;
  qtdeBanheiros: number;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeVagasGaragem: number;
  qtdeVisualizacoes: number;
  uf: string;
  valorCondominio: number;
  valorIptu: number;
  valorVenda: number;
  valorVendaOriginal: number;
}
export interface iVendedorProposta {
  arquivosCliente: [string];
  codCliente: number;
  codEstadoCivil: number;
  cpfcnpj: null;
  dtNascimento: string;
  email: string;
  genero: number;
  nomeCompleto: string;
  rg: null;
  telefone: string;
  tipoCliente: null;
}

export interface iPropostaRecuperar {
  codAditivo: number;
  codImovel: number;
  codImovelProspeccao: number;
  codMotivoCancelamento: number;
  codProposta: number;
  codPropostaPai: number;
  codProspeccao: number;
  codStatusProposta: number;
  codTermmometroProposta: number;
  comprador: iCompradorProposta;
  desTipoImovel: null;
  descStatusProposta: null;
  descTipoImovel: null;
  dtAceite: string;
  dtAtualizacao: string;
  dtCadastro: string;
  dtCancelamento: string;
  dtConclusao: string;
  dtRecusa: string;
  dtValidade: string;
  endereco: null;
  imovel: iImovelPropostaRecuperar;
  motivoCancelamento: string;
  motivoRecusa: string;
  numProposta: number;
  obsCondicoesPagamento: string;
  observacoes: string;
  userAceite: number;
  userAtualizacao: number;
  userCadastro: number;
  userCancelamento: number;
  userConclusao: number;
  userRecusa: number;
  valor: number;
  vendedor: iVendedorProposta;
}
