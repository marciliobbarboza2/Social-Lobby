import React from 'react';

const Groups = () => {
  const groups = [
    { id: 1, name: 'Tech Innovators', icon: '💻', members: 1234, posts: '50+ this week', cover: 'https://picsum.photos/seed/tech/400/200' },
    { id: 2, name: 'React Developers', icon: '⚛️', members: 856, posts: '30+ this week', cover: 'https://picsum.photos/seed/react/400/200' },
    { id: 3, name: 'Food Lovers', icon: '🍳', members: 2341, posts: '100+ this week', cover: 'https://picsum.photos/seed/food/400/200' },
    { id: 4, name: 'Fitness Friends', icon: '🏃', members: 567, posts: '25+ this week', cover: 'https://picsum.photos/seed/fitness/400/200' },
    { id: 5, name: 'Art Community', icon: '🎨', members: 890, posts: '45+ this week', cover: 'https://picsum.photos/seed/art/400/200' },
    { id: 6, name: 'Gaming Group', icon: '🎮', members: 1567, posts: '80+ this week', cover: 'https://picsum.photos/seed/gaming/400/200' },
    { id: 7, name: 'ML & Data Group', icon: '📊', members: 734, posts: '20+ this week', cover: 'https://picsum.photos/seed/data/400/200' },
    { id: 8, name: 'Travel Enthusiasts', icon: '✈️', members: 1890, posts: '60+ this week', cover: 'https://picsum.photos/seed/travel/400/200' }
  ];

  return (
    <div className="groups-page">
      <div className="page-header">
        <h1>👪 Groups</h1>
        <button className="btn-primary">+ Create Group</button>
      </div>

      <div className="groups-tabs">
        <button className="tab-btn active">Your Groups</button>
        <button className="tab-btn">Discover</button>
        <button className="tab-btn">Invitations</button>
      </div>

      <div className="groups-grid">
        {groups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-cover" style={{
              background: `url(${group.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="group-overlay"></div>
            </div>
            <div className="group-content">
              <div className="group-icon">{group.icon}</div>
              <h3>{group.name}</h3>
              <div className="group-stats">
                <span>👥 {group.members.toLocaleString()} members</span>
                <span>📝 {group.posts}</span>
              </div>
              <button className="btn-primary">View Group</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
