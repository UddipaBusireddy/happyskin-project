document.getElementById('start-btn').addEventListener('click', function() {
    document.querySelector('.intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    displayQuestions();
});

const questions = [
    { question: "1. How does your skin feel after washing with a cleanser?", options: [" Dry", " Normal", " Oily", " Combination"] },
    { question: "2. How often does your skin feel oily?", options: [" Never", " Sometimes", " Often", " Always"] },
    { question: "3. How often does your skin feel dry or flaky?", options: [" Never", " Sometimes", " Often", " Always"] },
    { question: "4. How sensitive is your skin?", options: [" Not sensitive", " Slightly sensitive", " Moderately sensitive", " Very sensitive"] }
];

let currentQuestionIndex = 0;
let answers = [];

function displayQuestions() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
  
    if (currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
  
        const questionContainer = document.createElement('div'); // Container for question text
        questionContainer.id = 'question-text';
        const questionText = document.createElement('h2');
        questionText.innerText = questionObj.question;
        questionContainer.appendChild(questionText);
        questionElement.appendChild(questionContainer);
  
        const optionsContainer = document.createElement('div'); // Container for options
        optionsContainer.classList.add('option-container'); // Add a class for styling
        questionObj.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.classList.add('option');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'question' + currentQuestionIndex;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            optionsContainer.appendChild(label);
        });
        questionElement.appendChild(optionsContainer);
  
        const nextButton = document.createElement('button');
        nextButton.id='next-button';
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', handleNextButton);
        questionElement.appendChild(nextButton);
  
        quizDiv.appendChild(questionElement);
    } else {
        showResults();
    }
}

function handleNextButton() {
    const selectedOption = document.querySelector('input[name="question' + currentQuestionIndex + '"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        answers.push(answer);
        currentQuestionIndex++;
        displayQuestions();
    } else {
        alert('Please select an option.');
    }
}

function showResults() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '<h2 class="results">Calculating your skin type...</h2>';
    
    // Simulating a delay for result processing
    setTimeout(() => {
        const skinType = classifySkinType(answers);
        quizDiv.innerHTML = `
            <h2 class="results">You have ${skinType} skin</h2>
            <button id="recommend-btn">Show Recommendations</button>
        `;
        document.getElementById('recommend-btn').addEventListener('click', () => {
            // Redirect to a new HTML page based on skin type
            window.location.href = skinType.toLowerCase() + ".html";
        });
    }, 1000);
}

function classifySkinType(answers) {
    let oilyCount = 0;
    let dryCount = 0;
    let sensitiveCount = 0;

    answers.forEach(answer => {
        if (answer.includes("Oily") || answer.includes("Often")) {
            oilyCount++;
        }
        if (answer.includes("Dry") || answer.includes("Flaky")) {
            dryCount++;
        }
        if (answer.includes("Sensitive") || answer.includes("Very sensitive")) {
            sensitiveCount++;
        }
    });

    if (oilyCount > dryCount && oilyCount > sensitiveCount) {
        return "Oily";
    } else if (dryCount > oilyCount && dryCount > sensitiveCount) {
        return "Dry";
    } else if (sensitiveCount > oilyCount && sensitiveCount > dryCount) {
        return "Sensitive";
    } else {
        return "Normal";
    }
}
