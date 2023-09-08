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

let calculate = null;
let _duration = 0;
let _rate = 0;   

let isCounting = false;
let lastTime;

let isDarkMode = false;

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

function start() {
    _duration = duration.value.split(':').reduce((acc, time) => (60 * acc) + +time);
    _duration = _duration * 60 * 1000; // convert to miliseconds

    _rate = Number.parseInt(Number.parseInt(_removeCommas(rate)));

    // console.log(_duration);  
    // CHECK IF DURATION AND RATE ARE VALID
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
    elapsed = 0;
    amount.innerHTML = 0;

    // console.log('start');

    calculate = setInterval(() => {
        if (isCounting) {
        
            elapsed = performance.now() - lastTime; // in miliseconds
            if (elapsed > _duration) { // finished counting
                stop();
                startButton.innerHTML = 'Restart';
            } else {
                amount.innerHTML = Number.parseInt((_rate * (elapsed/1000/60/60)).toFixed(0)).toLocaleString(); // in hours

                console.log(amount.innerHTML);

                progressBar.style.width = (elapsed / (_duration) * 100).toFixed(0) + '%';

                // console.log(rate.value * (elapsed/1000/60/60));
            }
        }
    });
}

function stop() {
    isCounting = false;
    startButton.style.display = 'block';
    startButton.innerHTML = 'Start';
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
