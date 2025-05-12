const apiKey = "pub_8640881607e6cfcdf221fe7a15dd5bbcf1f42";
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "in"; // India

const options = [
  "top",         // Top news
  "world",       // World news
  "business",
  "sports",
  "technology",
  "entertainment",
  "science",
  "health"
];

let requestURL;

// Generate news cards
const generateUI = (results) => {
  container.innerHTML = "";
  if (!results || results.length === 0) {
    container.innerHTML = "<p>No news found.</p>";
    return;
  }

  for (let item of results) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <div class="news-image-container">
        <img src="${item.image_url || './newspaper.webp'}" alt="News Image" />
      </div>
      <div class="news-content">
        <div class="news-title">${item.title}</div>
        <div class="news-description">${item.description || ""}</div>
        <a href="${item.link}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  }
};

// Fetch news
const getNews = async () => {
  container.innerHTML = "<p>Loading news...</p>";
  try {
    let response = await fetch(requestURL);
    let data = await response.json();

    if (data.status === "success") {
      generateUI(data.results);
    } else {
      container.innerHTML = "<p>News not available right now.</p>";
    }
  } catch (error) {
    container.innerHTML = "<p>Something went wrong.</p>";
  }
};

// Create category buttons
const createOptions = () => {
  optionsContainer.innerHTML = "";
  for (let i of options) {
    optionsContainer.innerHTML += `
      <button class="options ${i === "top" ? "active" : ""}" onclick="selectCategory(event, '${i}')">
        ${i.charAt(0).toUpperCase() + i.slice(1)}
      </button>`;
  }
};

// Handle button click
window.selectCategory = (e, category) => {
  let allOptions = document.querySelectorAll(".options");
  allOptions.forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  requestURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=${category}&language=en`;
  getNews();
};

// Initialize app
const init = () => {
  requestURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=top&language=en`;
  getNews();
  createOptions();
};

window.addEventListener("load", init);
