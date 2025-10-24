export const mapFetchedPosts = (data, currentUser) => {
  return data.map(post => ({
    ...post,
    id: post._id,
    avatar: post.author.avatar,
    author: post.author.fullName,
    authorObject: post.author,
    time: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'now',
    content: post.content,
    likes: post.likes || [],
    reaction: null,
    comments: post.comments || [], // Include comments if available
    isLikedByCurrentUser: currentUser ? (post.likes || []).includes(currentUser._id) : false,
    image: post.featuredImage
  })).sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
};
