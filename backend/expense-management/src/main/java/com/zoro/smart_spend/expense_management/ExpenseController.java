package com.zoro.smart_spend.expense_management;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @GetMapping("")
    public String hello() {
        return "HELLO WORLD <333";
    }
}
