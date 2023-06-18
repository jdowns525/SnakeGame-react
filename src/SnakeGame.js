import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const moveSnake = setInterval(() => {
      const newSnake = [...snake];
      const head = newSnake[newSnake.length - 1];

      let newX = head.x;
      let newY = head.y;
      if (direction === 'right') newX++;
      else if (direction === 'left') newX--;
      else if (direction === 'up') newY--;
      else if (direction === 'down') newY++;

      const newHead = { x: newX, y: newY };

      if (newX === food.x && newY === food.y) {
        const newFood = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        };
        setFood(newFood);
      } else {
        newSnake.shift();
      }

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= 20 ||
        newY >= 20 ||
        newSnake.some(segment => segment.x === newX && segment.y === newY)
      ) {
        clearInterval(moveSnake);
        alert('Game over!');
      } else {
        newSnake.push(newHead);
        setSnake(newSnake);
      }
    }, 200);

    return () => clearInterval(moveSnake);
  }, [snake, food, direction]);

  const handleKeyDown = e => {
    if (e.keyCode === 37 && direction !== 'right')
      setDirection('left');
    else if (e.keyCode === 38 && direction !== 'down')
      setDirection('up');
    else if (e.keyCode === 39 && direction !== 'left')
      setDirection('right');
    else if (e.keyCode === 40 && direction !== 'up')
      setDirection('down');
  };

  return (
    <div
      style={{ width: '400px', height: '400px', border: '1px solid black' }}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      {Array.from({ length: 20 }).map((_, row) => (
        <div key={row} style={{ display: 'flex' }}>
          {Array.from({ length: 20 }).map((_, col) => {
            const isSnake = snake.some(segment => segment.x === col && segment.y === row);
            const isFood = food.x === col && food.y === row;
            return (
              <div
                key={`${col}-${row}`}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white'
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SnakeGame;
