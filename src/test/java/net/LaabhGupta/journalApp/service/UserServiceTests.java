package net.LaabhGupta.journalApp.service;

import net.LaabhGupta.journalApp.entity.User;
import net.LaabhGupta.journalApp.repository.UserRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

//    @Disabled
    @ParameterizedTest
    @ValueSource(strings = {
            "Ram",
            "Shyam",
            "Vipul"
    })
    public void testFindByUserName(String user){
        assertNotNull(userRepository.findByUserName(user), "Failed for : " + user);
    }

    @ParameterizedTest
    @ArgumentsSource(UserArgumentsProvider.class)
    public void testSaveNewUser(User user){
        assertTrue(userService.saveNewUser(user));
    }

//    @Disabled
    @ParameterizedTest
    @CsvSource({
            "Ram",
            "Vipul"
    })
    public void testUserHasGeneralEntries(String user){
        assertFalse(userRepository.findByUserName(user).getJournalEntries().isEmpty());
    }
}
