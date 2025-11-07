import React from 'react';

const Photos = () => {
  const photos = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/photo${i}/400/400`,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 30) + 1
  }));

  return (
    <div className="photos-page">
      <div className="page-header">
        <h1>📷 Photos</h1>
        <button className="btn-primary">+ Upload Photos</button>
      </div>

      <div className="photos-tabs">
        <button className="tab-btn active">All Photos</button>
        <button className="tab-btn">Albums</button>
        <button className="tab-btn">Tagged</button>
      </div>

      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt={`Photo ${photo.id}`} loading="lazy" />
            <div className="photo-overlay">
              <div className="photo-stats">
                <span>❤️ {photo.likes}</span>
                <span>💬 {photo.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
