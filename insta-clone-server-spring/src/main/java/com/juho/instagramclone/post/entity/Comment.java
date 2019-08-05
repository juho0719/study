package com.juho.instagramclone.post.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Slf4j
@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue
    Long id;

    @NotNull
    @Column
    String writer;

    @NotNull
    @Column
    String content;

    @ManyToOne
    Post post;
}
