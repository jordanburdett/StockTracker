const bby = require('bestbuy')("XyRYR1ggM3t9IqoRU3nSPkWO")

async function bestbuy() {
    // bby.products('name=3060|name=3060 ti|name=3080|name=5600 XT|name=3070', {show: "all"}, (data) => {
    //     console.log(data);
    // })
    bby.products('sku=6418599|sku=6439402|sku=6444444|sku=6452940|sku=6442484|sku=6454328|sku=6444449|sku=6446660|sku=6444445|sku=6441172|sku=6442485|sku=6429442|sku=6439299|sku=6439301|sku=6432653|sku=6439300|sku=6432654|sku=6429440|sku=6432400|sku=6436196|sku=6436191|sku=6432655|sku=6432658|sku=6432399|sku=6436194',{show:'sku,name,salePrice,addToCartUrl,inStoreAvailability,onlineAvailability'}).then(function(data){
        data.products.forEach((product) => {
            if (product.inStoreAvailability || product.onlineAvailability) {
                console.log(`Availability Found - ${product.name} -- ${product.addToCartUrl}`);
                return true;
            }
            else {
                console.log(`OUT OF STOCK - ${product.name} -- ${product.salePrice}`)
                return false;
            }
        })
      });
}

module.exports = bestbuy;