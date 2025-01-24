const calculateEmployeePay = require('../tasks/Qn2');

describe("Testing the calculateEmployeePay Function", () => {
    const taxBrackets = [
        { limit: 50000, rate: 0.3 },
        { limit: 20000, rate: 0.2 },
        { limit: 10000, rate: 0.1 }
    ];
    const socialSecurityRate = 0.062;

    it("should calculate net pay with no overtime and no tax", () => {
        const netPay = calculateEmployeePay(30000, 40, 1.5, taxBrackets, socialSecurityRate);
        expect(netPay).toBeCloseTo(27840, 2);
    });

    it("should calculate net pay with overtime and no tax", () => {
        const netPay = calculateEmployeePay(30000, 45, 1.5, taxBrackets, socialSecurityRate);
        expect(netPay).toBeCloseTo(28552.5, 2);
    });

    it("should calculate net pay with overtime and tax", () => {
        const netPay = calculateEmployeePay(60000, 50, 1.5, taxBrackets, socialSecurityRate);
        expect(netPay).toBeCloseTo(39690, 2);
    });

    it("should calculate net pay with no overtime and tax", () => {
        const netPay = calculateEmployeePay(70000, 40, 1.5, taxBrackets, socialSecurityRate);
        expect(netPay).toBeCloseTo(46270, 2);
    });

    it("should calculate net pay with no hours worked", () => {
        const netPay = calculateEmployeePay(30000, 0, 1.5, taxBrackets, socialSecurityRate);
        expect(netPay).toBe(0);
    });
});