const emailRegex =
  /^\w+([\.-]?\w+)*@(gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
const phoneRegex =/^\d{10}$/;

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
  FirstName: (value)=>{
    return value.trim().length < 3 ? true : false;
  },
  LastName :(value)=>{
    return value.trim().length < 3 ? true : false;
  },
  PhoneNumber: (value)=>{
    return phoneRegex.test(value)? false : true;
  },
  feedback: (value)=>{
    const words = value.trim().split(/\s+/).length;
    return (words< 10 || words > 50) ?  true:  false
  }
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

window.addEventListener("load", ()=>{
// Contact form Submission validation
  const contactform = document.getElementById("contactform");
  contactform.addEventListener("submit", (e)=>{
    e.preventDefault();
    let submitable = true;
    const error = [...document.getElementsByClassName("contactError")];
    console.log(error)
    error.forEach(elem=>{
      if(!elem.classList.contains("hidden")){
        submitable = false;
        return;
      }
    })
   
    if(!submitable){
        alert("Please enter valid values")
    }else{
      // Uncomment below line after implementaion of form submit handling
      // contactform.submit()
    }
})
  
})

