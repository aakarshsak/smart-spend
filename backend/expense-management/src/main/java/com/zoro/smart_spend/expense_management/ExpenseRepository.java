package com.zoro.smart_spend.expense_management;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, BigInteger> {
}
