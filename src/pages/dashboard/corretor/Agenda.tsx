import React, { useEffect } from "react";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../../../styles/pages/dashboard/corretor/agenda.scss";
import api from "../../../services/api";
import { iDadosUsuario } from "../../../@types";
import { EventInput } from "@fullcalendar/react";
import { useHistory } from "react-router";
import Footer from "../../../components/Footer";

interface iCompromissos {
  codAgenda: number;
  dtInicio: string;
  dtFim: string;
  descTipoCompromisso: string;
  titulo: string;
}

interface iEventos {
  id: number;
  title: string;
  start: string;
  end: string;
}

export function Agenda() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [url, setUrl] = useState("");
  const [descricao, setDescricao] = useState("");
  const [compromissos, setCompromissos] = useState<iCompromissos[]>([]);
  const [eventos, setEventos] = useState<EventInput[]>([]);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token || usuario.codStatus !== 1) {
      window.alert("Você precisar estar logado e aprovado para acessar este menu!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    getCompromissos();
  }, []);

  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }


  function handleDateSelect(clickInfo: EventClickArg) {
    handleOpen();
    setId(clickInfo.event.id);

    //A data de inicio é a mesma de fim !
    getHorarios();
    dataInicialCorrecao(clickInfo.event.start);
    dataFinalCorrecao(clickInfo.event.start);
    setTitulo(clickInfo.event.title);
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    "@media (max-width:780px)": {
      width: 300,
    },
  };

  async function getCompromissos() {
    await api
      .get(
        `/agenda/todas-visitas-corretor?CodCorretor=${usuario.codCorretor}&Pagina=1&QtdePagina=100`
      )
      .then((response) => {
        setCompromissos(response.data.data);
        console.log(response.data)

        // Cria array de eventos
        const teste: EventInput[] = response.data.data.map(
          (e: iCompromissos) => ({
            id: String(e.codAgenda),
            date: e.dtInicio.split("T")[0],
            title: e.titulo,
          })
        );
        setEventos(teste);
        console.log('evento',eventos)
        /* dataCorrecao(response.data.data) */
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  let listaMes: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dez",
  ];
  function getHorarios(){
    let horarioInicio:string;
    let horarioFim:string;

    compromissos.map((compromisso)=>{ 
      horarioInicio = compromisso.dtInicio
      horarioFim = compromisso.dtFim
      
      const horaFormatoInicio = horarioInicio.split('T');
      const horarioFormInicio = horaFormatoInicio[1];
      const horaInicio = horarioFormInicio.split(':', 2)
      const valueInicio = horaInicio.join(':')

      const horaFormatoFim = horarioFim.split('T');
      const horarioFormFim = horaFormatoFim[1];
      const horaFim = horarioFormFim.split(':', 2)
      const valueFim = horaFim.join(':')
      setHoraInicio(valueInicio)
      setHoraFim(valueFim);

      
    })
  }
  
  function dataInicialCorrecao(dataCompleta: any) {
    var data = String(dataCompleta);
    var dia = data.substring(8, 10);
    var mesExt = data.substring(4, 7);
    var mes = listaMes.indexOf(mesExt) + 1;
    var ano = data.substring(11, 15);
    var hora = data.substring(16, 18);
    var minutos = data.substring(19, 21);
    var dataCorreta = dia + "/" + mes + "/" + ano;
    var horaCorreta = hora + ":" + minutos;
    setDataInicio(dataCorreta);
    // setHoraInicio(horaCorreta);
    
    
  }

  function dataFinalCorrecao(dataCompleta: any) {
    var data = String(dataCompleta);
    if (data === "null") {
      setDataFim("");
      setHoraFim("");
    } else {
      var dia = data.substring(8, 10);
      var mesExt = data.substring(4, 7);
      var mes = listaMes.indexOf(mesExt) + 1;
      var ano = data.substring(11, 15);
      var hora = data.substring(16, 18);
      var minutos = data.substring(19, 21);
      var dataCorreta = dia + "/" + mes + "/" + ano;
      var horaCorreta = hora + ":" + minutos;
      setDataFim(dataCorreta);
      // setHoraFim(horaCorreta);
    }
  }

  return (
    <>
      <div id="agenda" className="wrapper-imoveis">
        <NavbarDashCorretor />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <div className="demo-app-main">
              {eventos.length > 0 ? (
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale={ptLocale}
                  headerToolbar={{
                    left: "dayGridMonth,timeGridWeek,timeGridDay",
                    center: "title",
                    right: "prev,next",
                  }}
                  /* customButtons={{
                    myCustomButton: {
                      text: '+',
                      hint: 'Criar compromisso',
                      click: handleOpen,
                    }
                  }} */
                  eventClassNames="evento"
                  editable={true}
                  selectable={true}
                  eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }}
                  slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }}
                  selectMirror={true}
                  dayMaxEvents={true}
                  buttonText={{
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    day: "Dia",
                  }}
                  slotMinTime="06:00"
                  weekends={true}
                  events={eventos}
                  eventContent={renderEventContent}
                  eventClick={handleDateSelect}
                  eventBackgroundColor="#4BB7F1"
                  eventBorderColor="#4BB7F1"
                />
              ) : (
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale={ptLocale}
                  headerToolbar={{
                    left: "dayGridMonth,timeGridWeek,timeGridDay",
                    center: "title",
                    right: "prev,next",
                  }}
                  /* customButtons={{
                    myCustomButton: {
                      text: '+',
                      hint: 'Criar compromisso',
                      click: handleOpen,
                    }
                  }} */
                  eventClassNames="evento"
                  editable={true}
                  selectable={true}
                  eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }}
                  slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }}
                  selectMirror={true}
                  dayMaxEvents={true}
                  buttonText={{
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    day: "Dia",
                  }}
                  slotMinTime="06:00"
                  weekends={true}
                  eventContent={renderEventContent}
                  eventClick={handleDateSelect}
                  eventBackgroundColor="#4BB7F1"
                  eventBorderColor="#4BB7F1"
                />
              )}
            </div>
            <div style={{ backgroundColor: "white" }}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    style={{ textAlign: "center", marginBottom: 20 }}
                  >
                    Compromisso
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="row">
                      <div className="col-lg-12 formulario">
                        <p style={{ color: "#4BB7F1" }}>Título:</p>
                        <p>{titulo}</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 formulario">
                        <p style={{ color: "#4BB7F1" }}>Data de início:</p>
                        <p>{dataInicio}</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 formulario">
                        <p style={{ color: "#4BB7F1" }}>Hora de início</p>
                        <p>{horaInicio}</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 formulario">
                        <p style={{ color: "#4BB7F1" }}>Data de término:</p>
                        <p>{dataFim}</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 formulario">
                        <p style={{ color: "#4BB7F1" }}>Hora de término:</p>
                        <p>{horaFim}</p>
                      </div>
                      <div className="col-lg-12 formulario">
                        <p style={{ color: "#4BB7F1" }}>Descrição:</p>
                        <p>{descricao}</p>
                      </div>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
