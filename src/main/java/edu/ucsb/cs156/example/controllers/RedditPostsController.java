package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.collections.RedditPostsCollection;
import edu.ucsb.cs156.example.documents.RedditPost;
import edu.ucsb.cs156.example.services.RedditPostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Api(description = "Reddit Posts")
@RequestMapping("/api/redditposts")
@RestController
@Slf4j
public class RedditPostsController extends ApiController {

    @Autowired
    RedditPostsCollection redditPostsCollection;


    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "List all posts")
    @GetMapping("/all")
    public Iterable<RedditPost> allPosts() {
        Iterable<RedditPost> posts = redditPostsCollection.findAll();
        return posts;
    }

    @Autowired
    RedditPostService redditFirstPostService;
    @PreAuthorize("hasRole('ROLE_USER')")
    @ApiOperation(value = "Store one post from a subreddit of Reddit.com", notes = "")
    @PostMapping("/storeone")
    public ResponseEntity<RedditPost> getSubreddit(
            @ApiParam("subreddit, e.g. UCSantaBarbara") @RequestParam String subreddit) throws JsonProcessingException {
        log.info("getSubreddit: subreddit={}", subreddit);
        RedditPost rp = redditFirstPostService.getRedditPost(subreddit);
        RedditPost rpSaved = redditPostsCollection.save(rp);
        return ResponseEntity.ok().body(rpSaved);
    }
}