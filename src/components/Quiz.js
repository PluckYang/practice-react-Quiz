import { useState } from "react";

export default function Quiz() {
  // control showing of current question, from dummy questions array
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // to store user's choises of each question
  const [userAnswers, setUserAnswers] = useState([]);

  return <p>Currently active Question</p>;
}
