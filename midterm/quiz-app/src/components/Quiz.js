import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const correct = <p className="text-success mt-2">Correct!</p>;
  const incorrect = <p className="text-danger mt-2">Incorrect. Try again.</p>;

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await axios.get('https://quizapi.io/api/v1/questions?apiKey=30y1oWWKhCR2LgUWwD5mvanmnCNcS9MSnEnCyEVk');
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    }

    fetchQuizData();
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    var resonse = <p className="text-success mt-2"></p>;
    const correctAnswer = quizData[currentQuestion].correct_answer;
    setIsCorrect(selectedAnswer === correctAnswer);
    if (selectedAnswer === correctAnswer) {
      resonse = correct;
    } else {
      resonse = incorrect;
    }
    return resonse;
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (!nextQuestion.multiple_correct_answers) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 2);
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const question = quizData[currentQuestion];

  return (
    <div className="container">
      <h1 className="mt-4">Quiz App</h1>
      <div className="mt-4">
        <h2>Question {currentQuestion + 1}</h2>
        <p className="mb-4">{question.question}</p>
        <form>
          {Object.keys(question.answers).map((answer, index) => (
            <div key={index} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleAnswerSelection(answer)}
              />
              <label className="form-check-label">{question.answers[answer]}</label>
            </div>
          ))}
        </form>
        {selectedAnswer && (
          <button className="btn btn-primary" onClick={checkAnswer}>
            Check Answer
          </button>
          
        )}
        {isCorrect && <p className="text-success mt-2">Correct!</p>}
        {!isCorrect && selectedAnswer && <p className="text-danger mt-2">Incorrect. Try again.</p>}
        {currentQuestion < quizData.length - 1 && (
          <button className="btn btn-primary mt-2" onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;

