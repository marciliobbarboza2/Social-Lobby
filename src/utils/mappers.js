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
