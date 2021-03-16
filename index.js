const Tracker = require("./classes/mainTracker");
const bestbuy = require("./siteWorkers/bestbuyTracker")

console.log(
  "Hello this is the node application that will start Stock Tracker."
);

const tracker = new Tracker(1);

setInterval(() => {
    tracker.mainLoop();
}, 2000)
