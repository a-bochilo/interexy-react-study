// eslint-disable-next-line no-restricted-globals
self.onmessage = (message: MessageEvent<number>) => {
    console.log("Worker running");
    const num = message.data;
    const start = Date.now();
    let result = 5;
    for (let i = 1; i < num; i++) {
        result = result * 1.0001 + i / 2;
        for (let k = i; k < num; k++) {
            result += 1;
            for (let j = 1; j < k; j++) {
                result += 1;
            }
        }
    }
    const resultStr = `Worker result: ${Math.round(result)}, time: ${
        Date.now() - start
    }`;
    postMessage(resultStr);
};

export {};
