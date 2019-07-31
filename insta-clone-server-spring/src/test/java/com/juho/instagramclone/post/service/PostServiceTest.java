package com.juho.instagramclone.post.service;

import com.juho.instagramclone.post.dao.PostDao;
import com.juho.instagramclone.post.entity.Post;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class PostServiceTest {

//    @TestConfiguration
//    static class PostServiceTestContextConfiguration {
//
//    }

    @Before
    public void setUp() {
        List<Post> list = new ArrayList<>();
        Post post = new Post();
        post.setWriter("Juho Kim");
        post.setContent("post example");
        list.add(post);

        Mockito.when(postDao.findByWriter(post.getWriter()))
                .thenReturn(list);
    }

    @MockBean
    PostDao postDao;

    @Test
    public void getPosts() {
        List<Post> posts = postDao.findByWriter("Juho Kim");
        Post post = posts.get(0);

        assertThat(post.getWriter()).isEqualTo("Juho Kim");
        assertThat(post.getContent()).isEqualTo("post example");
    }

    @Test
    public void storePost() {

        Post post = new Post();
        post.setWriter("Jesica Oh");
        post.setContent("good job!");
        postDao.save(post);

        List<Post> resultPosts = postDao.findByWriter("Jesica Oh");
        Post resultPost = resultPosts.get(0);

        assertThat(resultPost.getWriter()).isEqualTo("Jesica Oh");
        assertThat(resultPost.getContent()).isEqualTo("good job!");
    }
}