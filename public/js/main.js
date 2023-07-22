var loader = document.getElementById("PRE");
window.addEventListener("load", function () {
  loader.style.display = "none";
});




function onSubmit(e) {
  if (window.location.href == "/signup" || window.location.href == "/login") {
    return false;
  }
  e.preventDefault();

  // //clearing the message from box after submission:
  // document.querySelector(".msg").textContent = "";
  // document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  const numImages = parseInt(document.querySelector("#num-images").value);
  const API_KEY = document.querySelector("#api-key").value; //API Key, this value can be passed as paramerter in the function as well...

  const apiRegex = /^sk-.+$/;

  let text = "";

  switch (true) {
    case prompt === "":
      text = "Please add some text";
      // alert(text);
      toastr["warning"](text, "Validation")
      return;

    case API_KEY === "":
      text = "Please add your API Key";
      toastr["warning"](text, "Validation")
      return;

    case !apiRegex.test(API_KEY):
      text = "Please add correct API Key";
      toastr["warning"](text, "Validation")
      return;
  }

  const response = generateImageRequest(prompt, API_KEY, size, numImages);

  //   console.log(response);
}

async function generateImageRequest(prompt, API_KEY, size, numImages) {
  try {
    // showLoading()
    showSpinner();

    const response = await fetch(`/openai/generateimages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        API_KEY,
        size,
        numImages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // hideLoading();
      removeSpinner();

      errorFromServer = data.error.message;

      console.log(data.error.message);

      throw new Error(`The image was not generated, ${errorFromServer}`);
    }

    //Displaying Image in the Frontend:

    // const imageUrl = data.data;

    const imageContainer = document.querySelector("#image-container");
    imageContainer.innerHTML = ""; // Clear existing images

    const imageUrls = data.data;
    console.log(imageUrls);
    imageUrls.forEach((imageUrl) => {
      console.log(imageUrl);
      console.log(imageUrl.url);
      const img = document.createElement("img");
      img.src = imageUrl.url;
      img.classList.add("h-auto", "max-w-full", "rounded-lg");
      imageContainer.appendChild(img);
    });

    // document.querySelector("#image").src = imageUrl;

    // -----------------------Share Button---------------------------

    const sharebtn = document.querySelector(".twitter-share-button");
    sharebtn.style.display = "block";
    sharebtn.addEventListener("click", () => {
      // Replace [ImageURL] with the actual image URL
      handleShare(imageUrls[0].url);
    });

    const handleShare = async (url) => {
      try {
        // Check if the navigator.share API is available
        if (window.navigator.share) {
          await window.navigator.share({
            title: "Share Image",
            url: url,
          });
        } else {
          // If the API is not available, show a share menu
          const options = [
            {
              label: "Instagram",
              url: `https://www.instagram.com/create/collection/?source_url=${encodeURIComponent(
                url,
              )}&media_type=gif`,
            },
            {
              label: "Facebook",
              url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url,
              )}`,
            },
            {
              label: "Twitter",
              url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                "Check out this GIF!",
              )}&url=${encodeURIComponent(url)}`,
            },
            {
              label: "Snapchat",
              url: `snapchat://share?url=${encodeURIComponent(url)}`,
            },
            {
              label: "Telegram",
              url: `https://telegram.me/share/url?url=${encodeURIComponent(
                url,
              )}`,
            },
          ];

          const chosenOption = await showShareMenu(options);

          // Handle the share action for the chosen option
          if (chosenOption) {
            window.open(chosenOption.url, "_blank");
          }
        }
      } catch (error) {
        console.error("Error sharing:", error);
      }
    };

    // Helper function to show a share menu with custom options
    const showShareMenu = async (options) => {
      const buttons = options.map((option) => {
        return {
          label: option.label,
          onClick: () => {
            closeMenu(option);
          },
        };
      });

      const closeMenu = (option) => {
        menu.destroy();
        resolve(option);
      };

      const menu = new window.Menus({
        buttons: buttons,
      });

      const result = await new Promise((resolve) => {
        menu.showAtCursor();
        menu.on("cancel", () => {
          resolve(null);
        });
      });

      return result;
    };
    // -----------------------Share Button---------------------------
    // Call the handleShare function with the desired image URL
    // Replace [ImageURL] with the actual image URL

    // hideLoading();
    removeSpinner();
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Spinner Show and Remove:
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
if (document.querySelector("#image-form") != null)
  document.querySelector("#image-form").addEventListener("submit", onSubmit);
