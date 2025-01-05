// const apiKey = "BTsUXmQKSKaL96hV3q1a8umlD8iAnQ2bHzG65Hr5";

// document.addEventListener("DOMContentLoaded", () => {
//   getCurrentImageOfTheDay();
//   loadSearchHistory();
// });

// document
//   .getElementById("search-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const selectedDate = document.getElementById("search-input").value;
//     getImageOfTheDay(selectedDate);
//   });

// function getCurrentImageOfTheDay() {
//   const currentDate = new Date().toISOString().split("T")[0];
//   fetchImage(currentDate);
//   updateHeading(currentDate);
// }

// function getImageOfTheDay(date) {
//   fetchImage(date);
//   saveSearch(date);
//   updateSearchHistory();
//   updateHeading(date);
// }

// function fetchImage(date) {
//   const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       displayImage(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching image:", error);
//       displayError("Failed to load image. Please try again later.");
//     });
// }

// function displayImage(data) {
//   const container = document.getElementById("current-image-container");
//   container.innerHTML = `
//         <h2>${data.title}</h2>
//         <img src="${data.url}" alt="${data.title}" style="width:100%;">
//         <p>${data.explanation}</p>
//     `;
// }

// function saveSearch(date) {
//   let searches = JSON.parse(localStorage.getItem("searches")) || [];
//   if (!searches.includes(date)) {
//     searches.push(date);
//     localStorage.setItem("searches", JSON.stringify(searches));
//   }
// }

// function updateSearchHistory() {
//   const searchHistory = document.getElementById("search-history");
//   searchHistory.innerHTML = ""; // Clear the existing list
//   const searches = JSON.parse(localStorage.getItem("searches")) || [];

//   if (searches.length === 0) {
//     const noSearchItem = document.createElement("li");
//     noSearchItem.textContent = "No past searches yet.";
//     searchHistory.appendChild(noSearchItem);
//   } else {
//     const heading = document.createElement("li");
//     heading.textContent = "Previous Searches";
//     heading.style.fontWeight = "bold"; // Optional: makes the heading stand out
//     searchHistory.appendChild(heading);

//     searches.forEach((date) => addSearchToHistory(date));
//   }
// }

// function addSearchToHistory(date) {
//   const searchHistory = document.getElementById("search-history");
//   const listItem = document.createElement("li");
//   listItem.textContent = date;

//   listItem.addEventListener("click", () => {
//     fetchImage(date);
//     highlightSelectedItem(listItem);
//   });

//   searchHistory.appendChild(listItem);
// }

// function highlightSelectedItem(selectedItem) {
//   const items = document.querySelectorAll("#search-history li");
//   items.forEach((item) => item.classList.remove("selected")); // Remove highlight from all items
//   selectedItem.classList.add("selected"); // Highlight the selected item
// }

// function loadSearchHistory() {
//   updateSearchHistory();
// }

// function updateHeading(date) {
//   const heading = document.getElementById("picture-date-heading");
//   heading.textContent = `NASA Picture ON ${date}`;
// }

const apiKey = "BTsUXmQKSKaL96hV3q1a8umlD8iAnQ2bHzG65Hr5";
const pictureDateHeading = document.getElementById("picture-date-heading");
const currentImageContainer = document.getElementById(
  "current-image-container"
);
const imageTitle = document.getElementById("image-title");
const imageDescription = document.getElementById("image-description");

function displayImage(data) {
  const imageElement = currentImageContainer.querySelector("img");
  imageElement.src = data.url;
  imageElement.alt = data.title;
  imageTitle.textContent = data.title;
  imageDescription.textContent = data.explanation;
}

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayImage(data);
      pictureDateHeading.textContent = "NASA Picture of the Day";
    })
    .catch((error) =>
      console.error("Error fetching the current image:", error)
    );
}

function getImageOfTheDay(date) {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then((response) => response.json())
    .then((data) => {
      displayImage(data);
      pictureDateHeading.textContent = `NASA Picture ON ${date}`;
      saveSearch(date);
      addSearchToHistory(date);
    })
    .catch((error) => console.error("Error fetching the image:", error));
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

// function addSearchToHistory(date) {
//   const searchHistory = document.getElementById("search-history");
//   let searchItem = document.createElement("li");
//   searchItem.textContent = date;
//   searchItem.addEventListener("click", () => getImageOfTheDay(date));
//   searchHistory.appendChild(searchItem);
// }

// function addSearchToHistory(date) {
//   const searchHistory = document.getElementById("search-history");

//   // Check if the current heading is "No past searches yet." and replace it with "Previous Searches"
//   if (
//     searchHistory.firstChild &&
//     searchHistory.firstChild.textContent === "No past searches yet."
//   ) {
//     searchHistory.innerHTML = ""; // Clear the existing content
//     const historyHeading = document.createElement("li");
//     historyHeading.textContent = "Previous Searches";
//     historyHeading.style.fontWeight = "bold"; // Optional: make the heading bold
//     searchHistory.appendChild(historyHeading);
//   }

//   // Create and add the new search item
//   let searchItem = document.createElement("li");
//   searchItem.textContent = date;
//   searchItem.addEventListener("click", () => getImageOfTheDay(date));
//   searchHistory.appendChild(searchItem);
// }

// document
//   .getElementById("search-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const date = document.getElementById("search-input").value;
//     if (date) {
//       getImageOfTheDay(date);
//     }
//   });

// // Load the default image on page load
// getCurrentImageOfTheDay();

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");

  // Check if the list is empty (meaning no past searches) and display "No past searches yet."
  if (searchHistory.children.length === 0) {
    const noSearchItem = document.createElement("li");
    noSearchItem.textContent = "No past searches yet.";
    searchHistory.appendChild(noSearchItem);
  }

  // Replace "No past searches yet." with "Previous Searches" once there's at least one search
  if (searchHistory.firstChild.textContent === "No past searches yet.") {
    searchHistory.firstChild.textContent = "Previous Searches";
    searchHistory.firstChild.style.fontWeight = "bold"; // Optional: make the heading bold
  }

  // Create and add the new search item
  let searchItem = document.createElement("li");
  searchItem.textContent = date;
  searchItem.addEventListener("click", () => getImageOfTheDay(date));
  searchHistory.appendChild(searchItem);
}

function loadSearchHistory() {
  const searchHistory = document.getElementById("search-history");
  let searches = JSON.parse(localStorage.getItem("searches")) || [];

  // Clear the current history before adding from local storage
  searchHistory.innerHTML = "";

  // Add the heading "Previous Searches"
  const historyHeading = document.createElement("li");
  historyHeading.textContent = "Previous Searches";
  historyHeading.style.fontWeight = "bold"; // Optional: make the heading bold
  searchHistory.appendChild(historyHeading);

  // Add each search item from local storage
  searches.forEach((date) => {
    let searchItem = document.createElement("li");
    searchItem.textContent = date;
    searchItem.addEventListener("click", () => getImageOfTheDay(date));
    searchHistory.appendChild(searchItem);
  });

  // If no searches, show the default message
  if (searches.length === 0) {
    const noSearchItem = document.createElement("li");
    noSearchItem.textContent = "No past searches yet.";
    searchHistory.appendChild(noSearchItem);
  }
}

// Load the default image and history when the page loads
getCurrentImageOfTheDay();
loadSearchHistory();
