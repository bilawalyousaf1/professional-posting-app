let isEditing = false;
let editingIndex = null;
let user_string = localStorage.getItem("currentUsers");
let string_data = JSON.parse(user_string);

if (!string_data) {
  window.location.href = "../Login/index.html";
}

window.logout = function () {
  localStorage.removeItem("currentUsers");
  window.location.href = "../Login/index.html";
};

const navBrand = document.querySelector(".nav-brand");
if (navBrand) {
  navBrand.addEventListener("click", () => {
    window.location.reload();
  });
}

const displayName = string_data.fullName || string_data.email;
const userNameEl = document.querySelector(".user-name");
if (userNameEl) {
  userNameEl.innerText = displayName;
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const description = document.querySelector("#desc").value.trim();

  let all_posts_string = localStorage.getItem("posts");
  let all_posts = JSON.parse(all_posts_string) || [];

  if (isEditing && editingIndex !== null) {
    all_posts[editingIndex] = {
      ...all_posts[editingIndex],
      title: title,
      description: description,
      editedAt: new Date().getTime(),
    };

    Swal.fire({
      icon: "success",
      title: "Post Transformed!",
      text: "Your thoughts have been updated successfully.",
      background:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#fff"
          : "rgba(15, 23, 42, 0.95)",
      color:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#000"
          : "#fff",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    let new_posts = {
      title: title,
      description: description,
      Time: new Date().getTime(),
      createdBy: displayName,
      creatorEmail: string_data.email,
      likes: [],
    };
    all_posts = [new_posts, ...all_posts];

    Swal.fire({
      icon: "success",
      title: "Post Published!",
      text: "Your new post is now live!",
      background:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#fff"
          : "rgba(15, 23, 42, 0.95)",
      color:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#000"
          : "#fff",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  localStorage.setItem("posts", JSON.stringify(all_posts));
  e.target.reset();
  isEditing = false;
  editingIndex = null;

  const submitBtn = document.querySelector("form button");
  if (submitBtn) submitBtn.innerHTML = "Create Post";

  render_posts();
});

window.edit_post = function (postsIndex) {
  let all_posts = JSON.parse(localStorage.getItem("posts"));
  const postToEdit = all_posts[postsIndex];

  if (postToEdit.creatorEmail !== string_data.email) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You can only edit your own posts!",
      background:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#fff"
          : "rgba(15, 23, 42, 0.95)",
      color:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#000"
          : "#fff",
    });
    return;
  }

  document.querySelector("#title").value = postToEdit.title;
  document.querySelector("#desc").value = postToEdit.description;

  isEditing = true;
  editingIndex = postsIndex;

  const submitBtn = document.querySelector("form button");
  if (submitBtn) submitBtn.innerHTML = "Update Post";

  document
    .querySelector("form")
    .scrollIntoView({ behavior: "smooth", block: "center" });
};

document.querySelector("#desc").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.querySelector("form").requestSubmit();
  }
});

let likeDebounceTimer = null;

window.like_post = function (postsIndex) {
  if (likeDebounceTimer) return;

  likeDebounceTimer = setTimeout(() => {
    let all_posts = JSON.parse(localStorage.getItem("posts")) || [];
    let currentPosts = all_posts[postsIndex];

    let useremail = currentPosts.likes.find((email) => {
      return email === string_data.email;
    });

    if (useremail) {
      let updatedLikes = currentPosts.likes.filter((email) => {
        return email !== string_data.email;
      });

      all_posts[postsIndex].likes = updatedLikes;
      localStorage.setItem("posts", JSON.stringify(all_posts));
    } else {
      currentPosts.likes.unshift(string_data.email);
      all_posts[postsIndex] = currentPosts;
      localStorage.setItem("posts", JSON.stringify(all_posts));
    }
    render_posts();
    likeDebounceTimer = null;
  }, 300);
};

window.delete_post = function (postsIndex) {
  let all_posts = JSON.parse(localStorage.getItem("posts"));

  if (all_posts[postsIndex].creatorEmail !== string_data.email) {
    Swal.fire({
      icon: "error",
      title: "Action Forbidden",
      text: "You can only delete your own posts!",
      background:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#fff"
          : "rgba(15, 23, 42, 0.95)",
      color:
        document.documentElement.getAttribute("data-theme") === "light"
          ? "#000"
          : "#fff",
    });
    return;
  }

  Swal.fire({
    title: "Delete post?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#334155",
    confirmButtonText: "Yes, delete it!",
    background:
      document.documentElement.getAttribute("data-theme") === "light"
        ? "#fff"
        : "rgba(15, 23, 42, 0.95)",
    color:
      document.documentElement.getAttribute("data-theme") === "light"
        ? "#000"
        : "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      all_posts.splice(postsIndex, 1);
      localStorage.setItem("posts", JSON.stringify(all_posts));
      render_posts();
    }
  });
};

function render_posts() {
  let all_posts_string = localStorage.getItem("posts");
  let all_posts = JSON.parse(all_posts_string) || [];

  const output = document.querySelector("#output");
  if (!output) return;
  output.innerHTML = "";

  if (all_posts.length === 0) {
    output.innerHTML = `
      <div style="text-align: center; padding: 50px; color: var(--text-secondary); opacity: 0.7;">
        <i class="bi bi-chat-dots" style="font-size: 3rem; display: block; margin-bottom: 20px;"></i>
        <h2 style="font-weight: 500;">No posts yet. Be the first to share something!</h2>
      </div>
    `;
    return;
  }

  all_posts.forEach((posts, index) => {
    posts.likes = posts.likes || [];
    let useremail = posts.likes.find((email) => email === string_data.email);

    const postDate = moment(posts.Time).fromNow();
    const isOwner = posts.creatorEmail === string_data.email;

    output.innerHTML += `
      <div class="single-post">
        <span class="post-time">${postDate}</span>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <div style="width: 35px; height: 35px; background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 800; font-size: 0.9rem;">
            ${posts.createdBy.charAt(0).toUpperCase()}
          </div>
          <h2 style="font-size: 0.95rem; opacity: 0.9; font-weight: 600; margin-bottom: 0;">${posts.createdBy}</h2>
        </div>
        <h2 class="post-title-content">${posts.title}</h2>
        <h4 class="post-desc-content">${posts.description}</h4>
        
        <div class="post-footer">
          <div class="post-actions">
            <button class="btn-icon like-btn ${useremail ? "liked" : ""}" onclick="like_post(${index})" title="Like">
              <i class="bi bi-hand-thumbs-up${useremail ? "-fill" : ""}"></i> 
              <span class="like-count">${posts.likes.length}</span>
            </button>
            ${
              isOwner
                ? `
              <button class="btn-icon edit-btn" onclick="edit_post(${index})" title="Edit">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn-icon delete-btn" onclick="delete_post(${index})" title="Delete">
                <i class="bi bi-trash"></i>
              </button>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  });
}

window.render_posts = render_posts;
render_posts();
