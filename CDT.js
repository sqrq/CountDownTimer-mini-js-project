const timeDisplay = document.getElementById("time-display");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

let countdownInterval;
let remainingTime = 0; 
let isPaused = false;

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}


function startCountdown() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0 && remainingTime === 0) {
    alert("Please set a time to start!");
    return;
  }

  if (!isPaused) {
    remainingTime = hours * 3600 + minutes * 60 + seconds;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      timeDisplay.textContent = formatTime(remainingTime);
    } else {
      clearInterval(countdownInterval);
      alert("Time's up!");
    }
  }, 1000);
  isPaused = false;
}


function pauseCountdown() {
  clearInterval(countdownInterval);
  isPaused = true;
}


function resetCountdown() {
  clearInterval(countdownInterval);
  remainingTime = 0;
  timeDisplay.textContent = "00:00:00";
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
  isPaused = false;
}

startBtn.addEventListener("click", startCountdown);
pauseBtn.addEventListener("click", pauseCountdown);
resetBtn.addEventListener("click", resetCountdown);
