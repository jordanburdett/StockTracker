const Tracker = require("./classes/mainTracker");

console.log(
  "Hello this is the node application that will start Stock Tracker."
);

const tracker = new Tracker(1);

setInterval(() => {
    tracker.mainLoop();
}, 2000);
