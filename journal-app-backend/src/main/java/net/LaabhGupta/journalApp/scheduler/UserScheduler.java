package net.LaabhGupta.journalApp.scheduler;

import net.LaabhGupta.journalApp.cache.AppCache;
import net.LaabhGupta.journalApp.entity.JournalEntry;
import net.LaabhGupta.journalApp.entity.User;
import net.LaabhGupta.journalApp.enums.Sentiment;
import net.LaabhGupta.journalApp.repository.UserRepositoryImpl;
import net.LaabhGupta.journalApp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class UserScheduler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepositoryImpl userRepository;

    @Autowired
    private AppCache appCache;

    @Scheduled(cron = "0 0 9 * * SUN")
    public void fetchUsersAndSendSaMail(){
        List<User> users = userRepository.getUserForSA();
        for(User user: users){
            List<JournalEntry> journalEntries = user.getJournalEntries();
            List<Sentiment> sentiments = journalEntries.stream()
                    .filter(
                            x -> x.getDate().isAfter(
                                    LocalDateTime.now().minusDays(7)
                            )
                    )
                    .map(JournalEntry::getSentiment)
                    .toList();
            Map<Sentiment, Integer> sentimentCounts = new HashMap<>();
            for(Sentiment sentiment: sentiments){
                if(sentiment != null)
                    sentimentCounts.put(sentiment, sentimentCounts.getOrDefault(sentiment, 0) + 1);
            }
            Sentiment mostFrequentSentiment = null;
            int maxCount = 0;
            for(Map.Entry<Sentiment, Integer> entry : sentimentCounts.entrySet()){
                if(entry.getValue() > maxCount){
                    maxCount = entry.getValue();
                    mostFrequentSentiment = entry.getKey();
                }
            }
            if(mostFrequentSentiment != null){
                emailService.sendEmail(user.getEmail(), "Sentiment for last day", mostFrequentSentiment.toString());
            }
        }
    }

    @Scheduled(cron = "0 0/10 * ? * *")
    public void userAppCache(){
        appCache.init();
    }
}
