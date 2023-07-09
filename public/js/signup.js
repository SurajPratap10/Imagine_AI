async function generateCaptcha(){
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";

  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    captcha += charset.charAt(randomIndex);
  }
 document.getElementById("captcha").innerText = captcha;
}

generateCaptcha();

async function checkCaptcha (){
  const captch = document.getElementById("captcha").innerText;
  const userCaptcha = document.querySelector("input[name='captcha']").value;
  console.log(captch + " " + userCaptcha)
  console.log(userCaptcha);
  if(captch === userCaptcha){
    document.getElementById("captchabtn").innerText = "Captcha Verified";
    document.getElementById("captchabtn").style.backgroundColor = "green";
    document.getElementById("submit").disabled = false;
    document.querySelector("#submit span").style.cursor = "pointer";
  }else{
    document.getElementById("captchabtn").innerText = " Invalid Captcha";
    document.getElementById("captchabtn").style.backgroundColor = "red";
    setTimeout(()=>{
    generateCaptcha();
    }, 2000)
  }
}

async function signup_submit(e) {
  e.preventDefault();
  const name_user = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name_user || !email || !password || !confirmPassword) {
    const toast = document.getElementById("errorToast");
    toast.textContent = "All fields are mandatory";
    toast.style.display = "block";

    // Hide the toast after 3 seconds
    return setTimeout(function () {
      toast.style.display = "none";
    }, 3000);
  }
  if (password != confirmPassword) {
    const toast = document.getElementById("errorToast");
    toast.textContent = "Password and Confirm password didn't match";
    toast.style.display = "block";

    return setTimeout(function () {
      toast.style.display = "none";
    }, 3000);
  }

  try {
    let response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name_user,
        email,
        password,
      }),
    });
    const response_obj = await response.json();
    if (response_obj?.error) {
      //some error exists
      const { error } = response_obj;
      const toast = document.getElementById("errorToast");
      toast.textContent = error;
      toast.style.display = "block";

      // Hide the toast after 3 seconds
      setTimeout(function () {
        toast.style.display = "none";
      }, 3000);
    } else {
      // Data is saved in DB..successfully registered
      const message = "Successfully Registered!!!";
      const toast = document.getElementById("successToast");
      toast.textContent = message;
      toast.style.display = "block";

      // Hide the toast after 3 seconds
      setTimeout(function () {
        toast.style.display = "none";
        window.location.href = "/generateImg";
      }, 3000);
    }
  } catch (error) {
    if (error) {
      return error;
    }
  }
}
if (window.location.pathname != "/contactUs") {
  const signup_submit_doc = document.querySelector(".btn-signup-submit");

  if (signup_submit_doc)
    signup_submit_doc.addEventListener("click", signup_submit);
}
