import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface SpaceData {
  planets: Array<{
    name: string;
    description: string;
    funFact: string;
  }>;
  missions: Array<{
    name: string;
    description: string;
    funFact: string;
  }>;
}

interface Props {
  spaceData: SpaceData;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function SpaceQuiz({ spaceData }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const generateQuestions = () => {
      const allQuestions: Question[] = [
        // Planet-based questions
        ...spaceData.planets.map(planet => ({
          question: `Which planet is ${planet.description.toLowerCase()}?`,
          options: shuffleArray([
            planet.name,
            ...getRandomPlanets(spaceData.planets, planet.name, 3)
          ]),
          correctAnswer: planet.name
        })),
        // Mission-based questions
        ...spaceData.missions.map(mission => ({
          question: `${mission.description}.`,
          options: shuffleArray([
            mission.name,
            ...getRandomMissions(spaceData.missions, mission.name, 3)
          ]),
          correctAnswer: mission.name
        })),
        // Fun fact questions
        ...spaceData.planets.map(planet => ({
          question: `Which planet ${planet.funFact.toLowerCase()}?`,
          options: shuffleArray([
            planet.name,
            ...getRandomPlanets(spaceData.planets, planet.name, 3)
          ]),
          correctAnswer: planet.name
        }))
      ];

      setQuestions(shuffleArray(allQuestions).slice(0, 10));
    };

    generateQuestions();
  }, [spaceData]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setShowScore(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="max-w-lg mx-auto bg-white/90 rounded-xl p-8 text-center shadow-lg">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-6">
          You scored {score} out of {questions.length}
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">
            {score === questions.length
              ? "Perfect score! You're a space expert! 🚀"
              : score >= questions.length * 0.7
              ? "Great job! You really know your space facts! 🌟"
              : "Keep exploring and learning about space! 🌎"}
          </p>
          <button
            onClick={restartQuiz}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/90 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-gray-600">
            Score: {score}/{questions.length}
          </p>
        </div>
        <h2 className="text-xl font-semibold mb-6">
          {questions[currentQuestion].question}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedAnswer === null
                ? 'hover:bg-indigo-50 bg-white'
                : selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
                : option === questions[currentQuestion].correctAnswer
                ? 'bg-green-100 border-green-500'
                : 'bg-white opacity-50'
            } ${
              selectedAnswer === null
                ? 'border-2 border-gray-200'
                : 'border-2'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Utility functions
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomPlanets(planets: any[], exclude: string, count: number): string[] {
  return shuffleArray(planets.filter(p => p.name !== exclude))
    .slice(0, count)
    .map(p => p.name);
}

function getRandomMissions(missions: any[], exclude: string, count: number): string[] {
  return shuffleArray(missions.filter(m => m.name !== exclude))
    .slice(0, count)
    .map(m => m.name);
}