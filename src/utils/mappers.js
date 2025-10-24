export const mapFetchedPosts = (data) => {
  return data.data.map(post => ({
    ...post,
    id: post._id,
    avatar: post.author.avatar,
    author: post.author.fullName,
    time: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'now',
    content: post.content,
    likes: post.likes,
    reaction: null,
    comments: [], // Comments not fetched in this endpoint
    liked: false,
    image: post.featuredImage
  })).sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
};
