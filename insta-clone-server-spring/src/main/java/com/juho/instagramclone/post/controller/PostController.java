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

    @GetMapping("/regist")
    public ResponseEntity regist() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/delete")
    public ResponseEntity delete() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/update")
    public ResponseEntity update() {
        return ResponseEntity.ok().build();
    }
}
