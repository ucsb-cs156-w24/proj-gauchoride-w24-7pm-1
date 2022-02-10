package edu.ucsb.cs156.example.documents;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class RedditListingData {
    private String after;
    private int dist;
    // leaving out "geo_filter" to illustrated that we can leave things out    
    private List<RedditT3> children;
    private String before;
}
