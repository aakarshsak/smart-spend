package com.zoro.smart_spend.user_profile;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginEntity loginEntity) {
        return ResponseEntity.ok("loggedin");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterEntity registerEntity) {
        return new ResponseEntity<>("registerd", HttpStatus.ACCEPTED);
    }
}
