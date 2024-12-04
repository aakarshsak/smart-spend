package com.zoro.smart_spend.expense_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class ExpenseServiceImpl implements ExpenseService{

    private ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense addExpense(ExpenseEntity expenseEntity) {
        Date date = null;
        try {
//           String dateString = "2024-12-02"; // Example date string
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            formatter.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata"));
            date = formatter.parse(expenseEntity.getExpenseDate()); // Convert String to Date
            System.out.println("Converted Date: " + date);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Expense expense = Expense.builder()
                .createdAt(new Date(System.currentTimeMillis()))
                .amount(expenseEntity.getAmount())
                .description(expenseEntity.getDescription())
                .category(expenseEntity.getCategory())
                .userId(expenseEntity.getUserId())
                .expenseDate(date)
                .build();

        return expenseRepository.saveAndFlush(expense);
    }

    @Override
    public List<Expense> getAllExpenseList() {
        return expenseRepository.findAll();
    }

}
