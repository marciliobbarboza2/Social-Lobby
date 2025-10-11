import { useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Emma Rodriguez",
      avatar: "👩‍💻",
      time: "2 hours ago",
      content: "Just launched my first React app! 🚀 The journey from idea to deployment is incredible. Grateful for the amazing developer community that helped me along the way. What's your biggest coding achievement this year?",
      likes: 47,
      comments: [
        { id: 1, author: "Alex Chen", content: "Congrats! That's awesome! 🎉", time: "1h ago" },
        { id: 2, author: "Maria Garcia", content: "So proud of you! What's next?", time: "45m ago" }
      ],
      liked: false,
      image: null
    },
    {
      id: 2,
      author: "David Kim",
      avatar: "👨‍🍳",
      time: "4 hours ago",
      content: "Made homemade pizza from scratch tonight! 🍕 Nothing beats the smell of fresh dough baking. The secret is using high-quality olive oil and fresh basil. Recipe in the comments if anyone wants it!",
      likes: 89,
      comments: [
        { id: 3, author: "Lisa Park", content: "That looks amazing! Please share the recipe 🙏", time: "3h ago" },
        { id: 4, author: "Tom Wilson", content: "Homemade pizza is the best! What's your favorite topping combo?", time: "2h ago" },
        { id: 5, author: "David Kim", content: "Sure! Thin crust, san marzano tomatoes, fresh mozzarella, and lots of basil! 🌿", time: "2h ago" }
      ],
      liked: true,
      image: "🍕"
    },
    {
      id: 3,
      author: "Sophie Anderson",
      avatar: "👩‍🎨",
      time: "6 hours ago",
      content: "Morning walk in the park was exactly what I needed today. 🌳 Sometimes you just need to disconnect from screens and reconnect with nature. The birds were singing, flowers are blooming, and the air smelled fresh. How do you recharge?",
      likes: 156,
      comments: [
        { id: 6, author: "James Mitchell", content: "Love this! Nature walks are so therapeutic. Where's your favorite park?", time: "5h ago" },
        { id: 7, author: "Sophie Anderson", content: "Riverside Park! It's peaceful and has the best walking trails 🌿", time: "4h ago" }
      ],
      liked: false,
      image: "🌳"
    },
    {
      id: 4,
      author: "Carlos Mendoza",
      avatar: "👨‍⚕️",
      time: "8 hours ago",
      content: "Proud of my nursing team today. We had a challenging shift but everyone showed up with compassion and skill. Healthcare workers are the real heroes. 💙 To all the nurses, doctors, and staff out there - you're appreciated more than you know.",
      likes: 234,
      comments: [
        { id: 8, author: "Rachel Green", content: "Thank you for your service! 🙏 Stay safe out there", time: "7h ago" },
        { id: 9, author: "Dr. Sarah Lee", content: "Couldn't agree more. Teamwork makes the dream work! 💪", time: "6h ago" }
      ],
      liked: true,
      image: null
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState('')

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
        comments: [],
        liked: false,
        image: null
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleComment = (postId) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        content: newComment,
        time: "now"
      }
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, comment]
            }
          : post
      ))
      setNewComment('')
    }
  }

  return (
    <div className="socialobby-container">
      {/* Header */}
      <header className="socialobby-header">
        <div className="header-content">
          <h1 className="socialobby-logo">Socialobby</h1>
          <div className="header-actions">
            <button className="header-btn">👤 Profile</button>
            <button className="header-btn">⚙️ Settings</button>
            <button className="header-btn">🔔 Notifications</button>
          </div>
        </div>
      </header>

      <div className="socialobby-main">
        {/* Sidebar */}
        <aside className="socialobby-sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            <ul>
              <li>🏠 Feed</li>
              <li>👥 Friends</li>
              <li>💬 Messages</li>
              <li>📷 Photos</li>
              <li>📅 Events</li>
              <li>👪 Groups</li>
              <li>📰 Pages</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>Your Shortcuts</h3>
            <ul>
              <li>🎨 Art Community</li>
              <li>💻 Tech Talk</li>
              <li>🍳 Food Lovers</li>
              <li>🏃 Fitness Friends</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="socialobby-content">
          {/* Create Post */}
          <div className="create-post">
            <div className="post-composer">
              <div className="composer-input">
                <span className="user-avatar">😊</span>
                <textarea
                  placeholder="What's happening in your world?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="post-input"
                />
              </div>
              <div className="composer-actions">
                <button className="media-btn">📷 Photo</button>
                <button className="media-btn">📹 Video</button>
                <button className="media-btn">📍 Location</button>
                <button className="media-btn">😊 Feeling</button>
                <button
                  className="post-btn"
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                >
                  Share
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
                  {post.image && (
                    <div className="post-image">
                      <span style={{ fontSize: '4rem' }}>{post.image}</span>
                    </div>
                  )}
                </div>

                <div className="post-stats">
                  <span className="likes-count">
                    {post.likes > 0 && `👍 ${post.likes} likes`}
                  </span>
                  <span className="comments-count">
                    {post.comments.length > 0 && `${post.comments.length} comments`}
                  </span>
                </div>

                <div className="post-actions">
                  <button
                    className={`action-btn ${post.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    👍 Like
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => toggleComments(post.id)}
                  >
                    💬 Comment
                  </button>
                  <button className="action-btn">📤 Share</button>
                </div>

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="comments-section">
                    <div className="add-comment">
                      <span className="user-avatar-small">😊</span>
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                        className="comment-input"
                      />
                      <button
                        className="comment-btn"
                        onClick={() => handleComment(post.id)}
                        disabled={!newComment.trim()}
                      >
                        Post
                      </button>
                    </div>
                    <div className="comments-list">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="comment">
                          <span className="comment-avatar">👤</span>
                          <div className="comment-content">
                            <div className="comment-header">
                              <span className="comment-author">{comment.author}</span>
                              <span className="comment-time">{comment.time}</span>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="socialobby-right-sidebar">
          <div className="sidebar-section">
            <h3>Online Friends</h3>
            <div className="contacts-list">
              <div className="contact online">🟢 Emma Rodriguez</div>
              <div className="contact online">🟢 David Kim</div>
              <div className="contact">⚪ Sophie Anderson</div>
              <div className="contact online">🟢 Carlos Mendoza</div>
              <div className="contact">⚪ Alex Chen</div>
              <div className="contact online">🟢 Maria Garcia</div>
            </div>
          </div>
          <div className="sidebar-section">
            <h3>Trending Topics</h3>
            <div className="trending-list">
              <div className="trend">#WeekendVibes</div>
              <div className="trend">#HomeCooking</div>
              <div className="trend">#NaturePhotography</div>
              <div className="trend">#TechNews</div>
              <div className="trend">#FitnessMotivation</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
