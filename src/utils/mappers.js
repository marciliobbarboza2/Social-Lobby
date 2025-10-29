export const mapFetchedPosts = (data, currentUser) => {
  return data.data.map(post => ({
    ...post,
    id: post._id,
    avatar: post.author.avatar,
    author: post.author.fullName,
    authorObject: post.author,
    authorId: post.author._id,
    time: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'now',
    content: post.content,
    likes: Array.isArray(post.likedBy) ? post.likedBy : [],
    reaction: null,
    comments: [], // Comments not fetched in this endpoint
    isLikedByCurrentUser: currentUser && post.likedBy ? post.likedBy.some(user => user._id === currentUser._id) : false,
    image: post.featuredImage
  })).sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
};

export const mapFetchedComments = (data) => {
  return data.data.map(comment => ({
    id: comment._id,
    author: comment.author.firstName && comment.author.lastName
      ? `${comment.author.firstName} ${comment.author.lastName}`
      : comment.author.username,
    avatar: comment.author.avatar || 'https://picsum.photos/seed/default/30',
    content: comment.content,
    time: comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'now',
    authorId: comment.author._id,
    authorObject: comment.author,
    likes: comment.likes || [],
    likedBy: comment.likedBy || []
  }));
};
