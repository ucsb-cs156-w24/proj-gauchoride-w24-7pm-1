package edu.ucsb.cs156.example.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import edu.ucsb.cs156.example.documents.RedditFlair;
import edu.ucsb.cs156.example.documents.RedditListing;
import edu.ucsb.cs156.example.documents.RedditListingData;
import edu.ucsb.cs156.example.documents.RedditPost;
import edu.ucsb.cs156.example.documents.RedditT3;

@RestClientTest(RedditFirstPostService.class)
public class RedditFirstPostServiceTests {
    @Autowired
    private MockRestServiceServer mockRestServiceServer;

    @Autowired
    private RedditFirstPostService redditFirstPostService;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void test_getRedditPost() throws JsonProcessingException {
        String subreddit = "UCSantaBarbara";

        String expectedURL = RedditFirstPostService.ENDPOINT.replace("{subreddit}", subreddit);

        RedditFlair rf = RedditFlair.builder()
                        .t("sampleT")
                        .e("sampleE")
                        .build();

        List<RedditFlair> lrf = new ArrayList<>();
        lrf.add(rf);
        
        RedditPost rp = RedditPost.builder()
                ._id("abcd1234")
                .id("wxyz123")
                .author("pconrad0")
                .title("A sample post")
                .selftext("This is a test.")
                .selftext_html("<p>This is a test.</p>")
                .subreddit("UCSantaBarbara")
                .link_flair_richtext(lrf)
                .build();

        RedditT3 rt3 = RedditT3.builder()
            .kind("t3")
            .data(rp)
            .build();

        List<RedditT3> lrt3 = new ArrayList<>();
        lrt3.add(rt3);
        
        RedditListingData rld = RedditListingData.builder()
            .children(lrt3)
            .dist(1)
            .build();
        
        RedditListing rl = RedditListing.builder()
            .kind("Listing")
            .data(rld)
            .build();

        String mockJSONFromReddit = mapper.writeValueAsString(rl);
        

        this.mockRestServiceServer.expect(requestTo(expectedURL))
                .andRespond(withSuccess(mockJSONFromReddit, MediaType.APPLICATION_JSON));

        RedditPost actualResult = redditFirstPostService.getRedditPost(subreddit);
        String actualResultAsJSON = mapper.writeValueAsString(actualResult);
        String expectedResultAsJSON = mapper.writeValueAsString(rp);
    
        assertEquals(expectedResultAsJSON, actualResultAsJSON);

    }
}