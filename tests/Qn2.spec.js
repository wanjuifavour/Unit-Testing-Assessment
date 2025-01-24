const calculateEmployeePay = require('../tasks/Qn2'); // Update with the correct path

describe('calculateEmployeePay', () => {
    test('calculates pay with no overtime and no taxes correctly', () => {
        const baseSalary = 1000;
        const hoursWorked = 40;
        const taxBrackets = [];
        const socialSecurityRate = 0;

        const result = calculateEmployeePay(baseSalary, hoursWorked, taxBrackets, socialSecurityRate);
        expect(result).toEqual({
            grossPay: '1000.00',
            taxDeductions: '0.00',
            socialSecurityContributions: '0.00',
            netPay: '1000.00',
        });
    });

    test('calculates pay with overtime correctly', () => {
        const baseSalary = 1000;
        const hoursWorked = 45;
        const taxBrackets = [];
        const socialSecurityRate = 0;
    
        const result = calculateEmployeePay(baseSalary, hoursWorked, taxBrackets, socialSecurityRate);
        expect(result).toEqual({
            grossPay: '1125.00',
            taxDeductions: '0.00',
            socialSecurityContributions: '0.00',
            netPay: '1125.00',
        });
    });
    

    test('applies tax deductions correctly', () => {
        const baseSalary = 1000;
        const hoursWorked = 40;
        const taxBrackets = [
            { rate: 0.1, threshold: 100 },
            { rate: 0.2, threshold: 200 },
            { rate: 0.3, threshold: Infinity },
        ];
        const socialSecurityRate = 0;

        const result = calculateEmployeePay(baseSalary, hoursWorked, taxBrackets, socialSecurityRate);
        expect(result).toEqual({
            grossPay: '1000.00',
            taxDeductions: '230.00',
            socialSecurityContributions: '0.00',
            netPay: '770.00',
        });
    });

    test('applies social security contributions correctly', () => {
        const baseSalary = 1000;
        const hoursWorked = 40;
        const taxBrackets = [];
        const socialSecurityRate = 0.062;

        const result = calculateEmployeePay(baseSalary, hoursWorked, taxBrackets, socialSecurityRate);
        expect(result).toEqual({
            grossPay: '1000.00',
            taxDeductions: '0.00',
            socialSecurityContributions: '62.00',
            netPay: '938.00',
        });
    });

    test('handles combined taxes and social security contributions', () => {
        const baseSalary = 1000;
        const hoursWorked = 45;
        const taxBrackets = [
            { rate: 0.1, threshold: 100 },
            { rate: 0.2, threshold: 200 },
            { rate: 0.3, threshold: Infinity },
        ];
        const socialSecurityRate = 0.062;

        const result = calculateEmployeePay(baseSalary, hoursWorked, taxBrackets, socialSecurityRate);
        expect(result).toEqual({
            grossPay: '1125.00',
            taxDeductions: '247.50',
            socialSecurityContributions: '69.75',
            netPay: '807.75',
        });
    });
});