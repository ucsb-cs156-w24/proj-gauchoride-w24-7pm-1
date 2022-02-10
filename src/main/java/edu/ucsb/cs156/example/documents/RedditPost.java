package edu.ucsb.cs156.example.documents;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class RedditPost {
    @Id
    private String _id;

    private String id;
    private String subreddit;
    private String selftext;
    private String selftext_html;
    private String title;
    private String author;
    private String url;
    private List<RedditFlair> link_flair_richtext;
}
