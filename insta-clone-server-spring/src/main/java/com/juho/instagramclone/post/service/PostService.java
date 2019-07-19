package com.juho.instagramclone.post.service;

import com.juho.instagramclone.post.dao.PostDao;
import com.juho.instagramclone.post.entity.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostService {

    PostDao postDao;

    public List<Post> getPosts(String userId) {
        return postDao.findByWriter(userId);
    }
}
