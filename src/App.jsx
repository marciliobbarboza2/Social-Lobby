import { useState } from 'react'
import './App.css'
import Post from './components/Post'
import Header from './components/Header'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showLogin, setShowLogin] = useState(true)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showOtherProfile, setShowOtherProfile] = useState(false)
  const [otherUser, setOtherUser] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showGroups, setShowGroups] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [currentView, setCurrentView] = useState('feed')
  const [selectedUser, setSelectedUser] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [editingComment, setEditingComment] = useState(null)
  const [editContent, setEditContent] = useState('')

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Emma Rodriguez liked your post", time: "5 minutes ago", read: false },
    { id: 2, message: "David Kim commented on your post", time: "10 minutes ago", read: false },
    { id: 3, message: "Sophie Anderson started following you", time: "1 hour ago", read: true },
    { id: 4, message: "Carlos Mendoza liked your comment", time: "2 hours ago", read: true }
  ])

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Tech Innovators",
      description: "Discussing the latest in technology and innovation",
      members: 1250,
      posts: 450,
      avatar: "https://picsum.photos/seed/tech/50",
      joined: true
    },
    {
      id: 2,
      name: "Food Lovers",
      description: "Sharing recipes, cooking tips, and food experiences",
      members: 890,
      posts: 320,
      avatar: "https://picsum.photos/seed/food/50",
      joined: false
    },
    {
      id: 3,
      name: "Fitness Enthusiasts",
      description: "Motivating each other to stay fit and healthy",
      members: 675,
      posts: 280,
      avatar: "https://picsum.photos/seed/fitness/50",
      joined: true
    },
    {
      id: 4,
      name: "Photography Club",
      description: "Sharing photos and photography techniques",
      members: 540,
      posts: 195,
      avatar: "https://picsum.photos/seed/photo/50",
      joined: false
    },
    {
      id: 5,
      name: "Music Makers",
      description: "For musicians, producers, and music lovers",
      members: 720,
      posts: 310,
      avatar: "https://picsum.photos/seed/music/50",
      joined: true
    }
  ])

  const [stories, setStories] = useState([
    {
      id: 1,
      author: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      image: 'https://picsum.photos/600/400?random=story1',
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      image: 'https://picsum.photos/600/400?random=story2',
      time: '4 hours ago'
    },
    {
      id: 3,
      author: 'Sophie Anderson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      image: 'https://picsum.photos/600/400?random=story3',
      time: '6 hours ago'
    },
    {
      id: 4,
      author: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      image: 'https://picsum.photos/600/400?random=story4',
      time: '8 hours ago'
    }
  ])

  const [users, setUsers] = useState([
    {
      username: 'emma',
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      coverPhoto: 'https://picsum.photos/800/300?random=emma',
      bio: 'Software developer passionate about creating user-friendly applications',
      address: '123 Tech St, San Francisco, CA',
      phone: '+1 (555) 111-2222',
      city: 'San Francisco',
      groups: ['Tech Innovators', 'Women in Tech'],
      maritalStatus: 'Single',
      birthday: 'March 15, 1995',
      profession: 'Software Developer',
      location: 'San Francisco, CA',
      education: 'Stanford University',
      work: 'TechCorp Inc.',
      relationship: 'Single',
      joined: 'January 2020'
    },
    {
      username: 'david',
      name: 'David Kim',
      email: 'david.kim@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      bio: 'Chef and food blogger sharing culinary adventures',
      address: '456 Culinary Ave, New York, NY',
      phone: '+1 (555) 333-4444',
      city: 'New York',
      groups: ['Food Lovers', 'Culinary Arts'],
      maritalStatus: 'Married'
    },
    {
      username: 'sophie',
      name: 'Sophie Anderson',
      email: 'sophie.anderson@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      bio: 'Nature photographer and environmental advocate',
      address: '789 Green Ln, Portland, OR',
      phone: '+1 (555) 555-6666',
      city: 'Portland',
      groups: ['Nature Lovers', 'Photography Club'],
      maritalStatus: 'Single'
    },
    {
      username: 'carlos',
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      bio: 'Healthcare professional dedicated to patient care',
      address: '101 Care Blvd, Chicago, IL',
      phone: '+1 (555) 777-8888',
      city: 'Chicago',
      groups: ['Healthcare Heroes', 'Community Service'],
      maritalStatus: 'Married'
    },
    {
      username: 'lisa',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@example.com',
      avatar: 'https://picsum.photos/seed/lisa/50',
      bio: 'Digital marketing specialist and content creator',
      address: '202 Market St, Austin, TX',
      phone: '+1 (555) 999-0000',
      city: 'Austin',
      groups: ['Marketing Pros', 'Content Creators'],
      maritalStatus: 'Single'
    },
    {
      username: 'mike',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      avatar: 'https://picsum.photos/seed/mike/50',
      bio: 'Fitness trainer and wellness coach',
      address: '303 Gym Ave, Miami, FL',
      phone: '+1 (555) 111-2222',
      city: 'Miami',
      groups: ['Fitness Enthusiasts', 'Health & Wellness'],
      maritalStatus: 'Married'
    },
    {
      username: 'anna',
      name: 'Anna Petrov',
      email: 'anna.petrov@example.com',
      avatar: 'https://picsum.photos/seed/anna/50',
      bio: 'Software engineer and open source contributor',
      address: '404 Code Ln, Seattle, WA',
      phone: '+1 (555) 333-4444',
      city: 'Seattle',
      groups: ['Open Source Community', 'Tech Innovators'],
      maritalStatus: 'Single'
    },
    {
      username: 'david2',
      name: 'David Lee',
      email: 'david.lee@example.com',
      avatar: 'https://picsum.photos/seed/david2/50',
      bio: 'Photographer and travel blogger',
      address: '505 Travel Rd, Denver, CO',
      phone: '+1 (555) 555-6666',
      city: 'Denver',
      groups: ['Travel Lovers', 'Photography Club'],
      maritalStatus: 'Married'
    },
    {
      username: 'sarah',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://picsum.photos/seed/sarah/50',
      bio: 'Graphic designer and creative director',
      address: '606 Design St, Los Angeles, CA',
      phone: '+1 (555) 777-8888',
      city: 'Los Angeles',
      groups: ['Design Community', 'Creative Professionals'],
      maritalStatus: 'Single'
    },
    {
      username: 'alex',
      name: 'Alex Chen',
      email: 'alex.chen@example.com',
      avatar: 'https://picsum.photos/seed/alex/50',
      bio: 'Data scientist and machine learning enthusiast',
      address: '707 Data Ave, Boston, MA',
      phone: '+1 (555) 999-0000',
      city: 'Boston',
      groups: ['AI & ML Group', 'Data Science Hub'],
      maritalStatus: 'Married'
    },
    {
      username: 'maya',
      name: 'Maya Patel',
      email: 'maya.patel@example.com',
      avatar: 'https://picsum.photos/seed/maya/50',
      bio: 'Environmental scientist and climate activist',
      address: '808 Green Way, Seattle, WA',
      phone: '+1 (555) 111-2222',
      city: 'Seattle',
      groups: ['Climate Action', 'Environmental Science'],
      maritalStatus: 'Single'
    },
    {
      username: 'jordan',
      name: 'Jordan Williams',
      email: 'jordan.williams@example.com',
      avatar: 'https://picsum.photos/seed/jordan/50',
      bio: 'Musician and music producer',
      address: '909 Music Blvd, Nashville, TN',
      phone: '+1 (555) 333-4444',
      city: 'Nashville',
      groups: ['Music Makers', 'Sound Engineers'],
      maritalStatus: 'Married'
    }
  ])

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "2 hours ago",
      content: "Just launched my first React app! 🚀 The journey from idea to deployment is incredible. Grateful for the amazing developer community that helped me along the way. What's your biggest coding achievement this year?",
      likes: 47,
      comments: [
        { id: 1, author: "Alex Chen", avatar: "https://picsum.photos/seed/alex/30", content: "Congrats! That's awesome! 🎉", time: "1h ago" },
        { id: 2, author: "Maria Garcia", avatar: "https://picsum.photos/seed/maria/30", content: "So proud of you! What's next?", time: "45m ago" },
        { id: 10, author: "John Doe", avatar: "https://picsum.photos/seed/john/30", content: "Amazing work! Keep it up!", time: "30m ago" }
      ],
      liked: false,
      image: null
    },
    {
      id: 2,
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "4 hours ago",
      content: "Made homemade pizza from scratch tonight! 🍕 Nothing beats the smell of fresh dough baking. The secret is using high-quality olive oil and fresh basil. Recipe in the comments if anyone wants it!",
      likes: 89,
      comments: [
        { id: 3, author: "Lisa Park", avatar: "https://picsum.photos/seed/lisa/30", content: "That looks amazing! Please share the recipe 🙏", time: "3h ago" },
        { id: 4, author: "Tom Wilson", avatar: "https://picsum.photos/seed/tom/30", content: "Homemade pizza is the best! What's your favorite topping combo?", time: "2h ago" },
        { id: 5, author: "David Kim", avatar: "https://picsum.photos/seed/david/30", content: "Sure! Thin crust, san marzano tomatoes, fresh mozzarella, and lots of basil! 🌿", time: "2h ago" },
        { id: 11, author: "Anna Smith", avatar: "https://picsum.photos/seed/anna/30", content: "I need to try this recipe!", time: "1h ago" }
      ],
      liked: true,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      author: "Sophie Anderson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "6 hours ago",
      content: "Morning walk in the park was exactly what I needed today. 🌳 Sometimes you just need to disconnect from screens and reconnect with nature. The birds were singing, flowers are blooming, and the air smelled fresh. How do you recharge?",
      likes: 156,
      comments: [
        { id: 6, author: "James Mitchell", avatar: "https://picsum.photos/seed/james/30", content: "Love this! Nature walks are so therapeutic. Where's your favorite park?", time: "5h ago" },
        { id: 7, author: "Sophie Anderson", avatar: "https://picsum.photos/seed/sophie/30", content: "Riverside Park! It's peaceful and has the best walking trails 🌿", time: "4h ago" },
        { id: 12, author: "Mike Johnson", avatar: "https://picsum.photos/seed/mike/30", content: "Nature is the best medicine!", time: "3h ago" }
      ],
      liked: false,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      author: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "8 hours ago",
      content: "Proud of my nursing team today. We had a challenging shift but everyone showed up with compassion and skill. Healthcare workers are the real heroes. 💙 To all the nurses, doctors, and staff out there - you're appreciated more than you know.",
      likes: 234,
      comments: [
        { id: 8, author: "Rachel Green", avatar: "https://picsum.photos/seed/rachel/30", content: "Thank you for your service! 🙏 Stay safe out there", time: "7h ago" },
        { id: 9, author: "Dr. Sarah Lee", avatar: "https://picsum.photos/seed/sarah/30", content: "Couldn't agree more. Teamwork makes the dream work! 💪", time: "6h ago" },
        { id: 13, author: "Paul Brown", avatar: "https://picsum.photos/seed/paul/30", content: "Heroes indeed! Thank you all.", time: "5h ago" }
      ],
      liked: true,
      image: null
    },
    {
      id: 5,
      author: "Lisa Thompson",
      avatar: "https://picsum.photos/seed/lisa/50",
      time: "10 hours ago",
      content: "Just launched my new marketing campaign! 📈 Spent weeks crafting the perfect strategy, and the results are already showing. Digital marketing is such an exciting field - always evolving, always challenging. What's your favorite marketing tactic?",
      likes: 78,
      comments: [
        { id: 14, author: "Emma Rodriguez", avatar: "https://picsum.photos/seed/emma/30", content: "Congrats! Storytelling campaigns always work best for me 🎯", time: "9h ago" },
        { id: 15, author: "Carlos Mendoza", avatar: "https://picsum.photos/seed/carlos/30", content: "Love seeing successful campaigns! What's the conversion rate?", time: "8h ago" }
      ],
      liked: false,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 6,
      author: "Mike Johnson",
      avatar: "https://picsum.photos/seed/mike/50",
      time: "12 hours ago",
      content: "Early morning workout complete! 💪 Nothing beats starting the day with some cardio and weights. Fitness isn't just about looking good - it's about feeling strong and capable. What's your go-to workout routine?",
      likes: 112,
      comments: [
        { id: 16, author: "Sophie Anderson", avatar: "https://picsum.photos/seed/sophie/30", content: "Morning workouts are the best! Keeps me energized all day 🌅", time: "11h ago" },
        { id: 17, author: "David Kim", avatar: "https://picsum.photos/seed/david/30", content: "Respect! What's your protein source after workouts?", time: "10h ago" }
      ],
      liked: true,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 7,
      author: "Anna Petrov",
      avatar: "https://picsum.photos/seed/anna/50",
      time: "14 hours ago",
      content: "Contributed to an amazing open source project today! 🖥️ The power of collaborative coding is incredible. Every contribution, no matter how small, makes a difference. What's your favorite open source project?",
      likes: 95,
      comments: [
        { id: 18, author: "Emma Rodriguez", avatar: "https://picsum.photos/seed/emma/30", content: "Love seeing women in tech contributing! Which project?", time: "13h ago" },
        { id: 19, author: "Lisa Thompson", avatar: "https://picsum.photos/seed/lisa/30", content: "Open source is the future! Keep up the great work 💻", time: "12h ago" }
      ],
      liked: false,
      image: null
    },
    {
      id: 8,
      author: "David Lee",
      avatar: "https://picsum.photos/seed/david2/50",
      time: "16 hours ago",
      content: "Captured this stunning sunset in the mountains yesterday! 📸 Travel photography reminds me why I love what I do. Every location has its own unique beauty. What's your dream travel destination?",
      likes: 203,
      comments: [
        { id: 20, author: "Sophie Anderson", avatar: "https://picsum.photos/seed/sophie/30", content: "Absolutely breathtaking! Where was this taken? 🏔️", time: "15h ago" },
        { id: 21, author: "Mike Johnson", avatar: "https://picsum.photos/seed/mike/30", content: "Incredible shot! The colors are perfect 🌅", time: "14h ago" }
      ],
      liked: true,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState('')

  const handleLogin = () => {
    if (loginEmail.toLowerCase().includes('marciliobbarboza') && loginPassword.toLowerCase().includes('marciliobbarboza')) {
      setIsLoggedIn(true)
      setCurrentUser({
        username: 'marciliobbarboza',
        name: 'Marcilio Barboza',
        avatar: 'https://picsum.photos/seed/marcilio/50',
        email: 'marciliobbarboza@gmail.com',
        bio: 'Entrepreneur and social media enthusiast',
        address: '123 Main St, Palo Alto, CA',
        phone: '+1 (555) 123-4567',
        city: 'Palo Alto',
        groups: ['Tech Innovators', 'Startup Founders', 'Social Media Pioneers'],
        maritalStatus: 'Married'
      })
      setShowLogin(false)
      setLoginEmail('')
      setLoginPassword('')
    } else {
      alert('Invalid credentials. Please use marciliobbarboza for both email and password.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setEditingPost(null)
    setEditingComment(null)
  }

  const handleEditPost = (postId, content) => {
    setEditingPost(postId)
    setEditContent(content)
  }

  const handleSavePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, content: editContent } : post
    ))
    setEditingPost(null)
    setEditContent('')
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setEditingComment(null)
    setEditContent('')
  }

  const handleEditComment = (postId, commentId, content) => {
    setEditingComment({ postId, commentId })
    setEditContent(content)
  }

  const handleSaveComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId ? { ...comment, content: editContent } : comment
            )
          }
        : post
    ))
    setEditingComment(null)
    setEditContent('')
  }

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
        avatar: "https://picsum.photos/seed/you/50",
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
        avatar: "https://picsum.photos/seed/you/30",
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

  const handleViewProfile = (authorName) => {
    const user = users.find(u => u.name === authorName)
    if (user) {
      setSelectedUser(user)
      setCurrentView('profile')
    }
  }

  const handleJoinGroup = (groupId) => {
    setGroups(groups.map(group =>
      group.id === groupId ? { ...group, joined: !group.joined } : group
    ))
  }

  const handleOpenChat = (friendName) => {
    const friend = users.find(u => u.name === friendName)
    if (friend) {
      setSelectedFriend(friend)
      setChatMessages([
        { id: 1, sender: friend.name, text: `Hi ${currentUser.name}! How are you?`, time: '10:30 AM' },
        { id: 2, sender: currentUser.name, text: 'Hey! I\'m good, thanks. How about you?', time: '10:32 AM' },
        { id: 3, sender: friend.name, text: 'Doing great! Just working on some projects.', time: '10:33 AM' }
      ])
      setShowChat(true)
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: currentUser.name,
        text: newMessage,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
          }
        : post
    ))
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoggedIn(false)
      setCurrentUser(null)
      setUsers(users.filter(u => u.username !== currentUser.username))
    }
  }

  if (!isLoggedIn) {
  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-logo">
          <div className="logo-icon-large">🌐</div>
          <h1 className="logo-text">Sociallobby</h1>
        </div>
        <h2>Login to Sociallobby</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="login-input"
          />
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="socialobby-container">
      {/* Header */}
      <header className="socialobby-header">
        <div className="header-content">
          <h1 className="socialobby-logo" onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>
            <span className="logo-icon">🌐</span>
            Sociallobby
          </h1>
          <div className="header-actions">
            {currentView === 'profile' && (
              <button className="header-btn" onClick={() => setCurrentView('feed')}>← Back to Feed</button>
            )}
            {isLoggedIn ? (
              <>
                <button className="header-btn" onClick={() => { setSelectedUser(currentUser); setCurrentView('profile'); }}>👤 Profile</button>
                <span className="user-info">
                  <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar" />
                  {currentUser.name}
                </span>
                <button className="header-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className="header-btn" onClick={() => setShowLogin(true)}>Login</button>
            )}
            <button className="header-btn">⚙️ Settings</button>
            <button className="header-btn" onClick={() => setShowNotifications(true)}>🔔 Notifications</button>
          </div>
        </div>
      </header>

      {currentView === 'feed' ? (
        <div className="socialobby-main">
        {/* Sidebar */}
        <aside className="socialobby-sidebar">
          <div className="sidebar-section navigation-section">
            <h3>Navigation</h3>
            <ul>
              <li onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>🏠 Feed</li>
              <li onClick={() => setCurrentView('friends')} style={{cursor: 'pointer'}}>👥 Friends</li>
              <li onClick={() => setCurrentView('messages')} style={{cursor: 'pointer'}}>💬 Messages</li>
              <li onClick={() => setCurrentView('photos')} style={{cursor: 'pointer'}}>📷 Photos</li>
              <li onClick={() => setCurrentView('events')} style={{cursor: 'pointer'}}>📅 Events</li>
              <li onClick={() => setShowGroups(true)} style={{cursor: 'pointer'}}>👪 Groups</li>
              <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>📰 Pages</li>
            </ul>
          </div>
          <div className="sidebar-section your-shortcuts">
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
          {/* Stories */}
          <div className="stories-section">
            <div className="stories-container">
              <div className="story-item add-story">
                <div className="story-avatar">
                  <img src="https://picsum.photos/seed/you/50" alt="You" />
                  <div className="add-icon">+</div>
                </div>
                <span>Add Story</span>
              </div>
              {stories.map(story => (
                <div key={story.id} className="story-item">
                  <div className="story-avatar">
                    <img src={story.avatar} alt={story.author} />
                  </div>
                  <span>{story.author.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Create Post */}
          <div className="create-post">
            <div className="post-composer">
              <div className="composer-input">
                <img src="https://picsum.photos/seed/you/40" alt="You" className="user-avatar" />
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
              <Post
                key={post.id}
                post={post}
                isLoggedIn={isLoggedIn}
                handleEditPost={handleEditPost}
                handleDeletePost={handleDeletePost}
                editingPost={editingPost}
                editContent={editContent}
                setEditContent={setEditContent}
                handleSavePost={handleSavePost}
                handleCancelEdit={handleCancelEdit}
                handleLike={handleLike}
                toggleComments={toggleComments}
                showComments={showComments}
                newComment={newComment}
                setNewComment={setNewComment}
                handleComment={handleComment}
                handleViewProfile={handleViewProfile}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                editingComment={editingComment}
                handleSaveComment={handleSaveComment}
              />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="socialobby-right-sidebar">
          <div className="sidebar-section online-friends">
            <h3>Online Friends</h3>
            <div className="contacts-list">
              <div className="contact online" onClick={() => handleOpenChat('Emma Rodriguez')}>🟢 Emma Rodriguez</div>
              <div className="contact online" onClick={() => handleOpenChat('David Kim')}>🟢 David Kim</div>
              <div className="contact" onClick={() => handleOpenChat('Sophie Anderson')}>⚪ Sophie Anderson</div>
              <div className="contact online" onClick={() => handleOpenChat('Carlos Mendoza')}>🟢 Carlos Mendoza</div>
              <div className="contact" onClick={() => handleOpenChat('Alex Chen')}>⚪ Alex Chen</div>
              <div className="contact online" onClick={() => handleOpenChat('Lisa Thompson')}>🟢 Lisa Thompson</div>
            </div>
          </div>
          <div className="sidebar-section trending-topics">
            <h3>Trending on Google</h3>
            <div className="trending-list">
              <div className="trend-item">
                <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('AI Revolution')}`} target="_blank" className="trend-link">AI Revolution</a>
                <span className="trend-count">+150%</span>
              </div>
              <div className="trend-item">
                <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Sustainable Living')}`} target="_blank" className="trend-link">Sustainable Living</a>
                <span className="trend-count">+120%</span>
              </div>
              <div className="trend-item">
                <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Remote Work Tips')}`} target="_blank" className="trend-link">Remote Work Tips</a>
                <span className="trend-count">+95%</span>
              </div>
              <div className="trend-item">
                <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Mental Health Awareness')}`} target="_blank" className="trend-link">Mental Health Awareness</a>
                <span className="trend-count">+80%</span>
              </div>
              <div className="trend-item">
                <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Electric Vehicles')}`} target="_blank" className="trend-link">Electric Vehicles</a>
                <span className="trend-count">+75%</span>
              </div>
            </div>
          </div>
        </aside>
        </div>
      ) : currentView === 'friends' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Friends</h2>
            <div className="friends-list">
              {users.map(user => (
                <div key={user.username} className="friend-item">
                  <img src={user.avatar} alt={user.name} className="friend-avatar" />
                  <div className="friend-info">
                    <h3>{user.name}</h3>
                    <p>{user.bio}</p>
                  </div>
                  <button className="friend-btn" onClick={() => handleViewProfile(user.name)}>View Profile</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : currentView === 'messages' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Messages</h2>
            <div className="messages-list">
              {users.slice(0, 5).map(user => (
                <div key={user.username} className="message-item" onClick={() => handleOpenChat(user.name)}>
                  <img src={user.avatar} alt={user.name} className="message-avatar" />
                  <div className="message-info">
                    <h3>{user.name}</h3>
                    <p>Last message...</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : currentView === 'photos' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Photos</h2>
            <div className="photos-grid">
              {posts.filter(p => p.image).map(post => (
                <img key={post.id} src={post.image} alt="Post" className="photo-item" />
              ))}
            </div>
          </main>
        </div>
      ) : currentView === 'events' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Events</h2>
            <div className="events-list">
              <div className="event-item">
                <h3>Tech Conference 2024</h3>
                <p>January 15, 2024 - San Francisco</p>
                <button className="event-btn">Attend</button>
              </div>
              <div className="event-item">
                <h3>Food Festival</h3>
                <p>February 20, 2024 - New York</p>
                <button className="event-btn">Attend</button>
              </div>
            </div>
          </main>
        </div>
      ) : currentView === 'pages' ? (
        <div className="socialobby-main">
          <main className="socialobby-content">
            <h2>Pages</h2>
            <div className="pages-list">
              <div className="page-item">
                <h3>React Developers</h3>
                <p>Community for React enthusiasts</p>
                <button className="page-btn">Like</button>
              </div>
              <div className="page-item">
                <h3>Healthy Living</h3>
                <p>Tips for a healthy lifestyle</p>
                <button className="page-btn">Like</button>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="profile-page">
          {selectedUser && (
            <>
              <div className="profile-cover" style={{backgroundImage: `url(${selectedUser.coverPhoto})`}}>
                <div className="profile-avatar-large">
                  <img src={selectedUser.avatar} alt={selectedUser.name} />
                </div>
              </div>
              <div className="profile-info">
                <h2>{selectedUser.name}</h2>
                <p>@{selectedUser.username}</p>
                <p>{selectedUser.bio}</p>
                <div className="profile-details">
                  <div className="detail-row">
                    <strong>Birthday:</strong> {selectedUser.birthday}
                  </div>
                  <div className="detail-row">
                    <strong>Profession:</strong> {selectedUser.profession}
                  </div>
                  <div className="detail-row">
                    <strong>Location:</strong> {selectedUser.location}
                  </div>
                  <div className="detail-row">
                    <strong>Education:</strong> {selectedUser.education}
                  </div>
                  <div className="detail-row">
                    <strong>Work:</strong> {selectedUser.work}
                  </div>
                  <div className="detail-row">
                    <strong>Relationship:</strong> {selectedUser.relationship}
                  </div>
                  <div className="detail-row">
                    <strong>Phone:</strong> {selectedUser.phone}
                  </div>
                  <div className="detail-row">
                    <strong>Address:</strong> {selectedUser.address}
                  </div>
                  <div className="detail-row">
                    <strong>City:</strong> {selectedUser.city}
                  </div>
                  <div className="detail-row">
                    <strong>Groups:</strong> {selectedUser.groups.join(', ')}
                  </div>
                  <div className="detail-row">
                    <strong>Joined:</strong> {selectedUser.joined}
                  </div>
                </div>
              </div>
              <div className="profile-posts">
                <h3>Posts</h3>
                {posts.filter(post => post.author === selectedUser.name).map(post => (
                  <article key={post.id} className="post">
                    <div className="post-content">
                      <p>{post.content}</p>
                      {post.image && <img src={post.image} alt="Post" className="post-image-img" />}
                    </div>
                    <div className="post-stats">
                      <span>{post.likes} likes</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="modal-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="modal-input"
            />
            <button className="modal-btn" onClick={handleLogin}>Login</button>
            <button className="modal-btn cancel" onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && currentUser && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Profile</h2>
            <div className="profile-header">
              <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
              <div>
                <h3>{currentUser.name}</h3>
                <p>@{currentUser.username}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Bio:</strong> {currentUser.bio}</p>
              <p><strong>Address:</strong> {currentUser.address}</p>
              <p><strong>Phone:</strong> {currentUser.phone}</p>
              <p><strong>City:</strong> {currentUser.city}</p>
              <p><strong>Marital Status:</strong> {currentUser.maritalStatus}</p>
              <p><strong>Groups:</strong> {currentUser.groups.join(', ')}</p>
            </div>
            <div className="profile-actions">
              <button className="modal-btn" onClick={() => setShowProfile(false)}>Close</button>
              <button className="modal-btn delete" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
        </div>
      )}

      {/* Other Profile Modal */}
      {showOtherProfile && otherUser && (
        <div className="modal-overlay" onClick={() => setShowOtherProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Profile</h2>
            <div className="profile-header">
              <img src={otherUser.avatar} alt={otherUser.name} className="profile-avatar" />
              <div>
                <h3>{otherUser.name}</h3>
                <p>@{otherUser.username}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Email:</strong> {otherUser.email}</p>
              <p><strong>Bio:</strong> {otherUser.bio}</p>
              <p><strong>Address:</strong> {otherUser.address}</p>
              <p><strong>Phone:</strong> {otherUser.phone}</p>
              <p><strong>City:</strong> {otherUser.city}</p>
              <p><strong>Marital Status:</strong> {otherUser.maritalStatus}</p>
              <p><strong>Groups:</strong> {otherUser.groups.join(', ')}</p>
            </div>
            <button className="modal-btn" onClick={() => setShowOtherProfile(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
          <div className="modal notifications-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Notifications</h2>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={() => setShowNotifications(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Groups Modal */}
      {showGroups && (
        <div className="modal-overlay" onClick={() => setShowGroups(false)}>
          <div className="modal groups-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Groups</h2>
            <div className="groups-list">
              {groups.map(group => (
                <div key={group.id} className="group-item">
                  <img src={group.avatar} alt={group.name} className="group-avatar" />
                  <div className="group-info">
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <div className="group-stats">
                      <span>{group.members} members</span>
                      <span>{group.posts} posts</span>
                    </div>
                  </div>
                  <button
                    className={`join-btn ${group.joined ? 'joined' : ''}`}
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.joined ? 'Leave' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={() => setShowGroups(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && selectedFriend && (
        <div className="modal-overlay" onClick={() => setShowChat(false)}>
          <div className="modal chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <img src={selectedFriend.avatar} alt={selectedFriend.name} className="chat-avatar" />
              <h3>{selectedFriend.name}</h3>
              <span className="online-status">🟢 Online</span>
            </div>
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`message ${message.sender === currentUser.name ? 'sent' : 'received'}`}>
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="message-input"
              />
              <button className="send-btn" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App