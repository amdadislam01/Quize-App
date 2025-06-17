document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const registrationContainer = document.getElementById('registration-container');
    const quizContainer = document.getElementById('quiz-container');
    const registrationForm = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const educationInput = document.getElementById('education');
    const termsInput = document.getElementById('terms');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const termsError = document.getElementById('terms-error');

    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const hintButton = document.getElementById('hint-button');
    const feedbackElement = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const timerElement = document.getElementById('timer');

    const resultsModal = document.getElementById('results-modal');
    const resultsUserName = document.getElementById('results-user-name');
    const resultsUserEmail = document.getElementById('results-user-email');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const correctAnswersElement = document.getElementById('correct-answers');
    const incorrectAnswersElement = document.getElementById('incorrect-answers');
    const timeTakenElement = document.getElementById('time-taken');
    const performanceMessage = document.getElementById('performance-message');
    const restartButton = document.getElementById('restart-button');
    const newUserButton = document.getElementById('new-user-button');

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let quizQuestions = [];
    let timer;
    let timeLeft = 300; // Changed to 5 minutes (300 seconds)
    let quizStarted = false;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let startTime;
    let userData = {};

    // Sample questions
    const sampleQuestions = [
        {
            "question": "Which country is home to the kangaroo?",
            "options": ["South Africa", "Brazil", "Australia", "New Zealand"],
            "correctAnswer": 2,
            "hint": "This country is also known for the Great Barrier Reef."
        },
        {
            "question": "What is the longest river in the world?",
            "options": ["Amazon", "Nile", "Yangtze", "Mississippi"],
            "correctAnswer": 1,
            "hint": "It flows through northeastern Africa."
        },
        {
            "question": "Which city hosted the 2020 Summer Olympics?",
            "options": ["Rio de Janeiro", "Tokyo", "Paris", "London"],
            "correctAnswer": 1,
            "hint": "The games were postponed to 2021 due to the pandemic."
        },
        {
            "question": "What is the currency of Japan?",
            "options": ["Won", "Yen", "Yuan", "Ringgit"],
            "correctAnswer": 1,
            "hint": "The symbol for this currency is ¥."
        },
        {
            "question": "Which country invented tea?",
            "options": ["India", "England", "China", "Turkey"],
            "correctAnswer": 2,
            "hint": "This country also invented paper and gunpowder."
        },
        {
            "question": "What is the official language of Brazil?",
            "options": ["Spanish", "Portuguese", "Brazilian", "English"],
            "correctAnswer": 1,
            "hint": "This language is also spoken in Portugal."
        },
        {
            "question": "Which desert is the largest in the world?",
            "options": ["Sahara", "Arabian", "Gobi", "Kalahari"],
            "correctAnswer": 0,
            "hint": "It covers much of North Africa."
        },
        {
            "question": "What is the national animal of Canada?",
            "options": ["Moose", "Polar Bear", "Beaver", "Bald Eagle"],
            "correctAnswer": 2,
            "hint": "This animal is known for building dams."
        },
        {
            "question": "Which country has the most time zones?",
            "options": ["United States", "Russia", "China", "France"],
            "correctAnswer": 3,
            "hint": "This country has territories around the world."
        },
        {
            "question": "What is the smallest country in the world?",
            "options": ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            "correctAnswer": 1,
            "hint": "It's located within Rome, Italy."
        },
        {
            "question": "Which continent has the most countries?",
            "options": ["Asia", "Europe", "Africa", "South America"],
            "correctAnswer": 2,
            "hint": "This continent has 54 recognized sovereign states."
        },
        {
            "question": "What is the most widely spoken language in the world?",
            "options": ["English", "Mandarin Chinese", "Spanish", "Hindi"],
            "correctAnswer": 1,
            "hint": "This language has the most native speakers."
        },
        {
            "question": "Which country is shaped like a boot?",
            "options": ["Greece", "Italy", "Portugal", "Chile"],
            "correctAnswer": 1,
            "hint": "This country is famous for pizza and pasta."
        },
        {
            "question": "What is the national flower of Japan?",
            "options": ["Cherry Blossom", "Rose", "Lotus", "Tulip"],
            "correctAnswer": 0,
            "hint": "These flowers bloom beautifully in spring."
        },
        {
            "question": "Which country is both an island and a continent?",
            "options": ["Greenland", "Madagascar", "Australia", "Iceland"],
            "correctAnswer": 2,
            "hint": "It's also known as 'the Land Down Under'."
        },
        {
            "question": "What is the capital of Canada?",
            "options": ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            "correctAnswer": 2,
            "hint": "It's not the country's largest city."
        },
        {
            "question": "Which African country was never colonized?",
            "options": ["Ethiopia", "South Africa", "Egypt", "Nigeria"],
            "correctAnswer": 0,
            "hint": "This country successfully resisted Italian invasion."
        },
        {
            "question": "What is the most populated city in the world?",
            "options": ["Shanghai", "Delhi", "Tokyo", "São Paulo"],
            "correctAnswer": 2,
            "hint": "This city is the capital of Japan."
        },
        {
            "question": "Which country has the most pyramids?",
            "options": ["Egypt", "Mexico", "Sudan", "Peru"],
            "correctAnswer": 2,
            "hint": "They're located in the Nile Valley."
        },
        {
            "question": "What is the national animal of Scotland?",
            "options": ["Lion", "Unicorn", "Eagle", "Stag"],
            "correctAnswer": 1,
            "hint": "This mythical creature is on their royal coat of arms."
        },
        {
            "question": "Which country has the most islands?",
            "options": ["Philippines", "Indonesia", "Sweden", "Canada"],
            "correctAnswer": 2,
            "hint": "This Scandinavian country has over 200,000 islands."
        },
        {
            "question": "What is the official language of Switzerland?",
            "options": ["German", "French", "Italian", "All of the above"],
            "correctAnswer": 3,
            "hint": "This country has multiple official languages."
        },
        {
            "question": "Which country is home to Machu Picchu?",
            "options": ["Mexico", "Colombia", "Peru", "Chile"],
            "correctAnswer": 2,
            "hint": "This ancient Incan city is in the Andes Mountains."
        },
        {
            "question": "What is the national sport of Canada?",
            "options": ["Ice Hockey", "Lacrosse", "Curling", "Soccer"],
            "correctAnswer": 1,
            "hint": "This sport originated with Indigenous peoples."
        },
        {
            "question": "Which country consumes the most chocolate per capita?",
            "options": ["Belgium", "Switzerland", "Germany", "United States"],
            "correctAnswer": 1,
            "hint": "This country is also famous for its banks and watches."
        },
        {
            "question": "What is the largest country by area in South America?",
            "options": ["Argentina", "Colombia", "Brazil", "Peru"],
            "correctAnswer": 2,
            "hint": "This country hosts most of the Amazon rainforest."
        },
        {
            "question": "Which country has the most official languages?",
            "options": ["India", "South Africa", "Papua New Guinea", "Bolivia"],
            "correctAnswer": 1,
            "hint": "This country recognizes 11 official languages."
        },
        {
            "question": "What is the national animal of India?",
            "options": ["Peacock", "Tiger", "Elephant", "Lion"],
            "correctAnswer": 1,
            "hint": "This big cat is endangered but protected in the country."
        },
        {
            "question": "Which country is known as the Land of the Rising Sun?",
            "options": ["China", "Japan", "South Korea", "Thailand"],
            "correctAnswer": 1,
            "hint": "This country's flag features a red circle on white."
        },
        {
            "question": "What is the most visited country in the world?",
            "options": ["Spain", "Italy", "France", "United States"],
            "correctAnswer": 2,
            "hint": "This country is famous for the Eiffel Tower."
        }
    ];

    // Form validation
    function validateForm() {
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (nameInput.value.trim().length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Validate terms
        if (!termsInput.checked) {
            termsError.textContent = 'You must accept the terms';
            isValid = false;
        } else {
            termsError.textContent = '';
        }

        return isValid;
    }

    // Handle form submission
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Store user data
            userData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                age: ageInput.value ? parseInt(ageInput.value) : null,
                education: educationInput.value
            };

            // Display user info in quiz
            displayName.textContent = userData.name;
            displayEmail.textContent = userData.email;

            // Display user info in results
            resultsUserName.textContent = userData.name;
            resultsUserEmail.textContent = userData.email;

            // Switch to quiz view
            registrationContainer.classList.remove('active');
            registrationContainer.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            quizContainer.classList.add('active');

            // Initialize the quiz
            initQuiz();
        }
    });

    // Initialize the quiz
    function initQuiz() {
        quizQuestions = [...sampleQuestions];
        startTime = new Date().getTime();
        loadQuestion();
        startTimer();
        quizStarted = true;
    }

    // Load a question
    function loadQuestion() {
        resetState();
        const currentQuestion = quizQuestions[currentQuestionIndex];

        // Update question counter
        questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;

        // Update progress bar
        progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

        // Set question text
        questionElement.textContent = currentQuestion.question;

        // Create options
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            button.dataset.index = index;
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });

        // Enable hint button
        hintButton.disabled = false;

        // Enable submit button if an option is already selected (when going back)
        if (selectedOption !== null) {
            submitButton.disabled = false;
        }
    }

    // Reset the question state
    function resetState() {
        // Clear all options
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }

        // Hide feedback
        feedbackElement.classList.add('hidden');

        // Reset selected option
        selectedOption = null;

        // Disable submit button
        submitButton.disabled = true;
    }

    // Select an option
    function selectOption(e) {
        // Remove selected class from all options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected class to clicked option
        e.target.classList.add('selected');
        selectedOption = parseInt(e.target.dataset.index);

        // Enable submit button
        submitButton.disabled = false;
    }

    // Submit the answer (updated to show score in feedback)
    function submitAnswer() {
        if (selectedOption === null) return;

        const currentQuestion = quizQuestions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');

        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Show correct/incorrect feedback with score
        if (selectedOption === currentQuestion.correctAnswer) {
            options[selectedOption].classList.add('correct');
            feedbackText.textContent = `Correct! Well done! (Score: ${score + 1}/30)`;
            score += 1;
            correctAnswers++;
        } else {
            options[selectedOption].classList.add('incorrect');
            options[currentQuestion.correctAnswer].classList.add('correct');
            feedbackText.textContent = `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]} (Score: ${score}/300)`;
            incorrectAnswers++;
        }

        // Update score display to show "X/30" instead of just "X"
        scoreElement.textContent = `Score: ${score}/30`;

        // Show feedback and next button
        feedbackElement.classList.remove('hidden');

        // Disable submit and hint buttons
        submitButton.disabled = true;
        hintButton.disabled = true;
    }

    // Show next question
    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }

    // Show hint
    function showHint() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        feedbackText.textContent = `Hint: ${currentQuestion.hint}`;
        feedbackElement.classList.remove('hidden');
        hintButton.disabled = true;
    }

    // Timer function (updated to 5 minutes)
    function startTimer() {
        clearInterval(timer);
        timeLeft = 300; // 5 minutes in seconds
        updateTimerDisplay();

        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                finishQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Finish the quiz
    function finishQuiz() {
        clearInterval(timer);

        // Calculate time taken
        const endTime = new Date().getTime();
        const timeTaken = Math.floor((endTime - startTime) / 1000);

        // Hide quiz container
        quizContainer.classList.remove('active');
        quizContainer.classList.add('hidden');

        // Update results modal
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = quizQuestions.length;
        correctAnswersElement.textContent = correctAnswers;
        incorrectAnswersElement.textContent = incorrectAnswers;
        timeTakenElement.textContent = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;

        // Performance message
        const percentage = (score / quizQuestions.length) * 100;  // Removed *10 since each question is 1 point
        if (percentage >= 80) {
            performanceMessage.textContent = `Excellent work! (${score}/30) You're a quiz master!`;
        } else if (percentage >= 60) {
            performanceMessage.textContent = `Good job! (${score}/30) You know your stuff!`;
        } else if (percentage >= 40) {
            performanceMessage.textContent = `Not bad! (${score}/30) Keep learning!`;
        } else {
            performanceMessage.textContent = `Keep practicing! (${score}/30) You'll improve!`;
        }
        // Show modal
        resultsModal.classList.add('active');
    }

    // Restart the quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        selectedOption = null;

        // Reset UI
        scoreElement.textContent = `Score: ${score}`;
        resultsModal.classList.remove('active');
        feedbackElement.classList.add('hidden');

        // Show quiz container again
        quizContainer.classList.remove('hidden');
        quizContainer.classList.add('active');

        // Start quiz again
        initQuiz();
    }

    // Return to registration for new user
    function newUser() {
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        selectedOption = null;
        quizStarted = false;

        // Reset form
        registrationForm.reset();
        nameError.textContent = '';
        emailError.textContent = '';
        termsError.textContent = '';

        // Switch views
        resultsModal.classList.remove('active');
        quizContainer.classList.remove('active');
        quizContainer.classList.add('hidden');
        registrationContainer.classList.remove('hidden');
        registrationContainer.classList.add('active');
    }

    // Event listeners
    submitButton.addEventListener('click', submitAnswer);
    nextButton.addEventListener('click', nextQuestion);
    hintButton.addEventListener('click', showHint);
    restartButton.addEventListener('click', restartQuiz);
    newUserButton.addEventListener('click', newUser);
});