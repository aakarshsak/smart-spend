package com.zoro.smart_spend.expense_management;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense-management/expenses")
public class ExpenseController {

    private ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("")
    public ResponseEntity<Expense> addExpense(@RequestBody ExpenseEntity expenseEntity) {
        Expense expense = expenseService.addExpense(expenseEntity);
        System.out.println(expense);
        return new ResponseEntity<>(expense, HttpStatus.ACCEPTED);
    }


    @GetMapping("")
    public ResponseEntity<List<Expense>> getExpenses() {
        List<Expense> expenses = expenseService.getAllExpenseList();
        System.out.println(expenses);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}
