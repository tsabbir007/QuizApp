import React from "react";

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQUestion: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQUestion }) => (
<div>
    <p className="number">
        Question: {questionNumber} / {totalQUestion}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    <div>
        {answers.map((answer, index) =>(
            <div key={index}>
                <button disabled={userAnswer} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}}/>
                </button>
            </div>
        ))}
    </div>
</div>
);

export default QuestionCard;