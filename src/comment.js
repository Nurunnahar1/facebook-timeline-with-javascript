const addComment = (postId, commentText) => {
  const posts = JSON.parse(localStorage.getItem("posts"));

  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    if (!posts[postIndex].comments) {
      posts[postIndex].comments = [];
    }

    posts[postIndex].comments.push({
      text: commentText,
      timestamp: Date.now(),
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    getAllPosts();
  }
};

window.addEventListener("load", () => {
  getAllPosts();
});

// Display comments for posts when the page loads
window.addEventListener("load", () => {
  const posts = JSON.parse(localStorage.getItem("posts"));
  if (posts) {
    posts.forEach((post) => {
      if (post.comments) {
        displayComments(post.id);
      }
    });
  }
});

const displayComments = (postId) => {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const post = posts.find((post) => post.id === postId);

  if (post && post.comments) {
    const commentsContainer = document.querySelector(`#comments_${postId}`);
    commentsContainer.innerHTML = ""; // Clear existing comments

    post.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment-item");
      commentElement.innerHTML = `
        <p class="comment-text">${comment.text}</p>
        <p class="comment-timestamp">${formatTimestamp(comment.timestamp)}</p>
      `;
      commentsContainer.appendChild(commentElement);
    });
  }
};


// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjust as needed
};