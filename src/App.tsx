import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  console.log(questions);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
      console.log(answer);
      if(answer === questions[number].correct_answer ){
        setScore(score+1);
      }
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setNumber(number+1)
  };

  return (
    <>
      <div className='App'>
        <h1>Quiz App</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}> Start </button>
        ) : null}

        {!gameOver ? (
          <p className="score">{score}</p>
        ) : null}

        {loading && <p>Loading Questions ... </p>}
        {!loading && !gameOver &&
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNumber={number + 1}
            totalQUestion={TOTAL_QUESTIONS}
          />
        }
        {!loading && !gameOver && number !== TOTAL_QUESTIONS-1 ?
        (
          <button className="next" onClick={nextQuestion}>Next</button>
        ):null}
      </div>
    </>
  )
}

export default App

