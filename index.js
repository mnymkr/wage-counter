const rate = document.querySelector('#rate');
const duration = document.querySelector('#duration');
const amount = document.querySelector('#amount');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const pauseButton = document.querySelector('#pause');
const head = document.querySelector('#head');
const progressBar = document.querySelector('#progress-bar'); 
const alert = document.querySelector('.alert');

let calculate = null;

let isCounting = false;
let lastTime;

stopButton.style.display = 'none';
pauseButton.style.display = 'none';

alert.style.display = 'none';

function start() {

    if (rate.value == 0 || duration.value == 0) {
        alert.style.display = 'block';
        return;
    }

    alert.style.display = 'none';

    isCounting = true;
    lastTime = performance.now();
    elapsed = 0;
    amount.innerHTML = 0;

    console.log('start');

    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    pauseButton.style.display = 'block';
    
    calculate = setInterval(() => {
        if (isCounting) {
        
            elapsed = performance.now() - lastTime; // in miliseconds
            if (elapsed > duration.value * 1000 * 60 * 60) {
                isCounting = false;
            } else {
                amount.innerHTML = (rate.value * (elapsed/1000/60/60)).toFixed(0); // in hours

                progressBar.style.width = (elapsed / (duration.value * 1000 * 60 * 60) * 100).toFixed(0) + '%';

                console.log(rate.value * (elapsed));
            }
        }
    });
}

function stop() {
    isCounting = false;
    startButton.style.display = 'block';
    stopButton.style.display = 'none'; 
    pauseButton.style.display = 'none';

    console.log('stop');
}

function pause() {
    if (isCounting) {
        isCounting = false;
        pauseButton.innerHTML = 'Resume';
    } else {
        isCounting = true;
        pauseButton.innerHTML = 'Pause';
    }
}
