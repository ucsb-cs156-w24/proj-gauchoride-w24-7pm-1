package edu.ucsb.cs156.example.collections;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.example.documents.RedditPost;

@Repository
public interface RedditPostsCollection extends MongoRepository<RedditPost, ObjectId> {
 
}