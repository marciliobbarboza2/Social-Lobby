// End-to-end verification script: register, login, comment CRUD, real-time messaging
// Run with: node backend/tests/final_flow.js
const fetch = global.fetch;
const { io } = require('socket.io-client');

const API = 'http://localhost:5000/api';

function logStep(name, ok, extra = {}) {
  console.log(JSON.stringify({ step: name, ok, ...extra }));
}

(async () => {
  try {
    const unique = Date.now();
    const userPayload = {
      username: `fbstyle_${unique}`,
      email: `fbstyle_${unique}@example.com`,
      password: 'Passw0rd!',
      firstName: 'FB',
      lastName: 'User'
    };
    // Register
    let res = await fetch(`${API}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userPayload)
    });
    const reg = await res.json();
    if (!reg.token) return logStep('register', false, { reg });
    logStep('register', true, { userId: reg.user?._id });

    // Login
    res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: userPayload.email, password: userPayload.password })
    });
    const login = await res.json();
    if (!login.token) return logStep('login', false, { login });
    const token = login.token;
    logStep('login', true);

    // Fetch posts
    res = await fetch(`${API}/posts?page=1&limit=1`);
    const postsData = await res.json();
    const firstPost = postsData.data && postsData.data[0];
    if (!firstPost) return logStep('fetch_posts', false, { postsData });
    logStep('fetch_posts', true, { postId: firstPost._id });

    // Create comment
    res = await fetch(`${API}/comments`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: 'Initial automated test comment', postId: firstPost._id })
    });
    const createdComment = await res.json();
    const commentId = createdComment.data?._id;
    if (!commentId) return logStep('create_comment', false, { createdComment });
    logStep('create_comment', true, { commentId });

    // Update comment
    res = await fetch(`${API}/comments/${commentId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: 'Edited automated test comment ✅' })
    });
    const updatedComment = await res.json();
    logStep('update_comment', !!updatedComment.data, { updatedContent: updatedComment.data?.content });

    // Delete comment
    res = await fetch(`${API}/comments/${commentId}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
    });
    const deleted = await res.json();
    logStep('delete_comment', deleted.success === true);

    // Real-time messaging test
    await new Promise((resolve) => {
      const received = [];
      const socketA = io('http://localhost:5000', { query: { token }, transports: ['websocket'] });
      const socketB = io('http://localhost:5000', { query: { token }, transports: ['websocket'] });
      let sent = false;
      const finish = () => {
        if (received.length >= 2) { // both sockets saw at least one message
          logStep('realtime_chat', true, { messagesSeen: received.length });
          socketA.disconnect(); socketB.disconnect();
          resolve();
        }
      };
      socketA.on('connect', () => {
        if (!sent) {
          socketA.emit('chatMessage', { text: 'Hello from A', test: true });
          sent = true;
        }
      });
      socketA.on('chatMessage', (m) => { received.push({ who: 'A', m }); finish(); });
      socketB.on('chatMessage', (m) => { received.push({ who: 'B', m }); finish(); });
      setTimeout(() => {
        if (received.length < 2) {
          logStep('realtime_chat', false, { received });
          socketA.disconnect(); socketB.disconnect();
          resolve();
        }
      }, 4000);
    });

    logStep('flow_complete', true);
  } catch (err) {
    logStep('fatal_error', false, { error: err.message, stack: err.stack });
  }
})();