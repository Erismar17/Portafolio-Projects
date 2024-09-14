import React, { useState, useEffect } from 'react';
import './events.css'; // Asegúrate de que el archivo de estilos esté en la ubicación correcta

const Events = () => {
  const [eventos, setEventos] = useState([]);
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');

  useEffect(() => {
    // Cargar eventos desde localStorage cuando el componente se monta
    const json = localStorage.getItem('lista');
    try {
      const storedEventos = JSON.parse(json);
      setEventos(storedEventos || []);
    } catch (error) {
      setEventos([]);
    }
  }, []);

  useEffect(() => {
    // Guardar eventos en localStorage cuando cambian
    localStorage.setItem('lista', JSON.stringify(eventos));
  }, [eventos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarEvento();
  };

  const agregarEvento = () => {
    if (!nombreEvento || !fechaEvento || diferenciaFecha(fechaEvento) < 0) {
      return;
    }
    const nuevoEvento = {
      id: (Math.random() * 100).toString(36).slice(3),
      nombre: nombreEvento,
      fecha: fechaEvento,
    };
    setEventos([nuevoEvento, ...eventos]);
    setNombreEvento('');
    setFechaEvento('');
  };

  const diferenciaFecha = (destino) => {
    const fechaDestino = new Date(destino);
    const fechaActual = new Date();
    const diferencia = fechaDestino.getTime() - fechaActual.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
  };

  const eliminarEvento = (id) => {
    setEventos(eventos.filter(evento => evento.id !== id));
  };

  return (
    <div className="eventos">
      <div className="formulario">
        <p className="titulo">Próximos Eventos</p>
        <form className="inputFormulario" onSubmit={handleSubmit}>
          <input
            type="text"
            id="nombreEvento"
            placeholder="Nombre del evento"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
          />
          <input
            type="date"
            id="fechaEvento"
            value={fechaEvento}
            onChange={(e) => setFechaEvento(e.target.value)}
          />
          <input type="submit" id="agregar" value="Agregar Evento" />
        </form>
      </div>
      <div className="listas">
        <div className="ListaEventos2" id="ListaEventos">
          {eventos.map((evento) => (
            <div className="evento" key={evento.id}>
              <div className="dias">
                <span className="diasFaltantes">{diferenciaFecha(evento.fecha)}</span>
                <span className="texto">dias para</span>
              </div>
              <div className="nombreEvento">{evento.nombre}</div>
              <div className="fechaEvento">{evento.fecha}</div>
              <div className="acciones">
                <button onClick={() => eliminarEvento(evento.id)} className="eliminar">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;