import { useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      avatar: "👤",
      time: "2 hours ago",
      content: "Just finished an amazing book! 📚 Sometimes the best stories are the ones that make you think about your own life. What's everyone reading these days?",
      likes: 12,
      comments: 3,
      liked: false
    },
    {
      id: 2,
      author: "Sarah Wilson",
      avatar: "👩",
      time: "4 hours ago",
      content: "Beautiful sunset today! 🌅 Nature has a way of reminding us to slow down and appreciate the little things.",
      likes: 24,
      comments: 7,
      liked: true
    },
    {
      id: 3,
      author: "Mike Johnson",
      avatar: "👨",
      time: "6 hours ago",
      content: "Coffee and coding ☕💻 Perfect way to start the day. What's your morning routine?",
      likes: 8,
      comments: 2,
      liked: false
    }
  ])

  const [newPost, setNewPost] = useState('')

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You",
        avatar: "😊",
        time: "now",
        content: newPost,
        likes: 0,
        comments: 0,
        liked: false
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  return (
    <div className="facebook-container">
      {/* Header */}
      <header className="facebook-header">
        <div className="header-content">
          <h1 className="facebook-logo">facebook</h1>
          <div className="header-actions">
            <button className="header-btn">👤 Profile</button>
            <button className="header-btn">⚙️ Settings</button>
          </div>
        </div>
      </header>

      <div className="facebook-main">
        {/* Sidebar */}
        <aside className="facebook-sidebar">
          <div className="sidebar-section">
            <h3>Menu</h3>
            <ul>
              <li>🏠 News Feed</li>
              <li>👥 Friends</li>
              <li>💬 Messages</li>
              <li>📷 Photos</li>
              <li>📅 Events</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="facebook-content">
          {/* Create Post */}
          <div className="create-post">
            <div className="post-composer">
              <div className="composer-input">
                <span className="user-avatar">😊</span>
                <textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="post-input"
                />
              </div>
              <div className="composer-actions">
                <button className="media-btn">📷 Photo</button>
                <button className="media-btn">📹 Video</button>
                <button className="media-btn">😊 Feeling</button>
                <button
                  className="post-btn"
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {posts.map(post => (
              <article key={post.id} className="post">
                <div className="post-header">
                  <div className="post-author">
                    <span className="author-avatar">{post.avatar}</span>
                    <div className="author-info">
                      <h4 className="author-name">{post.author}</h4>
                      <span className="post-time">{post.time}</span>
                    </div>
                  </div>
                  <button className="post-options">⋯</button>
                </div>

                <div className="post-content">
                  <p>{post.content}</p>
                </div>

                <div className="post-stats">
                  <span className="likes-count">
                    {post.likes > 0 && `👍 ${post.likes}`}
                  </span>
                  <span className="comments-count">
                    {post.comments > 0 && `${post.comments} comments`}
                  </span>
                </div>

                <div className="post-actions">
                  <button
                    className={`action-btn ${post.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    👍 Like
                  </button>
                  <button className="action-btn">💬 Comment</button>
                  <button className="action-btn">📤 Share</button>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="facebook-right-sidebar">
          <div className="sidebar-section">
            <h3>Contacts</h3>
            <div className="contacts-list">
              <div className="contact">👤 John Doe</div>
              <div className="contact">👩 Sarah Wilson</div>
              <div className="contact">👨 Mike Johnson</div>
              <div className="contact">👧 Emma Davis</div>
              <div className="contact">👦 Alex Brown</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
