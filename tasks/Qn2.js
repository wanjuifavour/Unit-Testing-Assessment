const calculateEmployeePay = (baseSalary, hoursWorked, overtimeMultiplier, taxBrackets, socialSecurityRate) => {
    if (hoursWorked === 0) {
        return 0;
    }


    let grossPay = baseSalary;


    let overtimePay = 0;
    if (hoursWorked > 40) {
        const overtimeHours = hoursWorked - 40;
        overtimePay = (baseSalary / 40) * overtimeHours * overtimeMultiplier;
    }

    grossPay += overtimePay;


    let taxDeduction = 0;
    let remainingIncome = grossPay;
    for (let bracket of taxBrackets) {
        if (remainingIncome > bracket.limit) {
            taxDeduction += bracket.limit * bracket.rate;
            remainingIncome -= bracket.limit;
        } else {
            taxDeduction += remainingIncome * bracket.rate;
            break;
        }
    }

    const socialSecurityDeduction = grossPay * socialSecurityRate;

    const netPay = grossPay - taxDeduction - socialSecurityDeduction;

    return netPay;
};

module.exports = calculateEmployeePay;