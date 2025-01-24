export class CartDiscountEngine {
    constructor() {
        this.rules = {
            quantity: {
                electronics: { 5: 0.10, 10: 0.15 },
                clothing: { 3: 0.20 },
            },
            seasonal: {
                summer: {
                    clothing: 0.25,
                    swimwear: 0.30,
                },
            },
            coupons: {
                SUMMER2024: { discount: 0.15, expiry: new Date(2024, 7, 31) },
                NEWCUSTOMER: { discount: 0.10, expiry: new Date(2025, 11, 31) },
            },
        };
    }

    calculateItemDiscount(item, currentDate) {
        const category = item.category;
        const price = item.price;
        const quantity = item.quantity;

        // Quantity discount
        const quantityRules = this.rules.quantity[category] || {};
        const quantityDiscounts = Object.entries(quantityRules)
            .filter(([threshold]) => quantity >= Number(threshold))
            .map(([, discount]) => discount);
        const bestQuantityDiscount = Math.max(...quantityDiscounts, 0);

        // Seasonal discount
        let seasonalDiscount = 0;
        if (currentDate.getMonth() >= 5 && currentDate.getMonth() <= 7) {
            seasonalDiscount = this.rules.seasonal.summer[category] || 0;
        }

        // Apply best discount
        const bestDiscount = Math.max(bestQuantityDiscount, seasonalDiscount);
        return parseFloat((price * quantity * (1 - bestDiscount)).toFixed(2));
    }

    applyCartDiscounts(cartItems, couponCode = null) {
        const currentDate = new Date();
        let subtotal = 0;

        const processedItems = cartItems.map((item) => {
            const discountedTotal = this.calculateItemDiscount(item, currentDate);
            subtotal += discountedTotal;
            return { ...item, discountedTotal };
        });

        // Coupon discount
        let total = subtotal;
        let couponDiscount = 0;
        if (couponCode) {
            const coupon = this.rules.coupons[couponCode];
            if (coupon && coupon.expiry >= currentDate) {
                couponDiscount = subtotal * coupon.discount;
                total -= couponDiscount;
            }
        }

        return {
            items: processedItems,
            subtotal,
            couponDiscount,
            total: Math.max(total, 0),
        };
    }
}