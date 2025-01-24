import { CartDiscountEngine } from '../tasks/Qn3';

describe('CartDiscountEngine', () => {
    let discountEngine;
    let mockDate;

    beforeEach(() => {
        discountEngine = new CartDiscountEngine();
        mockDate = new Date(2024, 6, 15); // July 15, 2024
        global.Date = class extends Date {
            constructor() {
                super();
                return mockDate;
            }
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
        global.Date = Date;
    });

    describe('Quantity Discounts', () => {
        test('applies quantity discount for electronics', () => {
            const cartItems = [{ name: 'Speaker', category: 'electronics', price: 100, quantity: 5 }];
            const result = discountEngine.applyCartDiscounts(cartItems);
            expect(result.total).toBe(450);
        });

        test('applies highest quantity discount tier', () => {
            const cartItems = [{ name: 'Speaker', category: 'electronics', price: 100, quantity: 10 }];
            const result = discountEngine.applyCartDiscounts(cartItems);
            expect(result.total).toBe(850);
        });

        test('applies quantity discount for clothing', () => {
            const cartItems = [{ name: 'T-Shirt', category: 'clothing', price: 50, quantity: 3 }];
            const result = discountEngine.applyCartDiscounts(cartItems);
            expect(result.total).toBe(112.5);
        });
    });

    describe('Seasonal Discounts', () => {
        test('applies summer discount for clothing', () => {
            const cartItems = [{ name: 'Summer T-Shirt', category: 'clothing', price: 100, quantity: 2 }];
            const result = discountEngine.applyCartDiscounts(cartItems);
            expect(result.total).toBe(150);
        });
    });

    describe('Coupon Discounts', () => {
        test('applies valid coupon discount', () => {
            const cartItems = [{ name: 'Item', category: 'electronics', price: 100, quantity: 2 }];
            const result = discountEngine.applyCartDiscounts(cartItems, 'SUMMER2024');
            expect(result.couponDiscount).toBe(30);
            expect(result.total).toBe(170);
        });

        test('handles multiple discounts correctly', () => {
            const cartItems = [
                { name: 'Speaker', category: 'electronics', price: 100, quantity: 5 },
                { name: 'Summer T-Shirt', category: 'clothing', price: 50, quantity: 3 },
            ];
            const result = discountEngine.applyCartDiscounts(cartItems, 'SUMMER2024');
            expect(result.total).toBeCloseTo(478.125, 2);
        });
    });

    describe('Edge Cases', () => {
        test('handles items with no discount', () => {
            const cartItems = [{ name: 'Random Item', category: 'misc', price: 50, quantity: 1 }];
            const result = discountEngine.applyCartDiscounts(cartItems);
            expect(result.total).toBe(50);
        });

        test('prevents negative total', () => {
            const cartItems = [{ name: 'Item', category: 'electronics', price: 100, quantity: 10 }];
            const result = discountEngine.applyCartDiscounts(cartItems, 'SUMMER2024');
            expect(result.total).toBeGreaterThan(0);
        });
    });
});