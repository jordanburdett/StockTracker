var Push = require("pushover-notifications");
const open = require("open");

// Sends a notification using pushover
function sendNotification(message, url, sku, notifiedList) {
    console.log(notifiedList);

    // Check if the item is in the sent list
    const index = notifiedList.findIndex((value) => value.sku === sku);
    if (index != -1) {
        const lastNotified = notifiedList[index].time;
        if (Date.now() - lastNotified >= 100000) {
            notifiedList[index].time = Date.now();
        }
        else {
            return;
        }
    }
    else {
        notifiedList.push({sku: sku, time: Date.now()});
    }

    open(url);
  var p = new Push({
    user: "ufzq5b4xj6sh21rnxb91nrpzgtya8n",
    token: "a2ptfzg8wjk75zupuhh2ad558tyrtw",
  });

  var msg = {
    // These values correspond to the parameters detailed on https://pushover.net/api
    // 'message' is required. All other values are optional.
    message: message, // required
    title: "GPU STOCK!",
    sound: "magic",
    device: "jordansiphone",
    priority: 1,
    url: url,
    url_title: "Best buy",
  };

  p.send(msg, function (err, result) {
    if (err) {
      throw err;
    }

    console.log(result);
  });
}

module.exports = sendNotification;
