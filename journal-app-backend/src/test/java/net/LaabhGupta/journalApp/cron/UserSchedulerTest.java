package net.LaabhGupta.journalApp.cron;

import net.LaabhGupta.journalApp.scheduler.UserScheduler;
import net.LaabhGupta.journalApp.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserSchedulerTest {
    @Autowired
    private UserScheduler userScheduler;

    @Test
    public void testFetchUserAndSendEmail(){
        userScheduler.fetchUsersAndSendSaMail();
    }
}
