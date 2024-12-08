package com.zoro.smart_spend.user_profile;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tokens")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger id;
    @Column
    private String token;
    @Column
    private TokenType tokenType = TokenType.BEARER;
    @Column
    private boolean revoked;
    @Column
    private boolean expired;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
