function calculateEmployeePay(baseSalary, hoursWorked, taxBrackets, socialSecurityRate) {
    const STANDARD_HOURS = 40;
    const OVERTIME_RATE = 1.5;

    let overtimeHours = Math.max(0, hoursWorked - STANDARD_HOURS);
    let regularHours = Math.min(hoursWorked, STANDARD_HOURS);

    let regularPay = (baseSalary / STANDARD_HOURS) * regularHours;
    let overtimePay = (baseSalary / STANDARD_HOURS) * overtimeHours * OVERTIME_RATE;

    let grossPay = regularPay + overtimePay;

    let taxDeductions = 0;
    let remainingIncome = grossPay;

    for (let i = 0; i < taxBrackets.length; i++) {
        const { rate, threshold } = taxBrackets[i];
        const taxableAmount = Math.min(remainingIncome, threshold);
        taxDeductions += taxableAmount * rate;
        remainingIncome -= taxableAmount;

        if (remainingIncome <= 0) break;
    }

    let socialSecurityContributions = grossPay * socialSecurityRate;

    let netPay = grossPay - taxDeductions - socialSecurityContributions;

    return {
        grossPay: grossPay.toFixed(2),
        taxDeductions: taxDeductions.toFixed(2),
        socialSecurityContributions: socialSecurityContributions.toFixed(2),
        netPay: netPay.toFixed(2),
    };
}

module.exports = calculateEmployeePay;