package com.juho.springaop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Aspect
public class AopTestAspect {

    @Around("execution(public String com.juho.springaop.AopTestController.testA(..)) && args(appKey,user)")
    public String testAspect(ProceedingJoinPoint pjp, String appKey, User user) {
        try {
            log.info("user : {}", user);
            String retVal = (String) pjp.proceed();
            System.out.println(retVal);
        } catch(Exception e) {
            log.error("exception!!");
        } catch(Throwable throwable) {
            throwable.printStackTrace();
            log.error("error!!!!");
            log.error(throwable.getMessage());
        }
        return "nope";
    }
}
