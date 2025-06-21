const xlsx = require('xlsx');
const path = require("path");
const Expense = require('../models/Expense')

// Add Expense Source
exports.addExpense = async (req, res) =>{
    const userId = req.user.id;

    try{
        const {icon, category, amount, date} = req.body;

        // Validation: Check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required!"})
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }
    catch(error){
        res.status(500).json({message: "Server Error"})
    }

}

// Get All Expense Source
exports.getAllExpense = async (req, res) =>{

    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    }
    catch(error){
        res.status(500).json({message: "Server Error"})
    }

}

// Delete Expense Source
exports.deleteExpense = async (req, res) =>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});

    }catch (error){
        res.status(500).json({message: "Server Error"});
    }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const filePath = path.join(__dirname, "../expense_details.xlsx");
        xlsx.writeFile(wb, filePath); // Save to disk

        res.download(filePath, "expense_details.xlsx", (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).json({ message: "Error downloading file" });
            } else {
        
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};