import { useState, useCallback } from "react";
import { ListFormat } from "typescript";
import QUESTIONS from "../questions.js";
import quizeCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.js";

export default function Quiz() {
  // to control current answer state, to change button color
  const [answerState, setAnswerState] = useState("");
  // to store user's choises of each question
  const [userAnswers, setUserAnswers] = useState([]);

  // stay at current question, if answerState is not ""
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      // confirm  current answer Correct or Wrong
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        // reset answerState to "" again, and move on to next question
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    // useCallback function should be recreated when activeQuestionIndex changed
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizeCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} //add the key prop to recreate the component when question changes
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
