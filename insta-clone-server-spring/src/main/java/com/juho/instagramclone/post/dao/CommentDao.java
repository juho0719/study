package com.juho.instagramclone.post.dao;

import com.juho.instagramclone.post.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentDao extends JpaRepository<Comment, Long> {
}
