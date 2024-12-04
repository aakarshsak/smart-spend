package com.zoro.smart_spend.user_profile;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger id;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String password;
    @Column
    private Role role;
    @Column
    private Date createAt;
    @Column
    private Date updatedAt;
}
