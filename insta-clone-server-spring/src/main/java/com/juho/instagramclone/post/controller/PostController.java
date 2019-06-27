package com.juho.instagramclone.post.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController("/post")
public class PostController {

    @GetMapping("/list")
    public ResponseEntity getPosts() {
        return ResponseEntity.ok().build();
    }
}
