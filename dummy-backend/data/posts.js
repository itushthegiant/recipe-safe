const fs = require('node:fs/promises');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile('posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

async function deletePost(id) {
  const posts = await getStoredPosts();
  const updatedPosts = posts.filter((p) => p.id !== id);
  storePosts(updatedPosts);
  return updatedPosts;
}

function storePosts(posts) {
  return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.deletePost = deletePost;
exports.storePosts = storePosts;