// Surprise Button
const surpriseMePrompts = [
  "an armchair in the shape of an avocado",
  "a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers",
  "teddy bears shopping for groceries in Japan, ukiyo-e",
  "an oil painting by Matisse of a humanoid robot playing chess",
  "panda mad scientist mixing sparkling chemicals, digital art",
  "a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art",
  "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art",
  "an astronaut lounging in a tropical resort in space, vaporwave",
  "an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background",
  "a stained glass window depicting a hamburger and french fries",
  "a pencil and watercolor drawing of a bright city in the future with flying cars",
  "a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art",
  "a fortune-telling shiba inu reading your fate in a giant hamburger, digital art",
  '"a sea otter with a pearl earring" by Johannes Vermeer',
  "an oil pastel drawing of an annoyed cat in a spaceship",
  "a painting of a fox in the style of Starry Night",
  "a bowl of soup that looks like a monster, knitted out of wool",
  "A plush toy robot sitting against a yellow wall",
  "A synthwave style sunset above the reflecting water of the sea, digital art",
  "Two futuristic towers with a skybridge covered in lush foliage, digital art",
  "A 3D render of a rainbow colored hot air balloon flying above a reflective lake",
  "A comic book cover of a superhero wearing headphones",
  "A centered explosion of colorful powder on a black background",
  "A photo of a Samoyed dog with its tongue out hugging a white Siamese cat",
  "A photo of a white fur monster standing in a purple room",
  "A photo of Michelangelo's sculpture of David wearing headphones djing",
  "A Samurai riding a Horse on Mars, lomography.",
  "A modern, sleek Cadillac drives along the Gardiner expressway with downtown Toronto in the background, with a lens flare, 50mm photography",
  "A realistic photograph of a young woman with blue eyes and blonde hair",
  "A man standing in front of a stargate to another dimension",
  "Spongebob Squarepants in the Blair Witch Project",
  "A velociraptor working at a hotdog stand, lomography",
  "A man walking through the bustling streets of Kowloon at night, lit by many bright neon shop signs, 50mm lens",
  "A BBQ that is alive, in the style of a Pixar animated movie",
  "A futuristic cyborg dance club, neon lights",
  "The long-lost Star Wars 1990 Japanese Anime",
  "A hamburger in the shape of a Rubik’s cube, professional food photography",
  "A Synthwave Hedgehog, Blade Runner Cyberpunk",
  "An astronaut encountering an alien life form on a distant planet, photography",
  "A Dinosaur exploring Cape Town, photography",
  "A Man falling in Love with his Computer, digital art",
  "A photograph of a cyborg exploring Tokyo at night, lomography",
  "Dracula walking down the street of New York City in the 1920s, black and white photography",
  "Synthwave aeroplane",
  "A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm",
  "A Space Shuttle flying above Cape Town, digital art",
];

function surpriseMe() {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  document.getElementById("prompt").value = randomPrompt;
}

const surpriseMeBtn = document.getElementById("surpriseMeBtn");
if (surpriseMeBtn != null) surpriseMeBtn.addEventListener("click", surpriseMe);

//Display Floating In Image cards on Homepage
const cards = document.querySelectorAll(".float-in");
const options = {
  threshold: 0.5,
};

const animateCards = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
};

const observer = new IntersectionObserver(animateCards, options);

cards.forEach((card) => {
  observer.observe(card);
});
