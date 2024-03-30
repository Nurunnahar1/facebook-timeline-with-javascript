const post_form = document.getElementById("post-create-form");
const msg = document.querySelector(".msg");

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
          crated_at: Date.now()
      });
      localStorage.setItem("posts",JSON.stringify(isData));
  }
};
