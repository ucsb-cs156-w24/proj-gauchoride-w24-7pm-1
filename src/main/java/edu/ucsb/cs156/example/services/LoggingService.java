package edu.ucsb.cs156.example.services;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;


import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.models.SystemInfo;
import edu.ucsb.cs156.example.services.CurrentUserService;
import edu.ucsb.cs156.example.services.SystemInfoService;

import java.lang.reflect.Method;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Service
public class LoggingService {

    public Method findMethod(Method [] methods, String methodName) {
        int count = 0;
        Method result = null;
        for (var m: methods) {
          if (m.getName().equals(methodName)) {
            count++;
            result = m;
          }
        }
        if (count > 1) {
          String className = result.getDeclaringClass().getName();
          log.warn("Multiple methods found with duplicate name in {}",className);
        }
        return result;
      }
    
      public String toString(String [] array) {
        return Arrays.asList(array).toString();
      }
    
      public void logMethod()  {
    
        // get stack trace element of the calling method
        StackTraceElement ste = new Throwable().getStackTrace()[1];
    
        String nameOfCallingMethod = ste.getMethodName();
        String classOfCallingMethod = ste.getClassName();
      
        String filename = ste.getFileName();
        int lineNumber = ste.getLineNumber();
    
        Class<?>[] empty = null;
        String simpleClassName = "";
        String path = "";
        String httpMethod = "";
    
        try {
          Class<?> klass = Class.forName(classOfCallingMethod);
    
          if (klass.isAnnotationPresent(RequestMapping.class)) {
            RequestMapping rm = klass.getAnnotation(RequestMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
          }
    
          Method m = findMethod(klass.getMethods(),nameOfCallingMethod);
    
          simpleClassName = klass.getSimpleName();
          if (m.isAnnotationPresent(RequestMapping.class)) {
            RequestMapping rm = m.getAnnotation(RequestMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
            httpMethod = rm.method().toString();
          } else if (m.isAnnotationPresent(GetMapping.class)) {
            GetMapping rm = m.getAnnotation(GetMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
            httpMethod = "GET";
          } else if (m.isAnnotationPresent(PostMapping.class)) {
            PostMapping rm = m.getAnnotation(PostMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
            httpMethod = "POST";
          } else if (m.isAnnotationPresent(DeleteMapping.class)) {
            DeleteMapping rm = m.getAnnotation(DeleteMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
            httpMethod = "DELETE";
          } else if (m.isAnnotationPresent(PutMapping.class)) {
            PutMapping rm = m.getAnnotation(PutMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
            httpMethod = "PUT";
          }  else if (m.isAnnotationPresent(PatchMapping.class)) {
            PatchMapping rm = m.getAnnotation(PatchMapping.class);
            String thisPath = toString(rm.path());
            String thisValue = toString(rm.value());
            if (!thisPath.equals("[]")) { path += thisPath; }
            if (!thisValue.equals("[]")) { path += thisValue; }
            httpMethod = "PATCH";
          }
        } catch (ClassNotFoundException cnfe) {
          log.error("ClassNotFoundException in logMethod()",cnfe);
        }
    
        log.info("CONTROLLER: {} {} {}.{} (\"{}\", line {})",httpMethod,path,simpleClassName,nameOfCallingMethod,filename,lineNumber);
      }
    
}
