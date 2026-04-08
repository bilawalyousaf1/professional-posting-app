let user_string = localStorage.getItem("currentUsers");
let string_data = JSON.parse(user_string);

if (string_data) {
  window.location.href = "../posts/index.html";
}

document.querySelector(".sign-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Email Required",
      text: "Please Enter Your Email",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (!email.includes("@")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please Enter Valid Email",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (!password) {
    Swal.fire({
      icon: "error",
      title: "Password Required",
      text: "Please Enter Your Password",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  let string_data = localStorage.getItem("user");
  let all_users = JSON.parse(string_data) || [];

  let existing_user = all_users.find((user) => {
    return user.email.toLowerCase() === email.toLowerCase();
  });

  if (!existing_user) {
    Swal.fire({
      icon: "error",
      title: "Account Not Found",
      text: "No account matched this email. Please check or sign up.",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  if (existing_user.password !== password) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid password. Please try again or reset it.",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#fff",
      confirmButtonColor: "#00f2fe",
    });
    return;
  }

  localStorage.setItem("currentUsers", JSON.stringify(existing_user));

  Swal.fire({
    icon: "success",
    title: "Welcome Back, " + (existing_user.fullName || "User") + "!",
    text: "Login Successful",
    background: "rgba(15, 23, 42, 0.95)",
    color: "#fff",
    showConfirmButton: false,
    timer: 2000,
  }).then(() => {
    window.location.href = "../posts/index.html";
  });

  document.querySelector(".sign-form").reset();
});

document
  .getElementById("forgotPassword")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your email address",
      inputPlaceholder: "email@example.com",
      showCancelButton: true,
      confirmButtonColor: "#00f2fe",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#fff",
    });

    if (email) {
      let all_users = JSON.parse(localStorage.getItem("user")) || [];
      let userIndex = all_users.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (userIndex === -1) {
        Swal.fire({
          icon: "error",
          title: "Not Found",
          text: "User with this email not found",
          background: "rgba(15, 23, 42, 0.95)",
          color: "#fff",
        });
        return;
      }

      const { value: newPassword } = await Swal.fire({
        title: "Enter New Password",
        input: "password",
        inputLabel: "New Password",
        inputPlaceholder: "At least 8 characters with numbers",
        showCancelButton: true,
        confirmButtonColor: "#00f2fe",
        background: "rgba(15, 23, 42, 0.95)",
        color: "#fff",
      });

      if (newPassword) {
        const hasNumber = /\d/.test(newPassword);
        if (newPassword.length < 8 || !hasNumber) {
          Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Password must be at least 8 characters and contain at least one number",
            background: "rgba(15, 23, 42, 0.95)",
            color: "#fff",
          });
          return;
        }

        all_users[userIndex].password = newPassword;
        localStorage.setItem("user", JSON.stringify(all_users));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password reset successfully! You can now log in.",
          background: "rgba(15, 23, 42, 0.95)",
          color: "#fff",
        });
      }
    }
  });

const passwordInput = document.querySelector("#password");
const showPass = document.querySelector(".show-pass");
const hidePass = document.querySelector(".hide-pass");

showPass.addEventListener("click", () => {
  passwordInput.type = "text";
  showPass.style.display = "none";
  hidePass.style.display = "block";
});

hidePass.addEventListener("click", () => {
  passwordInput.type = "password";
  showPass.style.display = "block";
  hidePass.style.display = "none";
});
