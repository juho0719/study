package com.juho.instagramclone.post.dao;

import com.juho.instagramclone.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostDao extends JpaRepository<Post, Long> {

    List<Post> findByWriter(String userId);
}
