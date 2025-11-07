import React from 'react';

const mockProducts = [
  { id: 'p1', title: 'Mountain Bike', price: 250, image: 'https://picsum.photos/seed/bike/300/200', location: 'San Francisco, CA', time: '2h ago' },
  { id: 'p2', title: 'Gaming Chair', price: 120, image: 'https://picsum.photos/seed/chair/300/200', location: 'Oakland, CA', time: '5h ago' },
  { id: 'p3', title: 'Coffee Table', price: 60, image: 'https://picsum.photos/seed/table/300/200', location: 'Berkeley, CA', time: '1d ago' },
  { id: 'p4', title: 'iPhone 12 (Unlocked)', price: 380, image: 'https://picsum.photos/seed/phone/300/200', location: 'San Jose, CA', time: '1d ago' },
  { id: 'p5', title: 'Bookshelf', price: 45, image: 'https://picsum.photos/seed/books/300/200', location: 'Palo Alto, CA', time: '3d ago' },
  { id: 'p6', title: 'Standing Desk', price: 200, image: 'https://picsum.photos/seed/desk/300/200', location: 'Sunnyvale, CA', time: '1w ago' }
];

const Marketplace = () => {
  return (
    <div className="marketplace-page">
      <div className="marketplace-header">
        <h2>Marketplace</h2>
        <div className="marketplace-actions">
          <input className="marketplace-search" placeholder="Search listings" />
          <button className="marketplace-sell-btn">+ Create listing</button>
        </div>
      </div>
      <div className="marketplace-grid">
        {mockProducts.map((p) => (
          <div className="marketplace-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <div className="marketplace-info">
              <div className="price">${p.price}</div>
              <div className="title">{p.title}</div>
              <div className="meta">{p.location} · {p.time}</div>
            </div>
            <button className="marketplace-message-btn">Message seller</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
