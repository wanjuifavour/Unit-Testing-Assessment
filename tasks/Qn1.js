let products = [
    {
        name: "Product 1",
        price: 30
    },
    {
        name: "Product 2",
        price: 20
    },
    {
        name: "Product 3",
        price: 50
    },
    {
        name: "Product 4",
        price: 10
    },
    {
        name: "Product 5",
        price: 60
    }
];

let calculateTotal = (products) => {
    if (products.length === 0) {
        return "No Products!";
    }
    let total = 0;
    let salesTax = 0.08;
    for (let product of products) {
        if (product.price < 0) {
            return "Please enter a valid price";
        }
        total += product.price;
    }
    if (total > 100) {
        let discount = 0.1;
        total = total - (total * discount);
    }
    total = total + (total * salesTax);
    return total;
}

module.exports = { calculateTotal, products };