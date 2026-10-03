(function () {
  var turntable = document.getElementById("turntable");
  var button = document.getElementById("powerBtn");
  var greeting = document.getElementById("greeting");
  var displayState = document.getElementById("displayState");
  var displayTime = document.getElementById("displayTime");

  var timerId = null;
  var startedAt = 0;
  var elapsedBefore = 0;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function renderTime(ms) {
    var total = Math.floor(ms / 1000);
    displayTime.textContent = pad(Math.floor(total / 60)) + ":" + pad(total % 60);
  }

  function tick() {
    renderTime(elapsedBefore + (Date.now() - startedAt));
  }

  function setPlaying(playing) {
    turntable.classList.toggle("is-playing", playing);
    greeting.classList.toggle("is-visible", playing);
    button.setAttribute("aria-pressed", String(playing));
    displayState.textContent = playing ? "play" : "stop";

    if (playing) {
      startedAt = Date.now();
      timerId = setInterval(tick, 250);
    } else {
      clearInterval(timerId);
      timerId = null;
      elapsedBefore += Date.now() - startedAt;
    }
  }

  button.addEventListener("click", function () {
    setPlaying(!turntable.classList.contains("is-playing"));
  });
})();
