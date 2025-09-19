package net.LaabhGupta.journalApp.repository;

import net.LaabhGupta.journalApp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import java.util.List;

public class UserRepositoryImpl {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<User> getUserForSA(){
        Query query = new Query();

        // FIX 2: Use andOperator for clarity and to ensure both criteria are applied together.
        query.addCriteria(new Criteria().andOperator(
                        // FIX 1: Corrected the regex to use [a-zA-Z] instead of [a-z|A-Z]
                        Criteria.where("email").regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"),
                        Criteria.where("sentimentAnalysis").is(true)
                )
        );
        return mongoTemplate.find(query, User.class);
    }
}