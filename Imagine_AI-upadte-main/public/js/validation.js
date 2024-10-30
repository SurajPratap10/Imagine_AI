const emailRegex =
  /^\w+([\.-]?\w+)*@(gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
const phoneRegex = /^\d{10}$/;

const validate = {
  name: (value) => {
    return value.trim().length < 5 ? true : false;
  },
  email: (value) => {
    return emailRegex.test(value) ? false : true;
  },

  password: (value) => {
    return passwordRegex.test(value) ? false : true;
  },
  FirstName: (value) => {
    return value.trim().length < 3 ? true : false;
  },
  LastName: (value) => {
    return value.trim().length < 3 ? true : false;
  },
  PhoneNumber: (value) => {
    return phoneRegex.test(value) ? false : true;
  },
  feedback: (value) => {
    const words = value.trim().split(/\s+/).length;
    return words < 10 || words > 50 ? true : false;
  },
};

function handleChange(e) {
  // console.log(e.target.name);
  const error = validate[e.target.name](e.target.value);
  const errorMessage = document.getElementById(`${e.target.name}Error`);
  if (error) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
}

window.addEventListener("load", () => {
  // Contact form Submission validation
  const contactform = document.getElementById("contactform");
  contactform.addEventListener("submit", (e) => {
    e.preventDefault();
    let submitable = true;
    const error = [...document.getElementsByClassName("contactError")];
    console.log(error);
    error.forEach((elem) => {
      if (!elem.classList.contains("hidden")) {
        submitable = false;
        return;
      }
    });

    if (!submitable) {
      toastr["warning"]("Please provide valid input.", "Validation");
    } else {
      // Uncomment below line after implementaion of form submit handling
      // contactform.submit()

      // correctkk();
      toastr["success"]("Your Response Submitted.", "Thank you");

      // alert('all ok');

      showMessage("Your vaulable feedback is successfully submited.");

      function showMessage(message) {
        var messageBox = document.createElement("div");
        //  messageBox.textContent = message;

        messageBox.innerHTML = `
        <section class="container">

          <section class="sec__container">

            <!--==================== Social Share ====================-->
            <div class="share__box">
              <header>
                <h2>Thank you for valuable feedback</h2>
              </header>
              <div class="content" >
                <p>Follow us on socials</p>
                <div class="social__links">
                  <a href="#" class="social__link" data-attr="facebook"
                    data-link="https://www.facebook.com/share">
                    <i class="fa-brands fa-square-facebook"></i>
                  </a>
                  <a href="#" class="social__link" data-attr="twitter"
                    data-link="https://www.twitter.com/share">
                    <i class="fa-brands fa-square-twitter"></i>
                  </a>
                  <a href="#" class="social__link" data-attr="instagram"
                    data-link="https://www.instagram.com/share">
                    <i class="fa-brands fa-square-instagram"></i>
                  </a>
                  <a href="#" class="social__link" data-attr="whatsapp"
                    data-link="https://www.whatsapp.com/share">
                    <i class="fa-brands fa-square-whatsapp"></i>
                  </a>
                  <a href="#" class="social__link" data-attr="linkedin"
                    data-link="https://www.linkedin.com/share">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                </div>
                <center>
                <a href="./">
                <div class="field__wrp">
                    <button id="copyBtn" >Home</button>
                </div>
</a>
                </center>

              </div>

            </div>

          </section>

        </section>`;
        messageBox.classList.add("clipboard-message");
        document.body.appendChild(messageBox);
        setTimeout(function () {
          document.body.removeChild(messageBox);
        }, 5000);
      }
    }
  });
});
