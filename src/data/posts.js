export const posts = [
    {
      id: 1,
      author: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "2 hours ago",
      content: "Just launched my first React app! 🚀 The journey from idea to deployment is incredible. Grateful for the amazing developer community that helped me along the way. What's your biggest coding achievement this year?",
      likes: ["user2", "user3", "user4"],
      comments: [
        { id: 1, author: "Alex Chen", avatar: "https://picsum.photos/seed/alex/30", content: "Congrats! That's awesome! 🎉", time: "1h ago", authorId: "user9" },
        { id: 2, author: "Maria Garcia", avatar: "https://picsum.photos/seed/maria/30", content: "So proud of you! What's next?", time: "45m ago", authorId: "user10" },
        { id: 10, author: "John Doe", avatar: "https://picsum.photos/seed/john/30", content: "Amazing work! Keep it up!", time: "30m ago", authorId: "user11" }
      ],
      liked: false,
      image: null,
      authorId: "user1"
    },
    {
      id: 2,
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "4 hours ago",
      content: "Made homemade pizza from scratch tonight! 🍕 Nothing beats the smell of fresh dough baking. The secret is using high-quality olive oil and fresh basil. Recipe in the comments if anyone wants it!",
      likes: ["user1", "user5", "user6"],
      comments: [
        { id: 3, author: "Lisa Park", avatar: "https://picsum.photos/seed/lisa/30", content: "That looks amazing! Please share the recipe 🙏", time: "3h ago", authorId: "user12" },
        { id: 4, author: "Tom Wilson", avatar: "https://picsum.photos/seed/tom/30", content: "Homemade pizza is the best! What's your favorite topping combo?", time: "2h ago", authorId: "user13" },
        { id: 5, author: "David Kim", avatar: "https://picsum.photos/seed/david/30", content: "Sure! Thin crust, san marzano tomatoes, fresh mozzarella, and lots of basil! 🌿", time: "2h ago", authorId: "user2" },
        { id: 11, author: "Anna Smith", avatar: "https://picsum.photos/seed/anna/30", content: "I need to try this recipe!", time: "1h ago", authorId: "user14" }
      ],
      liked: true,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      authorId: "user2"
    },
    {
      id: 3,
      author: "Sophie Anderson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "6 hours ago",
      content: "Morning walk in the park was exactly what I needed today. 🌳 Sometimes you just need to disconnect from screens and reconnect with nature. The birds were singing, flowers are blooming, and the air smelled fresh. How do you recharge?",
      likes: [],
      comments: [
        { id: 6, author: "James Mitchell", avatar: "https://picsum.photos/seed/james/30", content: "Love this! Nature walks are so therapeutic. Where's your favorite park?", time: "5h ago", authorId: "user15" },
        { id: 7, author: "Sophie Anderson", avatar: "https://picsum.photos/seed/sophie/30", content: "Riverside Park! It's peaceful and has the best walking trails 🌿", time: "4h ago", authorId: "user3" },
        { id: 12, author: "Mike Johnson", avatar: "https://picsum.photos/seed/mike/30", content: "Nature is the best medicine!", time: "3h ago", authorId: "user6" }
      ],
      liked: false,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      authorId: "user3"
    },
    {
      id: 4,
      author: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
      time: "8 hours ago",
      content: "Proud of my nursing team today. We had a challenging shift but everyone showed up with compassion and skill. Healthcare workers are the real heroes. 💙 To all the nurses, doctors, and staff out there - you're appreciated more than you know.",
      likes: [],
      comments: [
        { id: 8, author: "Rachel Green", avatar: "https://picsum.photos/seed/rachel/30", content: "Thank you for your service! 🙏 Stay safe out there", time: "7h ago", authorId: "user16" },
        { id: 9, author: "Dr. Sarah Lee", avatar: "https://picsum.photos/seed/sarah/30", content: "Couldn't agree more. Teamwork makes the dream work! 💪", time: "6h ago", authorId: "user17" },
        { id: 13, author: "Paul Brown", avatar: "https://picsum.photos/seed/paul/30", content: "Heroes indeed! Thank you all.", time: "5h ago", authorId: "user18" }
      ],
      liked: true,
      image: null,
      authorId: "user4"
    },
    {
      id: 5,
      author: "Lisa Thompson",
      avatar: "https://picsum.photos/seed/lisa/50",
      time: "10 hours ago",
      content: "Just launched my new marketing campaign! 📈 Spent weeks crafting the perfect strategy, and the results are already showing. Digital marketing is such an exciting field - always evolving, always challenging. What's your favorite marketing tactic?",
      likes: [],
      comments: [
        { id: 14, author: "Emma Rodriguez", avatar: "https://picsum.photos/seed/emma/30", content: "Congrats! Storytelling campaigns always work best for me 🎯", time: "9h ago", authorId: "user1" },
        { id: 15, author: "Carlos Mendoza", avatar: "https://picsum.photos/seed/carlos/30", content: "Love seeing successful campaigns! What's the conversion rate?", time: "8h ago", authorId: "user4" }
      ],
      liked: false,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      authorId: "user5"
    },
    {
      id: 6,
      author: "Mike Johnson",
      avatar: "https://picsum.photos/seed/mike/50",
      time: "12 hours ago",
      content: "Early morning workout complete! 💪 Nothing beats starting the day with some cardio and weights. Fitness isn't just about looking good - it's about feeling strong and capable. What's your go-to workout routine?",
      likes: [],
      comments: [
        { id: 16, author: "Sophie Anderson", avatar: "https://picsum.photos/seed/sophie/30", content: "Morning workouts are the best! Keeps me energized all day 🌅", time: "11h ago", authorId: "user3" },
        { id: 17, author: "David Kim", avatar: "https://picsum.photos/seed/david/30", content: "Respect! What's your protein source after workouts?", time: "10h ago", authorId: "user2" }
      ],
      liked: true,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      authorId: "user6"
    },
    {
      id: 7,
      author: "Anna Petrov",
      avatar: "https://picsum.photos/seed/anna/50",
      time: "14 hours ago",
      content: "Contributed to an amazing open source project today! 🖥️ The power of collaborative coding is incredible. Every contribution, no matter how small, makes a difference. What's your favorite open source project?",
      likes: [],
      comments: [
        { id: 18, author: "Emma Rodriguez", avatar: "https://picsum.photos/seed/emma/30", content: "Love seeing women in tech contributing! Which project?", time: "13h ago", authorId: "user1" },
        { id: 19, author: "Lisa Thompson", avatar: "https://picsum.photos/seed/lisa/30", content: "Open source is the future! Keep up the great work 💻", time: "12h ago", authorId: "user5" }
      ],
      liked: false,
      image: null,
      authorId: "user7"
    },
    {
      id: 8,
      author: "David Lee",
      avatar: "https://picsum.photos/seed/david2/50",
      time: "16 hours ago",
      content: "Captured this stunning sunset in the mountains yesterday! 📸 Travel photography reminds me why I love what I do. Every location has its own unique beauty. What's your dream travel destination?",
      likes: [],
      comments: [
        { id: 20, author: "Sophie Anderson", avatar: "https://picsum.photos/seed/sophie/30", content: "Absolutely breathtaking! Where was this taken? 🏔️", time: "15h ago", authorId: "user3" },
        { id: 21, author: "Mike Johnson", avatar: "https://picsum.photos/seed/mike/30", content: "Incredible shot! The colors are perfect 🌅", time: "14h ago", authorId: "user6" }
      ],
      liked: true,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      authorId: "user8"
    }
  ];