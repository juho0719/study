package com.juho.springaop;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/test")
public class AopTestController {

    @RequestMapping("/a/{appKey}")
    public String testA(@PathVariable(value = "appKey") String appKey,
                        String test,
                        @RequestBody User user) throws Exception {
        
        if(StringUtils.isEmpty(user.getName())) {
            throw new Exception("AA");
        }

        if(StringUtils.isEmpty(user.getPhone())) {
            throw new Exception("BB");
        }

        return "success";
    }
}
