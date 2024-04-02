const post_form = document.getElementById("post-create-form");
const post_area = document.querySelector(".friends_post");
const post_create_btn = document.getElementById("post-create-btn");
const msg = document.querySelector(".msg");

const getAllPosts = () => {
  const posts = JSON.parse(localStorage.getItem("posts"));

  //post loop
  if (posts) {
    let posts_data = "";

    posts.reverse().forEach((item, index) => {
      posts_data += ` 
                <div class="friend_post_top">

                    <div class="img_and_name">

                        <img src="${item.photo}">

                        <div class="friends_name">
                            <p class="friends_name">
                                ${item.name}
                            </p>
                            <p class="time">${timeAgo(
                              item.created_at
                            )}<i class="fa-solid fa-user-group"></i></p>
                        </div>


                    </div>

                    <div class="menu d-flex me-4 gap-1">

                        <!-- <i class="fa-solid fa-ellipsis"></i> -->
                        <button><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deletePost('${
                          item.id
                        }')"><i class="fa-solid fa-square-xmark"></i></button>

                    </div>

                </div>
                <p>${item.content}</p>
                <img src="${item.post_photo}">

                <div class="info">

                    <div class="emoji_img">
                        <img src="image/like.png">
                        <img src="image/haha.png">
                        <img src="image/heart.png">
                        <p>You, Charith Disanayaka and 25K others</p>
                    </div>

                    <div class="comment">
                        <p>421 Comments</p>
                        <p>1.3K Shares</p>
                    </div>

                </div>

                <hr>

                <div class="like">

                    <div class="like_icon">
                        <i class="fa-solid fa-thumbs-up activi"></i>
                        <p>Like</p>
                    </div>

                    <div class="like_icon">
                        <i class="fa-solid fa-message"></i>
                        <p>Comments</p>
                    </div>

                    <div class="like_icon">
                        <i class="fa-solid fa-share"></i>
                        <p>Share</p>
                    </div>

                </div>

                <hr>

                <div class="comment_warpper">

                    <img src="https://avatars.githubusercontent.com/u/111399644?s=48&v=4">
                    <div class="circle"></div>

                    <div class="comment_search">

                        <input type="text" placeholder="Write a comment">
                        <i class="fa-regular fa-face-smile"></i>
                        <i class="fa-solid fa-camera"></i>
                        <i class="fa-regular fa-note-sticky"></i>

                    </div>

                </div>
      `;
    });
    post_area.innerHTML = posts_data;
  }
};

//delete post
const deletePost = (id) => {
  // console.log(id);
  const conf = confirm("Are you sure ?");

  if (conf) {
    const posts = JSON.parse(localStorage.getItem("posts")); // get all posts
    const updatedPosts = posts.filter((data) => data.id !== id); //without the deleted posts
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); //send the updated posts to localStorage
    getAllPosts();
  }
};

getAllPosts();

post_form.onsubmit = (event) => {
  event.preventDefault();

  //get form data
  const form_data = new FormData(event.target);
  const { name, photo, content, post_photo } = Object.fromEntries(form_data);

  if (!name || !photo) {
    msg.innerHTML = createAlert("All fields are required");
  } else {
    // console.log(name, photo, content, post_photo);

    const oldData = localStorage.getItem("posts");

    let isData = [];

    if (oldData) {
      isData = JSON.parse(oldData);
    }
    isData.push({
      id: createID(),
      name,
      photo,
      content,
      post_photo,
      created_at: Date.now(),
      created_at: Date.now(),
    });
    localStorage.setItem("posts", JSON.stringify(isData));
  }
  event.target.reset();
  post_create_btn.click();
  getAllPosts();
};
