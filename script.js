// Retrieve the HTML elements
const questionsElement = document.getElementById("questions"); // Get the element where questions will be displayed
const submitButton = document.getElementById("submit"); // Get the submit button element
const scoreElement = document.getElementById("score"); // Get the element where the score will be displayed

// Do not change code below this line 
// This code will just display the questions to the screen
const questions = [ /* Array containing quiz questions */
  {
    question: "What is the capital of France?", // Question text
    choices: ["Paris", "London", "Berlin", "Madrid"], // Array of multiple-choice options
    answer: "Paris", // Correct answer
  },
  {
    question: "What is the highest mountain in the world?", // Question text
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], // Array of multiple-choice options
    answer: "Everest", // Correct answer
  },
  {
    question: "What is the largest country by area?", // Question text
    choices: ["Russia", "China", "Canada", "United States"], // Array of multiple-choice options
    answer: "Russia", // Correct answer
  },
  {
    question: "Which is the largest planet in our solar system?", // Question text
    choices: ["Earth", "Jupiter", "Mars"], // Array of multiple-choice options
    answer: "Jupiter", // Correct answer
  },
  {
    question: "What is the capital of Canada?", // Question text
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], // Array of multiple-choice options
    answer: "Ottawa", // Correct answer
  },
];

// Load saved progress from session storage or initialize an empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || []; // Retrieve saved user answers or initialize an empty array

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div"); // Create a div element for each question

    // Create text node for the question
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText); // Append question text to the question element

    // Loop through choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input"); // Create a radio button for each choice

      // Set attributes for radio button
      choiceElement.setAttribute("type", "radio"); // Set input type to radio
      choiceElement.setAttribute("name", `question-${i}`); // Set input name to group choices for each question
      choiceElement.setAttribute("value", choice); // Set input value to the choice value

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true); // Mark the radio button as checked if it matches the saved user answer
      }

      // Add event listener to capture user selection
      choiceElement.addEventListener("change", function(event) {
        const selectedValue = event.target.value; // Get the selected value
        userAnswers[i] = selectedValue; // Save the selected value as the user's answer for this question

        // Save progress in session storage
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save user progress in session storage
      });

      // Create text node for choice
      const choiceText = document.createTextNode(choice);
      
      // Append choice elements to question element
      questionElement.appendChild(choiceElement); // Append radio button to the question element
      questionElement.appendChild(choiceText); // Append choice text to the question element
    }

    // Append question element to questions container
    questionsElement.appendChild(questionElement); // Append question element to the container for displaying questions
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
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`; // Display the user's score

  // Store the score in local storage
  localStorage.setItem("score", score); // Save the user's score in local storage
}

// Render the questions
renderQuestions(); // Call the function to render the quiz questions

// Add event listener to submit button to display score upon click
submitButton.addEventListener("click", displayScore); // Add event listener to the submit button to calculate and display the user's score when clicked
