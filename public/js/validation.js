const emailRegex =
  /^\w+([\.-]?\w+)*@(gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

const validate = {
  name: (value) => {
    return value.length < 5 ? true : false;
  },
  email: (value) => {
    return emailRegex.test(value) ? false : true;
  },

  password: (value) => {
    return passwordRegex.test(value) ? false : true;
  },

};

function handleChange(e) {
    console.log(e.target.name)
  const error = validate[e.target.name](e.target.value);
  const errorMessage = document.getElementById(`${e.target.name}Error`);
  if (error) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
}
