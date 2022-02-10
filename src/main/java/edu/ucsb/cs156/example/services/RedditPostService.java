package edu.ucsb.cs156.example.services;

import org.springframework.web.client.RestTemplate;

import edu.ucsb.cs156.example.documents.RedditListing;
import edu.ucsb.cs156.example.documents.RedditPost;

import org.springframework.boot.web.client.RestTemplateBuilder;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Slf4j
@Service
public class RedditPostService {

    ObjectMapper mapper = new ObjectMapper();

    private final RestTemplate restTemplate;

    public RedditPostService(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    public static final String ENDPOINT = "https://www.reddit.com/r/{subreddit}.json";

    public RedditPost getRedditPost(String subreddit) throws HttpClientErrorException, JsonProcessingException {

        log.info("subreddit={}", subreddit);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("User-Agent", "spring-boot:cs156-team01:s22 (by /u/pconrad0)");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        Map<String, String> uriVariables = Map.of("subreddit", subreddit);

        ResponseEntity<String> re = restTemplate.exchange(ENDPOINT, HttpMethod.GET, entity, String.class, uriVariables);
        String json = re.getBody();

        // Convert json to Object

        RedditListing redditListing = mapper.readValue(json, RedditListing.class);	

        RedditPost redditPost = redditListing.getData().getChildren().get(0).getData();

        return redditPost;
    }

}