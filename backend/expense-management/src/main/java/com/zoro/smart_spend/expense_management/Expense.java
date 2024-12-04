package com.zoro.smart_spend.expense_management;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger id;
    @Column
    private BigInteger userId;
    @Column
    private BigDecimal amount;
    @Column
    private Category category;
    @Column
    private String description;
    @Column
    private Date expenseDate;
    @Column
    private Date createdAt;
}
