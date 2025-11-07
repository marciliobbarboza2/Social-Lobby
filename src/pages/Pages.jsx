import React from 'react';

const Pages = () => {
  const pages = [
    { id: 1, name: 'Tech Talk Daily', icon: '💻', followers: 12453, category: 'Technology', verified: true, cover: 'https://picsum.photos/seed/techpage/400/200' },
    { id: 2, name: 'Art Community Hub', icon: '🎨', followers: 8234, category: 'Art & Culture', verified: true, cover: 'https://picsum.photos/seed/artpage/400/200' },
    { id: 3, name: 'Food Lovers United', icon: '🍳', followers: 15678, category: 'Food & Cooking', verified: false, cover: 'https://picsum.photos/seed/foodpage/400/200' },
    { id: 4, name: 'Fitness & Wellness', icon: '🏃', followers: 9876, category: 'Health & Fitness', verified: true, cover: 'https://picsum.photos/seed/fitnesspage/400/200' },
    { id: 5, name: 'Travel Stories', icon: '✈️', followers: 11234, category: 'Travel', verified: false, cover: 'https://picsum.photos/seed/travelpage/400/200' },
    { id: 6, name: 'Code Academy', icon: '👨‍💻', followers: 18456, category: 'Education', verified: true, cover: 'https://picsum.photos/seed/codepage/400/200' }
  ];

  return (
    <div className="pages-page">
      <div className="page-header">
        <h1>📰 Pages</h1>
        <button className="btn-primary">+ Create Page</button>
      </div>

      <div className="pages-tabs">
        <button className="tab-btn active">Your Pages</button>
        <button className="tab-btn">Liked Pages</button>
        <button className="tab-btn">Discover</button>
      </div>

      <div className="pages-grid">
        {pages.map(page => (
          <div key={page.id} className="page-card">
            <div className="page-cover" style={{
              background: `url(${page.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="page-overlay"></div>
            </div>
            <div className="page-content">
              <div className="page-icon">{page.icon}</div>
              <h3>
                {page.name}
                {page.verified && <span className="verified-badge">✓</span>}
              </h3>
              <p className="page-category">{page.category}</p>
              <div className="page-stats">
                <span>👥 {page.followers.toLocaleString()} followers</span>
              </div>
              <div className="page-actions">
                <button className="btn-primary">Follow</button>
                <button className="btn-secondary">Message</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pages;
