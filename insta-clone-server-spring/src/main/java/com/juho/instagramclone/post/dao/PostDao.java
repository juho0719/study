package com.juho.instagramclone.post.dao;

import com.juho.instagramclone.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostDao extends JpaRepository<Post, Long> {
}
