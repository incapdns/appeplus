import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/pages/termosCondicoesUso.scss'
import { AiOutlineFacebook, AiOutlineLinkedin, AiFillTwitterSquare, AiOutlineInstagram } from "react-icons/ai";

export default function TermosCondicoesUso() {
    return (
        <>
            <Navbar />
            <div className="termos-condicoes">
                <div className="container">
                    <div className="col-12 central-body">
                        <div className="central-artigo">
                            <h3 className="artigo-title">TERMOS E CONDIÇÕES DE USO</h3>
                            <div className="mb-4">
                                <a href='https://www.facebook.com/appepluscom' aria-label='facebook'><AiOutlineFacebook size={28} color="#4BB7F1" style={{ marginRight: 20 }} /></a>
                                <a href='https://www.instagram.com/appeplus/' aria-label='instagram'><AiOutlineInstagram size={28} color="#4BB7F1" style={{ marginRight: 20 }} /></a>
                                <a href='https://www.linkedin.com/company/appeplus' aria-label='linkedin'><AiOutlineLinkedin size={28} color="#4BB7F1" /></a>
                            </div>
                            <p style={{ textAlign: 'justify'}}>INFORMAÇÃO IMPORTANTE PARA TODOS OS USUÁRIOS: LEIA ATENTAMENTE O TERMOS E CONDIÇÕES DE USO (“TERMO”) ANTES DE COMEÇAR A USAR A PLATAFORMA APPÊ+, AQUI VAI ENCONTRAR INFORMAÇÕES IMPORTANTES SOBRE SEUS DIREITOS, RECURSOS E OBRIGAÇÕES.</p>
                            <p style={{ textAlign: 'justify'}}>A UTILIZAÇÃO DA PLATAFORMA APPÊ+REPRESENTA A CONCORDÂNCIA TÁCITA E INTEGRAL COM O PRESENTE TERMO.  </p>
                            <p style={{ textAlign: 'justify'}}>O USUÁRIO está ciente e concorda que ao prosseguir a partir deste ponto de acesso, com a utilização da PLATAFORMA APPÊ+, concordará, de forma expressa, irrevogável e irretratável, com todas as disposições constantes do presente Termo, declarando ter lido, compreendido e aceitado o mesmo em todos os seus termos e se obrigando a cumprir todas as disposições.</p>
                            <p className="topicos-principais">1.	OBJETO</p>
                            <p className="topicos-secundarios">1.1.	Este Termo tem o objetivo de: </p>
                            <p style={{ textAlign: 'justify', marginLeft: 50 }}> 1.1.1.	Regular o acesso aos serviços do APPÊ DIGITAL SERVIÇOS IMOBILIÁRIOS LTDA, inscrito no CNPJ/ME nº 44.105.436/001-10 e no CRECI/MG nº 0007263, sediado na Av. Olegário Maciel, 1217, 7º andar Bairro de Lourdes CEP: 30.180-111, no município de Belo Horizonte, Estado de Minas Gerais (“APPÊ+”), local onde ocorrem a administração, o estabelecimento e a prestação de serviços da APPÊ+. <br /><br />
                            1.1.2.	Estabelecer as características bem como responsabilidades de utilização e outras informações relacionadas à PLATAFORMA APPÊ+, bem como os direitos, restrições e demais condições aplicáveis ao USUÁRIO. 
                            </p>
                            <p className="topicos-principais">2.	DEFINIÇÕES </p>
                            <p className="topicos-secundarios">2.1.	Para efeitos deste Termo, exceto quando de outro modo aqui expresso, as palavras e expressões grafadas em letra maiúscula deverão ter os seguintes significados:</p>
                            <p style={{ textAlign: 'justify', marginLeft: 50 }}>
                            2.1.1.	ANÚNCIO: publicação de um IMÓVEL na PLATAFORMA APPÊ+ que esteja disponível para venda.<br /><br />

                            2.1.2.	AUTORIZAÇÃO DE VENDA: documento disponibilizado na PLATAFORMA APPÊ+ que autoriza o CORRETOR a representar o PROPRIETÁRIO na venda do IMÓVEL.<br /><br />

                            2.1.3.	COMPRADOR: pessoa que está buscando ou já está em negociação para comprar um imóvel através da PLATAFORMA APPÊ+.<br /><br />

                            2.1.4.	CORRETOR: pessoa credenciada pelo CRECI que presta o serviço de corretagem de imóveis.<br /><br />

                            2.1.5.	DILIGÊNCIA: análise de documentos relativos ao IMÓVEL e PROPRIETÁRIO, para verificar a situação do IMÓVEL e sua disponibilidade para venda.<br /><br />

                            2.1.6.	IMÓVEL: imóvel de propriedade do PROPRIETÁRIO que será objeto do ANÚNCIO.<br /><br />

                            2.1.7.	PROMESSA DE COMPRA E VENDA: documento que formaliza uma negociação.<br /><br />

                            2.1.8.	PROPRIETÁRIO/VENDEDOR: pessoa proprietária do IMÓVEL.<br /><br />

                            2.1.9.	SERVIÇOS: todos os serviços e produtos da APPÊ+, incluindo também a divulgação, intermediação, administração de imóveis ou venda através das plataformas.<br /><br />

                            2.1.10.	USUÁRIO: qualquer pessoa que acesse a PLATAFORMA APPÊ+.
                            </p>
                            <p className="topicos-principais">3.	A PLATAFORMA APPÊ+ </p>
                            <p className="topicos-secundarios">
                            3.1.	Para acessar a PLATAFORMA APPÊ+ o USUÁRIO deverá concluir um cadastro, conforme informações solicitadas pela PLATAFORMA APPÊ+.<br /><br />

                            3.2.	A PLATAFORMA APPÊ+ permite que o USUÁRIO, após o cadastro, inclua um ANÚNCIO, que poderá ser nas seguintes modalidades: <br /><br />

                                
                            SIMPLES: é a primeira etapa, nela o USUÁRIO deve indicar tipo e localização do IMÓVEL, assim como, informações do IMÓVEL e imagens do mesmo. O ANÚNCO SIMPLES é exibido na PLATAFORMA APPÊ+, porém o USUÁRIO não recebe interações de outros USUÁRIOS.
                            <br /><br />

                            AZUL:  após a escolha do CORRETOR e aceite do termo de AUTORIZAÇÃO DE VENDA, o ANÚNCIO SIMPLES é convertido em ANÚNCIO AZUL, oportunidade em que este passará a receber interações de outros USUÁRIOS. <br /><br />

                            LARANJA: após o preenchimento de detalhes do IMÓVEL, conforme solicitado pela PLATAFORMA APPÊ+, o ANÚNCIO AZUL é convertido em ANÚNCIO LARANJA, aumentando a exposição do mesmo na PLATAFORMA APPÊ+.<br /><br />

                            PLUS: após o preenchimento de uma pesquisa disponibilizada na PLATAFORMA APPÊ+, o ANÚNCIO LARANJA é convertido em ANÚNCIO PLUS, aumentando novamente a exposição do mesmo na PLATAFORMA APPÊ+.<br /><br />

                            3.3.	Para inclusão do ANÚNCIO o USUÁRIO deve preencher os dados solicitados pela PLATAFORMA APPÊ+, autorizando que a APPÊ+ entre em contato para entender e auxiliar a publicação do ANÚNCIO, assim como, divulgar o ANÚNCIO na PLATAFORMA APPÊ+ e em outros canais selecionados pela PLATAFORMA APPÊ+.
                            </p>
                            <p style={{ textAlign: 'justify', marginLeft: 50 }}>3.3.1.	Para garantir a veracidade do ANÚNCIO e prevenir fraudes, serão analisados os seguintes documentos: matrícula do imóvel, documentos do PROPRIETÁRIO, sem prejuízo de outros que a APPÊ+ julgar necessários.</p>
                            <p className="topicos-secundarios">
                            3.4.	Após o USUÁRIO fornecer todas as informações solicitadas pela PLATAFORMA APPÊ+, sendo a veracidade destas informações de plena e total responsabilidade do USUÁRIO, o USUÁRIO deverá selecionar um dos CORRETORES cadastrados na PLATAFORMA APPÊ+ e assinar a AUTORIZAÇÃO DE VENDA.<br /><br />

                            3.5.	O CORRETOR selecionado pelo PROPRIETÁRIO será responsável, dentre outras atividades, pela condução das visitas ao IMÓVEL, por dar suporte ao USUÁRIO na obtenção dos documentes necessários para a DILIGÊNCIA, por manter contato com potenciais interessados.<br /><br />

                            3.6.	Após o fornecimento das informações solicitadas, seleção do CORRETOR e assinatura da AUTORIZAÇÃO DE VENDA, o ANÚNCIO será publicado na PLATAFORMA APPÊ+.<br /><br />

                            3.7.	Após a publicação do ANÚNCIO, o COMPRADOR, após selecionar um CORRETOR, poderá agendar e realizar visitas e fazer uma proposta para compra do IMÓVEL, informando se a compra será feita com financiamento ou à vista.<br /><br />

                            3.8.	O CORRETOR poderá entrar em contato com o COMPRADOR por telefone, e-mail ou outro meio, para confirmar a proposta e entender a composição dos valores envolvidos, como: valor total da proposta, valor de entrada, valor eventualmente disponível de FGTS, valor financiado, valores de ITBI (Imposto sobre a Transmissão de Bens Imóveis), valor de registro e de escritura. <br /><br />

                            3.9.	A PLATAFORMA APPÊ+ também poderá solicitar ao COMPRADOR o envio de outros documentos e a confirmação da proposta feita.<br /><br />

                            3.10.	A PLATAFORMA APPÊ+ formalizará a proposta por meio da assinatura da PROMESSA DE COMPRA E VENDA entre o PROPRIETÁRIO e o COMPRADOR. Para isso, deverão ser enviados alguns documentos para a PLATAFORMA APPÊ+ e informados os dados necessários para qualificação do PROPRIETÁRIO e do COMPRADOR no PROMESSA DE COMPRA E VENDA, como: estado civil, endereço completo e a existência de outros PROPRIETÁRIOS ou COMPRADORES. A PROMESSA DE COMPRA E VENDA deverá ser assinado pelo PROPRIETÁRIO, COMPRADOR, eventuais cônjuges e companheiros, além de testemunhas, na forma da Lei.<br /><br />

                            3.11.	O COMPRADOR e o PROPRIETÁRIO só estarão vinculados e obrigados às condições da proposta após a assinatura da PROMESSA DE COMPRA E VENDA. Após 5 (cinco) dias úteis da disponibilização da PROMESSA DE COMPRA E VENDA e se não houver resposta de uma ou ambas as Partes, o PLATAFORMA APPÊ+ está autorizada, por seu único e exclusivo critério, a anular o PROMESSA DE COMPRA E VENDA e retirá-la da plataforma, devendo as partes repetirem o processo de proposta e aceitação na PLATAFORMA APPÊ+ para retomar as negociações.<br /><br />

                            3.12.	Se a compra for à vista, será necessária a lavratura da Escritura Pública no Cartório de Notas competentes, ser assinada física ou eletronicamente pelo PROPRIETÁRIO e pelo COMPRADOR. Se a compra for financiada, PROPRIETÁRIO e COMPRADOR deverão assinar o Contrato de Financiamento com força de Escritura Pública, podendo haver a necessidade do reconhecimento de firma dos signatários do referido contrato para o registro.<br /><br />

                            3.13.	Após a assinatura da PROMESSA DE COMPRA E VENDA, COMPRADOR e PROPRIETÁRIO estão legalmente obrigados a seguir com o negócio. Caso se verifique qualquer hipótese de desistência ou rescisão, poderão ser aplicadas penalidades como multa e juros, conforme estabelecido na PROMESSA DE COMPRA E VENDA.<br /><br />

                            3.14.	Pelo serviço de intermediação, é devido pelo PROPRIETÁRIO à APPÊ+ e ao(s) CORRETOR (es) a comissão de corretagem, que corresponde a 6% (seis por cento) do valor da venda, como acordado na PROMESSA DE COMPRA E VENDA. A APPÊ+ emitirá NFS-e pelos serviços prestados e fará o repasse do valor aos ao(s) CORRETOR (es).<br /><br />

                            3.15.	O valor devido pelo serviço de intermediação será pago diretamente à  APPÊ+, quando do recebimento da parcela do sinal, pelo VENDEDOR.
                            </p>
                            <p className="topicos-principais">4.	CONDIÇÕES DE USO</p>
                            <p className="topicos-secundarios">
                            4.1.	A APPÊ+ exerce o papel de intermediadora entre os USUÁRIOS da sua PLATAFORMA APPÊ+.<br /><br />

                            4.2.	Os serviços se destinam exclusivamente para pessoas capazes de exercer atos da vida civil, portanto, qualquer acesso ou uso da PLATAFORMA APPÊ+ por menores de 18 anos não emancipados é expressamente proibido. Desse modo, ao utilizar a PLATAFORMA APPÊ+ você garante que é capaz de exercer pessoalmente os atos da vida civil. <br /><br />

                            4.3.	A APPÊ+ poderá a seu exclusivo critério, em caso de suspeita de fraude na utilização da PLATAFORMA APPÊ+, do descumprimento destes Termos, interromper e/ou excluir o USUÁRIO responsável e suspender, temporariamente, o acesso aos serviços disponibilizados.<br /><br />

                            4.4.	A APPÊ+ reserva-se o direito de alterar os presentes Termos a qualquer momento, no todo ou em parte, independentemente de notificação prévia, sendo que a continuidade do USUÁRIO em usar a PLATAFORMA APPÊ+, após tais modificações, será presumida como a continuidade do acesso. É de responsabilidade do USUÁRIO 
                            acessar regularmente a página web onde se encontra os presentes Termos, a fim de verificar eventuais modificações no presente instrumento. Caso o USUÁRIO não concorde com quaisquer modificações introduzidas, deve cessar imediatamente a utilização da PLATAFORMA APPÊ+. 
                            </p>
                            <p className="topicos-principais">5.	RESPONSABILIDADES </p>
                            <p className="topicos-secundarios">5.1.	A APPÊ+ não se responsabiliza: </p>
                            <p style={{ textAlign: 'justify', marginLeft: 50 }}>
                            5.1.1.	Por qualquer transação realizada diretamente entre PROPRIETÁRIOS e COMPRADORES, mesmo que as Partes tenham se conhecido por meio da PLATAFORMA APPÊ+.<br /><br />

                            5.1.2.	Pelo livre compartilhamento de dados entre PROPRIETÁRIOS e COMPRADORES realizado através do chat da PLATAFORMA APPÊ+ sem a necessidade ou conexão aos processos intermediados pela PLATAFORMA APPÊ+.<br /><br />

                            5.1.3.	por quaisquer danos ou indenizações decorrentes de falha no cumprimento de obrigação por qualquer USUÁRIO.<br /><br />

                            5.1.4.	Pelas obrigações tributárias decorrentes das atividades dos USUÁRIOS relacionadas à utilização da PLATAFORMA APPÊ+. O USUÁRIO é exclusiva e integralmente responsável por todos os tributos, impostos e taxas, incidentes sobre suas atividades relacionadas à utilização da PLATAFORMA APPÊ+.
                            <br /><br />

                            5.1.5.	Pela conduta dos USUÁRIOS ou de terceiros contatados por meio da PLATAFORMA APPÊ+. A APPÊ+ não se responsabiliza por qualquer ato ou omissão de qualquer USUÁRIO em relação a outros USUÁRIOS ou terceiros. <br /><br />

                            5.1.6.	Por dados desatualizados, incompletos ou inverídicos disponibilizados e atualizados por terceiros; como os de instituições financeiras, sites utilizados para anúncios e demais parceiros comerciais.<br /><br />

                            5.1.7.	Por quaisquer indisponibilidades ou erros apresentados na PLATAFORMA APPÊ+, assim como por eventual defraudação da utilidade que o USUÁRIO possa atribuir à Plataforma.<br /><br />

                            5.1.8.	Por erros ou eventuais inconsistências na transmissão de dados, pela qualidade ou disponibilidade da conexão de Internet, que impeçam o recebimento de informações pela PLATAFORMA APPÊ+ ou pelo USUÁRIO. <br /><br />
                            5.1.9.	Por danos e prejuízos de toda natureza em decorrência de falha exclusivamente relacionada ao USUÁRIO ou a terceiros que fujam a qualquer controle razoável da APPÊ+.<br /><br />

                            </p>
                            <p className="topicos-principais">6.	PREÇO DOS SERVIÇOS E REMUNERAÇÃO </p>
                            <p className="topicos-secundarios">
                            6.1.	O USUÁRIO tem ciência de que os CORRETORES são contratados pelos PROPRIETÁRIOS interessados em vender seus IMÓVEIS, mediante taxa de corretagem, e que o APPÊ+ repassará o valor a eles em um prazo de 02 (dois) dias úteis.<br /><br />

                            6.2.	O USUÁRIO tem ciência de que os valores pagos não serão restituídos pela APPÊ+ na hipótese de desfazimento posterior do negócio.<br /><br />

                            6.3.	O APPÊ+ disponibilizará relatórios mensais dos repasses realizados aos CORRETORES para assegurar a transparência. Os CORRETORES, como prestadores de serviços aos PROPRIETÁRIOS, são responsáveis pela emissão de recibo, documento fiscal ou quaisquer obrigações acessórias correspondentes ao pagamento da taxa de corretagem.
                            </p>
                            <p className="topicos-principais">7.	PROPRIEDADE INTELECTUAL</p>
                            <p className="topicos-secundarios">
                            7.1.	A APPÊ+ é o único detentor de todos os direitos de propriedade intelectual relacionados à PLATAFORMA APPÊ+ e aos seus serviços, tais como: código-fonte, módulos, pacotes, estrutura de funcionamento, modelo de negócios, algoritmos e todas as informações relativas ao uso, funcionamento e demais dados e documentações. <br /><br />

                            7.2.	A APPÊ+ garante que é o titular da tecnologia e das ferramentas para execução dos serviços prestados, e, quando não for, detém as devidas autorizações para o uso das ferramentas.  <br /><br />

                            7.3.	O banco de dados da PLATAFORMA APPÊ+ e os dados que o integram, brutos ou elaborados, são propriedade exclusiva da APPÊ+, que sobre eles possui todos os direitos de propriedade intelectual.  <br /><br />

                            7.4.	Nenhum item neste Termo é considerado como transferência ou cessão de direito de propriedade intelectual, somente é permitido ao USUÁRIO a utilização da propriedade intelectual do APPÊ+ enquanto houver o cumprimento e a observância destes Termos.
                            </p>
                            <p className="topicos-principais">8.	CONTATO </p>
                            <p className="topicos-secundarios">8.1.	A APPÊ+ poderá entrar em contato com você por telefone, e-mail, Whatsapp, ou outros canais que você tenha compartilhado para comunicar questões relativas à prestação de serviços, ofertar produtos/serviços, convidar você para contribuir com pesquisas, entre outros. </p>
                            <p className="topicos-principais">9.	ACEITAÇÃO </p>
                            <p className="topicos-secundarios">9.1.	O USUÁRIO declara estar ciente e de acordo com todos os itens mencionados nestes Termos de Uso ao criar a sua conta na PLATAFORMA APPÊ+, para fins de utilização das plataformas e serviços.</p>
                            <p className="topicos-principais">10.	DISPOSIÇÕES GERAIS</p>
                            <p style={{ textAlign: 'justify', marginBottom: 40 }}>
                            10.1.	Qualquer condição deste Termo que, por qualquer razão, venha a ser reputada nula ou ineficaz por qualquer juízo ou tribunal, não afetará a validade das demais disposições do Termo, as quais permanecerão plenamente válidas e vinculantes, gerando efeitos em sua máxima extensão.<br /><br />

                            10.2.	A APPÊ+ busca, constantemente, melhorar os Termos, seus produtos e serviços, tendo o direito de adicionar, remover ou atualizar conteúdo, funcionalidades ou softwares. O USUÁRIO será informado por e-mails, mensagens pelo aplicativo Whatsapp, notificação instantânea (push) ou por outros meios. <br /><br />

                            10.3.	Os Termos são regidos pelas leis vigentes na República Federativa do Brasil. <br /><br />

                            10.4.	Para todos os assuntos referentes à interpretação, ao cumprimento ou qualquer outro questionamento relacionado a estes Termos de Uso, as Partes concordam em se submeter ao Foro da Comarca de Belo Horizonte/MG, com exceção de reclamações apresentadas por USUÁRIOS que se enquadrem legalmente como consumidores, que poderão submeter tais reclamações ao foro de seu domicílio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer dark />
        </>
    )
}