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

