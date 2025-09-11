package net.LaabhGupta.journalApp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTest {
    @Autowired
    private EmailService emailService;

    @Test
    void testEmailService() {
        emailService.sendEmail("reachvedicagupta@gmail.com","Testing Java Mail","Hi ap kaise hai. HeHeHe");
    }
}
