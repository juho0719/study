package com.juho.instagramclone.post.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.juho.instagramclone.post.entity.Post;
import com.juho.instagramclone.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController("/post")
public class PostController {

    PostService postService;
    ObjectMapper objectMapper;

    @GetMapping("/{userId}/list")
    public ResponseEntity getPosts(@PathVariable("userId") String userId) throws JsonProcessingException {
        List<Post> posts = postService.getPosts(userId);
        return ResponseEntity.ok(objectMapper.writeValueAsString(posts));
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
