let startBtn = document.querySelector(".start-btn");
let stopBtn = document.querySelector(".stop-btn");
let resetBtn = document.querySelector(".reset-btn");
let counter = document.querySelector(".counter");
let secInput = document.querySelector("#seconds-input");
let minInput = document.querySelector("#minutes-input");
let darkToggle = document.querySelector("#dark-toggle");

let intervalid = null;
let isCountdown = false;
let totalSeconds = 0;

window.addEventListener("DOMContentLoaded", () => {
  let isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.toggle("dark", isDark);
    darkToggle.checked = true;
  }
});
const updateDisplay = () => {
  let min = Math.floor(totalSeconds / 60);
  let sec = totalSeconds % 60;

  counter.innerHTML = `<h1>${min.toString().padStart(2, "0")} : ${sec
    .toString()
    .padStart(2, "0")}</h1>`;
  startBtn.disabled = false;
};
startBtn.addEventListener("click", () => {
  let secValue = parseInt(secInput.value) || 0;
  let minValue = parseInt(minInput.value) || 0;
  if (secValue < 0 || minValue < 0) {
    alert("Please enter non-negative values");
    return;
  }
  if (secValue > 0 || minValue > 0) {
    totalSeconds = secValue + minValue * 60;
    isCountdown = true;
  } else {
    totalSeconds = 0;
    isCountdown = false;
  }
  if (intervalid !== null) return;

  intervalid = setInterval(() => {
    updateDisplay();

    if (isCountdown) {
      totalSeconds--;
      startBtn.disabled = true;
      if (totalSeconds < 0) {
        new Audio("./Assets/voices/beep-sound-short-237619.mp3")
          .play()
          .then(() => {
            setTimeout(() => {
              alert("⏰ Time's up!");
            }, 400);
          })
          .catch(() => {
            alert("⏰ Time's up!");
          });
        clearInterval(intervalid);
        intervalid = null;
        minInput.value = "";
        secInput.value = "";
        return;
      }
    } else {
      totalSeconds++;
      startBtn.disabled = true;
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalid);
  intervalid = null;
  startBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalid);
  intervalid = null;
  totalSeconds = 0;
  updateDisplay();
  minInput.value = "";
  secInput.value = "";
});

darkToggle.addEventListener("change", () => {
  const isChecked = darkToggle.checked;
  document.body.classList.toggle("dark", isChecked);
  localStorage.setItem("darkMode", isChecked);
});
