package com.zoro.smart_spend.user_profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionRespone{
    private int status;
    private long timestamp;
    private String message;
}
