import React, { useState } from 'react'
import Board from './Board';
import GameOver from './GameOver';
import Score from './Score';

export default function Game() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  function handleGameOver() {
    setGameOver(true);
  }
  function handleSetScore(score) {
    setScore(score);
  }
  return <>
    {gameOver ? <GameOver /> : <Board onGameOver={handleGameOver} onSetScore={handleSetScore} />}
    <Score score={score} />
  </>
}