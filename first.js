const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "12", "13", "11"],
        answer: "12"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
    },
    {
        question: "What color is the sky on a clear day?",
        options: ["Green", "Red", "Blue", "Yellow"],
        answer: "Blue"
    },
    {
        question: "What planet do we live on?",
        options: ["Mars", "Venus", "Earth", "Jupiter"],
        answer: "Earth"
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
        answer: "Shakespeare"
    },
    {
        question: "What is the boiling point of water?",
        options: ["90°C", "100°C", "80°C", "120°C"],
        answer: "100°C"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["Japan", "China", "Korea", "Thailand"],
        answer: "Japan"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Saturn", "Venus"],
        answer: "Mars"
    },
    {
        question: "What gas do plants absorb?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        question: "Which language is primarily spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        answer: "Portuguese"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2"
    },
    {
        question: "Which metal is liquid at room temperature?",
        options: ["Iron", "Gold", "Mercury", "Aluminum"],
        answer: "Mercury"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    },
    {
        question: "Who discovered gravity?",
        options: ["Einstein", "Newton", "Galileo", "Edison"],
        answer: "Newton"
    },
    {
        question: "What is the national animal of India?",
        options: ["Elephant", "Tiger", "Lion", "Peacock"],
        answer: "Tiger"
    },
    {
        question: "How many hours are in a day?",
        options: ["24", "12", "36", "48"],
        answer: "24"
    }
];




function RandomQuestion() {
    const data = new Set();
    while (data.size < 5) {
        const index = Math.floor(Math.random() * questions.length);
        data.add(questions[index]);
    }
    return [...data];
}

function renderQuiz() {
    form.innerHTML = "";
    document.getElementById('result').textContent = "";
    document.getElementById('restartBtn').style.display = "none";
    const problem = RandomQuestion();
    const original_answer = {};

    problem.forEach((obj, index) => {
        const div_element = document.createElement('div');
        div_element.className = "question";
        original_answer[`q${index+1}`] = obj['answer'];

        const para = document.createElement('p');
        para.textContent = `${index + 1}. ${obj.question}`;
        div_element.appendChild(para);

        obj.options.forEach((data) => {
            const label = document.createElement('label');
            label.setAttribute('for', `q${index+1}_${data}`);
            const input = document.createElement('input');
            input.type = "radio";
            input.name = `q${index+1}`;
            input.value = data;
            input.id = `q${index+1}_${data}`;
            label.appendChild(input);
            label.appendChild(document.createTextNode(data));
            div_element.appendChild(label);
        });

        form.appendChild(div_element);
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = "Submit";
    form.appendChild(button);

    form.onsubmit = function(e) {
        e.preventDefault();
        let score = 0;
        for (let i = 1; i <= 5; i++) {
            const selected = form.querySelector(`input[name="q${i}"]:checked`);
            const labels = form.querySelectorAll(`input[name="q${i}"]`);
            labels.forEach(input => {
                input.parentElement.classList.remove('correct', 'incorrect');
                if (input.value === original_answer[`q${i}`]) {
                    input.parentElement.classList.add('correct');
                }
            });
            if (selected) {
                if (selected.value === original_answer[`q${i}`]) {
                    score++;
                } else {
                    selected.parentElement.classList.add('incorrect');
                }
            }
        }
        document.getElementById('result').textContent = `You scored ${score} out of 5!`;
        document.getElementById('restartBtn').style.display = "block";
    };
}

const form = document.getElementById('quizForm');
renderQuiz();

document.getElementById('restartBtn').onclick = function() {
    renderQuiz();
};