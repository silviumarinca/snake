document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector(".score span");
  const width = 10;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0]; // 2 is the head 0 is the tail
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  function startGame() {
    currentSnake.forEach((index) => {
      squares[index].classList.remove("snake");
      squares[appleIndex].classList.remove("apple");
      clearInterval(interval);
      score = 0;
      direction = 1;
      scoreDisplay.innerText = score;
      intervalTime = 1000;
      currentSnake = [2, 1, 0];
      currentIndex = 0;
      interval = setInterval(moveOutcomes, intervalTime);
    });
  }
  // deals with snake hitting apple deals with snake hitting self , deals with snake hitting border
  //function that deals with All the ove outcomes of the snake
  function moveOutcomes() {
      debugger;
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || //right side
      (currentSnake[0] % width === 0 && direction === -1) || //left
      (currentSnake[0] - width < 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake") // if snake hits itsellf
    ) {
      return clearInterval(interval);
    }
    const tail = currentSnake.pop(); // remove last item of the array;
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      rendomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(intervalTime);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, interval);
    }
    squares[currentSnake[0]].classList.add("snake");
  }

  function control(e) {
    squares[currentIndex].classList.remove("snake"); //remove snake from current position
    if (e.keyCode === 39) {
      // if right arrow is pressed move snake right
      direction = 1;
    } else if (e.keyCode === 38) {
      // pressing up arrow
      direction = -width;
    } else if (e.keyCode === 37) {
      //left arrow
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width; //down key pressed
    }
  }
  document.addEventListener("keyup", control);
  document.querySelector(".start").addEventListener("click", startGame);
});


function randomApple(){
 do{
     appleIndex = Math.floor(Math.random() * squares.length)

 }while(squares[appleIndex].classList.contains('snake'))
   squares[appleIndex].classList.add('apple');

}