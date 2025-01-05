const apiKey = "BTsUXmQKSKaL96hV3q1a8umlD8iAnQ2bHzG65Hr5";

document.addEventListener("DOMContentLoaded", () => {
  getCurrentImageOfTheDay();
  loadSearchHistory();
});

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    getImageOfTheDay(selectedDate);
  });

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetchImage(currentDate);
  updateHeading(currentDate);
}

function getImageOfTheDay(date) {
  fetchImage(date);
  saveSearch(date);
  updateSearchHistory();
  updateHeading(date);
}

function fetchImage(date) {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayImage(data);
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
      displayError("Failed to load image. Please try again later.");
    });
}

function displayImage(data) {
  const container = document.getElementById("current-image-container");
  container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" style="width:100%;">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

function updateSearchHistory() {
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = ""; // Clear the existing list
  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  if (searches.length === 0) {
    const noSearchItem = document.createElement("li");
    noSearchItem.textContent = "No past searches yet.";
    searchHistory.appendChild(noSearchItem);
  } else {
    const heading = document.createElement("li");
    heading.textContent = "Previous Searches";
    heading.style.fontWeight = "bold"; // Optional: makes the heading stand out
    searchHistory.appendChild(heading);

    searches.forEach((date) => addSearchToHistory(date));
  }
}

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");
  const listItem = document.createElement("li");
  listItem.textContent = date;

  listItem.addEventListener("click", () => {
    fetchImage(date);
    highlightSelectedItem(listItem);
  });

  searchHistory.appendChild(listItem);
}

function highlightSelectedItem(selectedItem) {
  const items = document.querySelectorAll("#search-history li");
  items.forEach((item) => item.classList.remove("selected")); // Remove highlight from all items
  selectedItem.classList.add("selected"); // Highlight the selected item
}

function loadSearchHistory() {
  updateSearchHistory();
}

function updateHeading(date) {
  const heading = document.getElementById("picture-date-heading");
  heading.textContent = `NASA Picture ON ${date}`;
}
