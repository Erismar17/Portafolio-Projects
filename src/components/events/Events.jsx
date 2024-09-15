import React, { useState, useEffect } from 'react';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [dateEvent, setDateEvent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem('list');
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        setEvents([]);
      }
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('list', JSON.stringify(events));
    }
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  const addEvent = () => {
    if (!eventName.trim() || !dateEvent || dateGap(dateEvent) < 0) {
      setError('Please provide a valid event name and a future date.');
      return;
    }
    const newEvent = {
      id: Date.now().toString(),
      name: eventName,
      date: dateEvent,
    };
    setEvents([newEvent, ...events]);
    setEventName('');
    setDateEvent('');
    setError('');
  };

  const dateGap = (destination) => {
    const destinationDate = new Date(destination);
    const realDate = new Date();
    const difference = destinationDate.getTime() - realDate.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('list', JSON.stringify(updatedEvents));
  };

  return (
    <div className='events'>
      <div className='form'>
        <p className='title-events'>Future Events</p>
        <form className='inputForm' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name of the event'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type='date'
            value={dateEvent}
            onChange={(e) => setDateEvent(e.target.value)}
          />
          <input type='submit' id='add' value='Add Event' />
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
      <div className='ListEvents'>
        {events.length > 0 ? (
          events.map((event) => (
            <div className='event' key={event.id}>
              <div className='days'>
                <span className='dateGap'>{dateGap(event.date)}</span>
                <span>days for</span>
              </div>
              <div className='nameEvent'>{event.name}</div>
              <div className='dateEvent'>{new Date(event.date).toLocaleDateString()}</div>
              <div className='accions'>
                <button onClick={() => deleteEvent(event.id)} className='delete'>
                  <span className='material-symbols-rounded'>delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='without-events'>No upcoming events</p>
        )}
      </div>
    </div>
  );
};
export default Events;