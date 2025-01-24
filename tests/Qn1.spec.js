const { calculateTotal, products } = require('../tasks/Qn1');

describe("Testing the calculateTotal Function", () => {
    it("should return 'No Products!' for an empty array", () => {
        expect(calculateTotal([])).toBe("No Products!");
    });

    it("should return the price of a single product", () => {
        const singleProduct = [{ name: "Product 1", price: 30 }];
        expect(calculateTotal(singleProduct)).toBe(32.4);
    });

    it("should handle negative prices", () => {
        const negativePrices = [
            { name: "Product 1", price: -10 },
            { name: "Product 2", price: -20 }
        ];
        expect(calculateTotal(negativePrices)).toBe("Please enter a valid price");
    });

    it("should handle zero prices", () => {
        const zeroPrices = [
            { name: "Product 1", price: 0 },
            { name: "Product 2", price: 0 }
        ];
        expect(calculateTotal(zeroPrices)).toBe(0);
    });

    it("should handle mixed prices", () => {
        const mixedPrices = [
            { name: "Product 1", price: 10 },
            { name: "Product 2", price: -5.4 },
            { name: "Product 3", price: 0 }
        ];
        expect(calculateTotal(mixedPrices)).toBe("Please enter a valid price");
    });

    it("should handle large numbers", () => {
        const largeNumbers = [
            { name: "Product 1", price: Number.MAX_SAFE_INTEGER },
            { name: "Product 2", price: Number.MAX_SAFE_INTEGER }
        ];
        const totalWithoutDiscount = Number.MAX_SAFE_INTEGER * 2;
        const discount = totalWithoutDiscount * 0.1;
        const totalWithDiscount = totalWithoutDiscount - discount;
        const tax = totalWithDiscount * 0.08;
        const expectedTotal = totalWithDiscount + tax;
        expect(calculateTotal(largeNumbers)).toBe(expectedTotal);
    });

    it("should return the correct total for products array", () => {
        expect(calculateTotal(products)).toBe(165.24);
    });
});