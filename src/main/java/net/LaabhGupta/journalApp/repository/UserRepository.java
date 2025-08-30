package net.LaabhGupta.journalApp.repository;

import net.LaabhGupta.journalApp.entity.JournalEntry;
import net.LaabhGupta.journalApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByUserName(String username);
    void deleteByUserName(String username);
}
