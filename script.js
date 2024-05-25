// Retrieve the HTML elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Do not change code below this line 
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load saved progress from session storage or initialize an empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Create text node for the question
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    // Loop through choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");

      // Set attributes for radio button
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Add event listener to capture user selection
      choiceElement.addEventListener("change", function(event) {
        const selectedValue = event.target.value;
        userAnswers[i] = selectedValue;

        // Save progress in session storage
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      // Create text node for choice
      const choiceText = document.createTextNode(choice);

      // Append choice elements to question element
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    // Append question element to questions container
    questionsElement.appendChild(questionElement);
  }
}

// Function to calculate and display user's score
function displayScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    // Check if user's answer matches the correct answer
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display the score on the webpage
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store the score in local storage
  localStorage.setItem("score", score);
}

// Render the questions
renderQuestions();

// Add event listener to submit button to display score upon click
submitButton.addEventListener("click", displayScore);
