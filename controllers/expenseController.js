const expenses = require('../data/expenses');

// Function to extract day, month and year
function extractDateParts(dateString) {
    const [date] = dateString.split(',');

    const [day, month, year] = date.split('/');

    return {           // Return the extracted parts as numbers
        day: Number(day),
        month: Number(month),
        year: Number(year)
    };
}

// GET all expenses and filter expenses
const getExpenses = (req, res) => {
    try {
        const { day, month, year } = req.query;    // Extract query parameters for filtering

        let filteredExpenses = [...expenses];

        // Validate day
        if (day !== undefined) {
            if (!/^\d+$/.test(day) || Number(day) < 1 || Number(day) > 31) {  //
                return res.status(400).json({
                    success: false,
                    message: 'Invalid day. It must be between 1 and 31.'
                });
            }
        }

        // Validate month
        if (month !== undefined) {
            if (!/^\d+$/.test(month) || Number(month) < 1 || Number(month) > 12) {
                return res.status(400).json({               // Return error for invalid month
                    success: false,
                    message: 'Invalid month. It must be between 1 and 12.'
                });
            }
        }

        // Validate year
        if (year !== undefined) {
            if (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > 2100) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid year. Please enter a year between 1900 and 2100.'
                });
            }
        }

        // Filter expenses
        filteredExpenses = filteredExpenses.filter(expense => {

            const expenseDate = extractDateParts(expense.createdAt);

            if (day !== undefined && expenseDate.day !== Number(day)) {
                return false;
            }

            if (month !== undefined && expenseDate.month !== Number(month)) {
                return false;
            }

            if (year !== undefined && expenseDate.year !== Number(year)) {
                return false;
            }

            return true;
        });

        return res.status(200).json({
            success: true,
            count: filteredExpenses.length,
            data: filteredExpenses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while retrieving expenses.',
            error: error.message
        });
    }
};

module.exports = { getExpenses };