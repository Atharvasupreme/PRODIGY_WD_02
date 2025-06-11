let startTime, updatedTime, difference, timerInterval;
    let running = false;
    const display = document.getElementById('display');
    const laps = document.getElementById('laps');
    const beep = document.getElementById('beep');

    function startStopwatch() {
      if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 100);
        running = true;
        beep.play();
      }
    }

    function pauseStopwatch() {
      if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        beep.play();
      }
    }

    function resetStopwatch() {
      clearInterval(timerInterval);
      running = false;
      difference = 0;
      display.textContent = '00:00:00';
      laps.innerHTML = '';
      laps.classList.add('hidden');
      beep.play();
    }

    function updateTime() {
      updatedTime = new Date().getTime() - startTime;
      let hours = Math.floor(updatedTime / 3600000);
      let minutes = Math.floor((updatedTime % 3600000) / 60000);
      let seconds = Math.floor((updatedTime % 60000) / 1000);

      display.textContent =
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
    }

    function recordLap() {
      if (running) {
        const lapTime = display.textContent;
        const lap = document.createElement('div');
        lap.textContent = 'Lap: ' + lapTime;
        laps.classList.remove('hidden');
        laps.prepend(lap);
        beep.play();
      }
    }

    function toggleDarkMode(checkbox) {
      document.body.classList.toggle('dark-mode', checkbox.checked);
    }

    function exportLaps() {
      const lapItems = laps.querySelectorAll('div');
      const lapText = Array.from(lapItems).map(lap => lap.textContent).join('\n');
      const blob = new Blob([lapText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lap_times.txt';
      a.click();
      URL.revokeObjectURL(url);
    }