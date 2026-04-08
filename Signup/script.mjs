let user_string = localStorage.getItem("currentUsers");
let string_data = JSON.parse(user_string);

if (string_data) {
  window.location.href = "../posts/index.html";
}

document.querySelector(".sign-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.querySelector("#fullName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirm_password = document.querySelector("#confirm-password").value;

  if (!fullName) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Your Full Name",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Your Email",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (!email.includes("@")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please Enter a Valid Email Address",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (!password) {
    Swal.fire({
      icon: "error",
      title: "Missing Password",
      text: "Please Enter Your Password",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  const hasNumber = /\d/.test(password);
  if (password.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password must be at least 8 characters long",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }
  if (!hasNumber) {
    Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password must contain at least one number",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (password !== confirm_password) {
    Swal.fire({
      icon: "error",
      title: "Mismatch",
      text: "Passwords Do Not Match",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  let all_users_string = localStorage.getItem("user");
  let all_users = JSON.parse(all_users_string) || [];

  let existing_user = all_users.find((user) => {
    return user.email.toLowerCase() === email.toLowerCase();
  });

  if (existing_user) {
    Swal.fire({
      icon: "info",
      title: "Account Exists",
      text: "An account with this email already exists. Please log in instead",
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    }).then(() => {
      window.location.href = "../Login/index.html";
    });
    return;
  }

  let newUser = {
    fullName: fullName,
    email: email.toLowerCase(),
    password: password,
  };

  let updated_users = [newUser, ...all_users];
  localStorage.setItem("user", JSON.stringify(updated_users));

  Swal.fire({
    icon: "success",
    title: "Welcome, " + fullName + "!",
    text: "Account created successfully. Welcome aboard!",
    background: "rgba(15, 23, 42, 0.9)",
    color: "#fff",
    showConfirmButton: false,
    timer: 2500,
  }).then(() => {
    window.location.href = "../Login/index.html";
  });
});

const setupPasswordToggle = (inputSelector, showSelector, hideSelector) => {
  const input = document.querySelector(inputSelector);
  const showBtn = document.querySelector(showSelector);
  const hideBtn = document.querySelector(hideSelector);

  showBtn.addEventListener("click", () => {
    input.type = "text";
    showBtn.style.display = "none";
    hideBtn.style.display = "block";
  });

  hideBtn.addEventListener("click", () => {
    input.type = "password";
    showBtn.style.display = "block";
    hideBtn.style.display = "none";
  });
};

setupPasswordToggle("#password", ".show-pass1", ".hide-pass1");
setupPasswordToggle("#confirm-password", ".show-pass2", ".hide-pass2");
