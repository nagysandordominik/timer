class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) {
            this.onStart();
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeReamining <= 0) {
            this.pause();
            this.onComplete();
        }
        else {
            this.timeReamining = this.timeReamining - 0.05;
            this.onTick();
        }
    };

    get timeReamining() {
        return parseFloat(this.durationInput.value);
    }
    set timeReamining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);


let currentOffset = 0;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log('Timer started');
    },
    onTick() {
        circle.setAttribute('stroke-dashoffset', currentOffset)
        currentOffset = currentOffset - 1;
    },
    onComplete() {
        console.log('Timer is completed');
    }
});
