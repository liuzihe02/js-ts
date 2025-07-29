const displayedImage = document.querySelector(".displayed-img");
// .thumb-bar is selecting by class
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* variable declarations*/
/* Declaring the array of image filenames */
let images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];
/* Declaring the alternative text for each image file */
let altNames = ["pic1desc", "pic2desc", "pic3desc", "pic4desc", "pic5desc"];

/* event handler functions */
function setDisplayedImg(src, alt) {
  //update the middle image
  displayedImage.src = src;
  displayedImage.alt = alt;
}

function flipLight(current) {
  if (current === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "light";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "dark";
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
  }
}

/* Looping through images */
for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", "images/" + images[i]);
  newImage.setAttribute("alt", altNames[i]);
  thumbBar.appendChild(newImage);
  //   ///add event listener to each child, which is the bottom images
  //   newImage.addEventListener("click", (e) =>
  //     //can use target here to access newImage, which is the object that's being clicked
  //     setDisplayedImg(e.target.src, e.target.alt)
  //   );
}

//alternatively, can add event listener to the thumb bar
thumbBar.addEventListener("click", (e) =>
  setDisplayedImg(e.target.src, e.target.alt)
);

/* Wiring up the Darken/Lighten button */
//note that class is a reserved word and you should use className instead!
btn.addEventListener("click", (e) => flipLight(btn.className));
