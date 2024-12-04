package com.zoro.smart_spend.expense_management;


import java.util.List;

public interface ExpenseService {
    Expense addExpense(ExpenseEntity expenseEntity);

    List<Expense> getAllExpenseList();
}
