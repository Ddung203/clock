document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const alertSound = document.getElementById("alertSound");
  const timeInput = document.getElementById("timeInput");
  let TIME_VALUE = 20 * 60;

  let countdown;
  let restCountdown;
  let time = TIME_VALUE;
  const restTime = 20;

  timeInput.addEventListener("keyup", (e) => {
    TIME_VALUE = e.target.value * 60;
    if (TIME_VALUE <= 0) TIME_VALUE += 10;
    console.log(`TIME_VALUE: ${TIME_VALUE} seconds`);
  });

  function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const countdownText = `${minutes}:${seconds}`;
    countdownElement.innerHTML = countdownText;
    document.title = `${countdownText}`;

    if (time > 0) {
      time--;
    } else {
      clearInterval(countdown);
      alertSound.play();
      startRestCountdown();
    }
  }

  function startRestCountdown() {
    let restTimeLeft = restTime;
    document.title = `Nghỉ ngơi: ${restTimeLeft}s`;

    restCountdown = setInterval(() => {
      restTimeLeft--;
      document.title = `Nghỉ ngơi: ${restTimeLeft}s`;

      if (restTimeLeft <= 0) {
        clearInterval(restCountdown);
        time = TIME_VALUE;
        updateCountdown();
      }
    }, 1000);
  }

  startButton.addEventListener("click", () => {
    clearInterval(countdown);
    clearInterval(restCountdown);
    time = TIME_VALUE;
    countdown = setInterval(updateCountdown, 1000);
  });

  resetButton.addEventListener("click", () => {
    clearInterval(countdown);
    clearInterval(restCountdown);
    time = TIME_VALUE;
    updateCountdown();
  });

  updateCountdown();
});
