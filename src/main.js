const post_form = document.getElementById("post-create-form");
const post_area = document.querySelector(".post-list");
const post_create_btn = document.getElementById("post-create-btn");
const msg = document.querySelector(".msg");

const getAllPosts = () => {
  const posts = JSON.parse(localStorage.getItem("posts"));

  //post loop
  if (posts) {
    let posts_data = "";

    posts.reverse().forEach((item, index) => {
      posts_data += `
   <div class="post-head">
        <div class="post-head-up d-flex justify-content-between align-items-center mb-3">
            <div class="post-profile d-flex align-items-center">
                <img src="${item.photo}" alt="" class="post-profile-photo me-3">
                <span class="post-photo-text">${item.name}</span>
                <div class="upload-time ms-3">
                    <span>${timeAgo(item.created_at)}</span>
                    <i class="feather-globe"></i>
                </div>
            </div>
            <div class="post-menu gap-1">
                <button><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="daletePost('${item.id}')"><i class="fa-solid fa-delete-left"></i></button>
            </div>
        </div>
        <div class="post-caption mb-3">
            <span class="content">${item.content}</span>
        </div>
    </div>
    <div class="post-upload my-2px">
        <img src="${item.post_photo}" alt="" class="post-upload-img img-fluid">
    </div>


               
            `;
    });
    post_area.innerHTML = posts_data;
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
    });
    localStorage.setItem("posts", JSON.stringify(isData));
  }
  event.target.reset();
  post_create_btn.click();
  getAllPosts();
};
