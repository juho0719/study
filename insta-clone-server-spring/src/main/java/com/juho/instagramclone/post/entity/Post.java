package com.juho.instagramclone.post.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Post {

    @Id
    @GeneratedValue
    Long id;

    @NotNull
    @Column
    String writer;

    @NotNull
    @Column
    String profile;

    @NotNull
    @Column
    String content;

    @Column
    String images;

    @OneToMany(mappedBy = "post")
    List<Comment> comments = new ArrayList<>();
}
