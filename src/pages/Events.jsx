import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Events = () => {
  const { dataProps } = useSocialLobbyContext();
  const { events = [] } = dataProps;
  const [filter, setFilter] = useState('upcoming');

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>📅 Events</h1>
        <button className="btn-primary">+ Create Event</button>
      </div>

      <div className="events-tabs">
        <button 
          className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming Events
        </button>
        <button 
          className={`tab-btn ${filter === 'past' ? 'active' : ''}`}
          onClick={() => setFilter('past')}
        >
          Past Events
        </button>
        <button 
          className={`tab-btn ${filter === 'hosting' ? 'active' : ''}`}
          onClick={() => setFilter('hosting')}
        >
          Hosting
        </button>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-date-badge">
              <div className="event-month">{event.date.split(' ')[0]}</div>
              <div className="event-day">{event.date.split(' ')[1]}</div>
            </div>
            <div className="event-image" style={{
              background: `url(${event.image || 'https://picsum.photos/400/200'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div className="event-content">
              <h3>{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-meta">
                <span>📍 {event.location}</span>
                <span>👥 {event.attendees?.length || 0} going</span>
              </div>
              <div className="event-actions">
                <button className="btn-primary">✓ Interested</button>
                <button className="btn-secondary">Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
