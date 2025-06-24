let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
  { question: "What is the capital of France?", answer: "Paris", category: "GK" },
  { question: "What is 5 x 6?", answer: "30", category: "Math" },
  { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare", category: "Literature" },
];

let currentCard = 0;
let filteredCards = [...flashcards];

function updateLocalStorage() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  updateCategoryOptions();
}

function updateCategoryOptions() {
  const select = document.getElementById("categoryFilter");
  const categories = new Set(flashcards.map(fc => fc.category));
  select.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

function showCard(index) {
  const card = filteredCards[index];
  if (!card) return;
  document.getElementById("question").textContent = card.question;
  document.getElementById("answer").textContent = card.answer;
  document.getElementById("answer").classList.add("hidden");
  document.getElementById("counter").textContent = `Card ${index + 1} of ${filteredCards.length}`;
}

function showAnswer() {
  document.getElementById("answer").classList.remove("hidden");
}

function nextCard() {
  currentCard = (currentCard + 1) % filteredCards.length;
  showCard(currentCard);
}

function prevCard() {
  currentCard = (currentCard - 1 + filteredCards.length) % filteredCards.length;
  showCard(currentCard);
}

function shuffleCards() {
  filteredCards.sort(() => Math.random() - 0.5);
  currentCard = 0;
  showCard(currentCard);
}

function filterByCategory() {
  const selected = document.getElementById("categoryFilter").value;
  if (selected === "all") {
    filteredCards = [...flashcards];
  } else {
    filteredCards = flashcards.filter(fc => fc.category === selected);
  }
  currentCard = 0;
  showCard(currentCard);
}

// Add flashcard form
document.getElementById("addForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const q = document.getElementById("newQuestion").value.trim();
  const a = document.getElementById("newAnswer").value.trim();
  const c = document.getElementById("newCategory").value.trim();
  if (q && a && c) {
    flashcards.push({ question: q, answer: a, category: c });
    updateLocalStorage();
    filterByCategory();
    this.reset();
    alert("Flashcard added!");
  }
});

window.onload = () => {
  updateCategoryOptions();
  filterByCategory();
};
