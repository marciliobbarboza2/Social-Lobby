import { useState } from 'react'
import './App.css'

function App() {
  const [posts] = useState([
    {
      id: 1,
      title: "Welcome to Your Blogging Journey! 🌟",
      date: "Today",
      excerpt: "Every great story starts with a single word. This is your space to share your thoughts, dreams, and experiences with the world.",
      readTime: "2 min read"
    },
    {
      id: 2,
      title: "Why Blogging Matters",
      date: "Yesterday",
      excerpt: "Your voice is unique, and your perspective matters. Blogging isn't just about writing—it's about connecting with others who resonate with your story.",
      readTime: "3 min read"
    }
  ])

  return (
    <div className="blog-container">
      {/* Header */}
      <header className="blog-header">
        <h1 className="blog-title">✨ My Blogging Space</h1>
        <p className="blog-tagline">Where your stories come to life</p>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-card">
          <h2>Hey there, storyteller! 👋</h2>
          <p>
            Welcome to your personal corner of the internet. This is where your ideas take flight, 
            your experiences find meaning, and your voice reaches those who need to hear it.
          </p>
          <button className="cta-button">Start Writing ✍️</button>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="posts-section">
        <h2 className="section-title">Recent Stories 📚</h2>
        <div className="posts-grid">
          {posts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <span className="post-date">{post.date}</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <button className="read-more">Read More →</button>
            </article>
          ))}
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="inspiration-section">
        <div className="inspiration-card">
          <h3>💡 Writing Tip of the Day</h3>
          <p>
            "Write what should not be forgotten." - Isabel Allende
          </p>
          <p className="tip-description">
            Don't worry about perfection. Just start writing. Your authentic voice is what makes 
            your blog special. Every word you write is a step forward on your creative journey.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="blog-footer">
        <p>Made with 💖 and lots of ☕</p>
        <p className="footer-note">Keep writing, keep sharing, keep inspiring! 🌈</p>
      </footer>
    </div>
  )
}

export default App
