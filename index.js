const head = document.querySelector('#head');
const body = document.body;

// const inputGroup = document.querySelectorAll("input[type='text'] input[type='time']");

const amount = document.querySelector('#amount');
const progressBar = document.querySelector('#progress-bar'); 
const alert = document.querySelector('.alert');
const rate = document.querySelector('#rate');
const duration = document.querySelector('#duration');

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const pauseButton = document.querySelector('#pause');

const progressBarCheckbox = document.querySelector('#progress-bar-checkbox');
const amountCheckbox = document.querySelector('#amount-checkbox');
const darkModeCheckbox = document.querySelector('#dark-mode-checkbox');

const progressGroup = document.querySelector('#progress-group');
const info = document.querySelector('#info');

let isDarkMode = false;

let calculate = null;
let _duration = 0;
let _rate = 0;   
let isCounting = false;
let lastTime;
let totalElapsed = 0;

stopButton.style.display = 'none';
pauseButton.style.display = 'none';

alert.style.display = 'none';

// TOGGLE DARK MODE
darkModeCheckbox.addEventListener('change', () => {
    body.classList.toggle("dark-mode");
    info.classList.toggle("dark-mode-jumbotron");

    // inputGroup.forEach((input) => {
    //     input.classList.toggle("dark-mode-input-group");
    // });
});

// TOGGLE AMOUNT BOX
amountCheckbox.addEventListener('change', () => {
    if (amountCheckbox.checked) {
        info.style.display = 'block';
    } else {
        info.style.display = 'none';
    }
});

// TOGGLE PROGRESS BAR
progressBarCheckbox.addEventListener('change', () => {
    if (progressBarCheckbox.checked) {
        progressGroup.style.display = 'block';
    } else {
        progressGroup.style.display = 'none';
    }
});

// ADD COMMAS TO AMOUNT
function updateTextView(_obj){
    if (_obj.value == '') return;

    let _string = _removeCommas(_obj); // commaless string
    // console.log(Number.parseInt(_string).toLocaleString());  
    _obj.value = Number.parseInt(_string).toLocaleString(); // add commas
}

function _removeCommas(_obj){
    let _string = _obj.value.replace(/,/g, '');
    return _string;
}

// START BUTTON
function start() {
    _duration = duration.value.split(':').reduce((acc, time) => (60 * acc) + +time);
    _duration = _duration * 60 * 1000;
    _rate = Number.parseInt(Number.parseInt(_removeCommas(rate)));

    if (rate.value == 0 || _duration == 0) {
        alert.style.display = 'block';
        return;
    }

    alert.style.display = 'none';
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    pauseButton.style.display = 'block';
    
    isCounting = true;
    lastTime = performance.now();
    totalElapsed = 0;
    amount.innerHTML = 0;

    calculate = setInterval(() => {
        if (isCounting) {
            const now = performance.now();
            totalElapsed += now - lastTime; // accumulate real time
            lastTime = now;

            if (totalElapsed > _duration) {
                stop();
                startButton.innerHTML = 'Restart';
            } else {
                const currentAmount = (_rate * (totalElapsed / 1000 / 60 / 60));
                amount.innerHTML = Number.parseInt(currentAmount.toFixed(0)).toLocaleString();
                progressBar.style.width = (totalElapsed / _duration * 100).toFixed(0) + '%';
            }
        }
    }, 100); // small delay so CPU isn’t overloaded
}

function stop() {
    isCounting = false;
    clearInterval(calculate);
    startButton.style.display = 'block';
    startButton.innerHTML = 'Start';
    stopButton.style.display = 'none'; 
    pauseButton.style.display = 'none';
}

function pause() {
    if (isCounting) {
        isCounting = false;
        pauseButton.innerHTML = 'Resume';
    } else {
        isCounting = true;
        lastTime = performance.now(); // reset baseline to now
        pauseButton.innerHTML = 'Pause';
    }
}