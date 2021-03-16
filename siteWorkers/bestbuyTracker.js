const bby = require("bestbuy")("XyRYR1ggM3t9IqoRU3nSPkWO");
const sendNotification = require("../utilities/notify");

const products = "sku=6418599|sku=6439402|sku=6444444|sku=6452940|sku=6442484|sku=6454328|sku=6444449|sku=6446660|sku=6444445|sku=6441172|sku=6442485|sku=6429442|sku=6439299|sku=6439301|sku=6432653|sku=6439300|sku=6432654|sku=6429440|sku=6432400|sku=6436196|sku=6436191|sku=6432655|sku=6432658|sku=6432399|sku=6436194";

async function bestbuy(notifiedList) {
  bby.products(
      products,
      {
        show:
          "sku,name,salePrice,addToCartUrl,inStoreAvailability,onlineAvailability",
      }
    )
    .then(function (data) {
      if (!data) {
        console.log("WE HAVE A ISSUE WITH THE API!");
        return false;
      }
      data.products.forEach((product) => {
        if (product.inStoreAvailability || product.onlineAvailability) {
          console.log(
            `Availability Found - ${product.name} -- ${product.addToCartUrl}`
          );
          sendNotification(`${product.name} -- ${product.addToCartUrl} -- $${product.salePrice}`, product.addToCartUrl, product.sku, notifiedList)
          return true;
        } else {
          console.log(`OUT OF STOCK - ${product.name} -- ${product.salePrice}`);
          return false;
        }
      });
    }).catch((error) => {
        console.log("there was an ERRRRROOOOORRRR");
    });
}

module.exports = bestbuy;
