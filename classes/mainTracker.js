const bestbuy = require("../siteWorkers/bestbuyTracker");

/**********
 * The Tracker class is a simple class meant for keeping track of requests made.
 * They are tracked using workers a worker can be thought of as a thread or a independent call to bestbuy or amazon to see if there is stock.
 * Number of threads is specified in the constructor
 */
class Tracker {
  totalThreads;
  currentNumOfThreads = 0;
  sites = ["bestbuy, amazon, newegg"];
  currentWorkers = [
    { siteName: "bestbuy", amountOfWorkers: 0 },
    { siteName: "amazon", amountOfWorkers: 0 },
    { siteName: "newegg", amountOfWorkers: 0 },
  ];
  numberOfChecks = 0;

  constructor(totalThreads = 1) {
    this.totalThreads = totalThreads;
  }

  mainLoop() {
    // check number of threads and if we can attempt to make another
    if (this.currentNumOfThreads >= this.totalThreads) {
      return;
    }

    // figure out what site we want to check next?
    let indexOfNextWorker = 0;

    // Find the site that has the smallest number of workers running and store it in nextWorker
    this.currentWorkers.forEach((worker, index) => {
      if (
        worker.amountOfWorkers <
        this.currentWorkers[indexOfNextWorker].amountOfWorkers
      ) {
        indexOfNextWorker = index;
      }
    });

    // To make this easier store the reference in a new variable
    let nextWorker = this.currentWorkers[indexOfNextWorker];

    // Create a new worker using nextWorker
    this.createWorker(nextWorker);
  }

  async createWorker(worker = { siteName: "bestbuy", amountOfWorkers: 0 }) {
    // increase the num of workers
    worker.amountOfWorkers++;
    this.currentNumOfThreads++;
    this.numberOfChecks++;


    // --TODO create a switch case to decide if we are creating work fro bestbuy, amazon, newegg
    // bestbuy(); -- this function may not work.. import confusing with require... want es6:)

    if (worker.siteName === "bestbuy") {
        const found = await bestbuy();

        worker.amountOfWorkers--;
        this.currentNumOfThreads--;
    }
  }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


module.exports = Tracker;