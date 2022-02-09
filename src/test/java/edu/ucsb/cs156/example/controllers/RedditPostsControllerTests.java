package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.RedditPostService;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.collections.RedditPostsCollection;
import edu.ucsb.cs156.example.collections.StudentCollection;
import edu.ucsb.cs156.example.documents.RedditFlair;
import edu.ucsb.cs156.example.documents.RedditListing;
import edu.ucsb.cs156.example.documents.RedditListingData;
import edu.ucsb.cs156.example.documents.RedditPost;
import edu.ucsb.cs156.example.documents.RedditT3;
import edu.ucsb.cs156.example.documents.Student;
import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.TodoRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = RedditPostsController.class)
@Import(TestConfig.class)
public class RedditPostsControllerTests extends ControllerTestCase {

        @MockBean
        RedditPostsCollection redditPostsCollection;

        @MockBean
        RedditPostService redditFirstPostService;

        @MockBean
        UserRepository userRepository;

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void api_redditposts_all__user_logged_in__returns_a_redditPost_that_exists() throws Exception {

                // arrange

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

                List<RedditPost> lrp = new ArrayList<>();
                lrp.add(rp);

                when(redditPostsCollection.findAll()).thenReturn(lrp);

                // act
                MvcResult response = mockMvc.perform(get("/api/redditposts/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(redditPostsCollection, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(lrp);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void api_redditposts_post__user_logged_in__storeone_adds_post_to_collection() throws Exception {

                // arrange

                RedditFlair rf = RedditFlair.builder()
                                .t("sampleT")
                                .e("sampleE")
                                .build();

                List<RedditFlair> lrf = new ArrayList<>();
                lrf.add(rf);

                RedditPost rp = RedditPost.builder()
                                ._id("")
                                .id("wxyz123")
                                .author("pconrad0")
                                .title("A sample post")
                                .selftext("This is a test.")
                                .selftext_html("<p>This is a test.</p>")
                                .subreddit("UCSantaBarbara")
                                .link_flair_richtext(lrf)
                                .build();

                String rpAsJson = mapper.writeValueAsString(rp);

                RedditPost savedRp = mapper.readValue(rpAsJson, RedditPost.class);
                savedRp.set_id("efgh5678");
                String savedRpAsJson = mapper.writeValueAsString(savedRp);

                when(redditPostsCollection.save(eq(rp))).thenReturn(savedRp);

                when(redditFirstPostService.getRedditPost(eq("UCSantaBarbara"))).thenReturn(rp);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/redditposts/storeone?subreddit=UCSantaBarbara")
                                                .with(csrf()))
                                .andExpect(status().isOk())
                                .andReturn();

                // assert

                verify(redditFirstPostService, times(1)).getRedditPost(eq("UCSantaBarbara"));
                verify(redditPostsCollection, times(1)).save(eq(rp));
                String responseString = response.getResponse().getContentAsString();
                assertEquals(savedRpAsJson, responseString);
        }

}
