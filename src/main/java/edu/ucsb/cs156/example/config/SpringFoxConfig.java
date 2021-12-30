package edu.ucsb.cs156.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import static springfox.documentation.builders.PathSelectors.regex;

/**
 * Configuration for Swagger, a package that provides documentation
 * for REST API endpoints.
 * @see <a href="https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api">https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api</a>
 */

@Configuration
public class SpringFoxConfig {                                    
    @Bean
    public Docket api() { 
        return new Docket(DocumentationType.SWAGGER_2)
          .select()              
          .apis(RequestHandlerSelectors.any())    
          .paths(regex("/api/.*"))                      
          .build();                                           
    }
}