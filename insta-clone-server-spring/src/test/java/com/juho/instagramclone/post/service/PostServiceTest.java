package com.juho.instagramclone.post.service;

import com.juho.instagramclone.post.dao.PostDao;
import com.juho.instagramclone.post.entity.Comment;
import com.juho.instagramclone.post.entity.Post;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@Slf4j
public class PostServiceTest {

//    @TestConfiguration
//    static class PostServiceTestContextConfiguration {
//    }
    @MockBean
    PostDao postDao;

    @Before
    public void setUp() {
        Post post = new Post();
        post.setWriter("Juho Kim");
        post.setContent("post example");

        List<Comment> comments = new ArrayList<>();
        Comment comment1 = new Comment();
        comment1.setWriter("guest1");
        comment1.setContent("comment1");
        comment1.setPost(post);
        comments.add(comment1);

        Comment comment2 = new Comment();
        comment2.setWriter("guest2");
        comment2.setContent("comment2");
        comment2.setPost(post);
        comments.add(comment2);

        post.setComments(comments);

        List<Post> list = new ArrayList<>();
        list.add(post);

        Mockito.when(postDao.findByWriter(post.getWriter()))
                .thenReturn(list);
    }

    @Test
    public void getPosts() {
        List<Post> posts = postDao.findByWriter("Juho Kim");
        Post post = posts.get(0);

        assertThat(post.getWriter()).isEqualTo("Juho Kim");
        assertThat(post.getContent()).isEqualTo("post example");
        assertThat(post.getComments().get(0).getWriter()).isEqualTo("guest1");
        assertThat(post.getComments().get(0).getContent()).isEqualTo("comment1");
        assertThat(post.getComments().get(1).getWriter()).isEqualTo("guest2");
        assertThat(post.getComments().get(1).getContent()).isEqualTo("comment2");
    }
}