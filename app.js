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
        this.interval = setInterval(this.tick, 1000);
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
            this.timeReamining = this.timeReamining - 1;
            this.onTick();
        }
    };

    get timeReamining() {
        return parseFloat(this.durationInput.value);
    }
    set timeReamining(time) {
        this.durationInput.value = time;
    }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log('Timer started');
    },
    onTick() {
        console.log('Timer just ticked down');
    },
    onComplete() {
        console.log('Timer is completed');
    }
});
