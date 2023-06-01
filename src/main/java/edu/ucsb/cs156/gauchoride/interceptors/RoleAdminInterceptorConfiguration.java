package edu.ucsb.cs156.gauchoride.Interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Component
public class RoleAdminInterceptorConfiguration extends WebMvcConfigurationSupport {

    @Autowired
    private RoleAdminInterceptor roleAdminInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(roleAdminInterceptor);
    }

}