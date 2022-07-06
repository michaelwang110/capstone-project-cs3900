function setInterval(callback: () => void) {
    callback();
}

const globalAny: any = global;
globalAny.setInterval = setInterval;