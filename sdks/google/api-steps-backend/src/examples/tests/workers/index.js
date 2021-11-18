const path = require("path");
const { Worker } = require("worker_threads");

/**
 * Create child process
 * @param {object | Array} dataToSend
 * @returns created child process
 */
 module.exports = function (dataToSend) {
    const modulePath = path.join(__dirname, "..", "start-create.js");

    return new Promise((resolve, reject) => {
        const worker = new Worker(modulePath, { workerData: JSON.stringify(dataToSend) });

        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
};
