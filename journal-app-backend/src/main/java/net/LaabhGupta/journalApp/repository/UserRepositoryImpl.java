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
        Criteria criteria = new Criteria();
        Query query = new Query();
        query.addCriteria(Criteria.where("email").regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z|A-Z]{2,6}$"));
        query.addCriteria(Criteria.where("sentimentAnalysis").is(true));
//      query.addCriteria(criteria.andOperator(
//            Criteria.where("email").exists(true),
//            Criteria.where("sentimentAnalysis").is(true)
//            )
//        );
        List<User> users = mongoTemplate.find(query, User.class);
        return users;
    }
}
