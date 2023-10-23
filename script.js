//your code here
 const gameContainer = document.getElementById('gameContainer');
    const scoreElement = document.getElementById('score');
    const gridSize = 40;
    let snake = [{ row: 20, col: 1 }];
    let food = generateFood();
    let direction = 'right';
    let score = 0;
    let gameInterval;

    function generateFood() {
      let foodPosition;
      do {
        foodPosition = {
          row: Math.floor(Math.random() * gridSize),
          col: Math.floor(Math.random() * gridSize)
        };
      } while (snake.some(segment => segment.row === foodPosition.row && segment.col === foodPosition.col));

      return foodPosition;
    }

    function createPixel(row, col, className) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel', className);
      pixel.style.gridRow = row + 1;
      pixel.style.gridColumn = col + 1;
      return pixel;
    }

    function updateGame() {
      const head = Object.assign({}, snake[0]);

      switch (direction) {
        case 'up':
          head.row--;
          break;
        case 'down':
          head.row++;
          break;
        case 'left':
          head.col--;
          break;
        case 'right':
          head.col++;
          break;
      }

      snake.unshift(head);

      if (head.row === food.row && head.col === food.col) {
        score++;
        scoreElement.textContent = score;
        food = generateFood();
      } else {
        snake.pop();
      }

      if (isGameOver(head) || score === gridSize * gridSize) {
        clearInterval(gameInterval);
        alert('Game Over!');
        return;
      }

      renderGame();
    }

    function isGameOver(head) {
      return (
        head.row < 0 ||
        head.col < 0 ||
        head.row >= gridSize ||
        head.col >= gridSize ||
        snake.slice(1).some(segment => segment.row === head.row && segment.col === head.col)
      );
    }

    function renderGame() {
      gameContainer.innerHTML = '';
      snake.forEach((segment, index) => {
        gameContainer.appendChild(createPixel(segment.row, segment.col, index === 0 ? 'snakeBodyPixel' : 'pixel'));
      });

      gameContainer.appendChild(createPixel(food.row, food.col, 'food'));
    }

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'down') direction = 'up';
          break;
        case 'ArrowDown':
          if (direction !== 'up') direction = 'down';
          break;
        case 'ArrowLeft':
          if (direction !== 'right') direction = 'left';
          break;
        case 'ArrowRight':
          if (direction !== 'left') direction = 'right';
          break;
      }
    });

    gameInterval = setInterval(updateGame, 100);

    renderGame();