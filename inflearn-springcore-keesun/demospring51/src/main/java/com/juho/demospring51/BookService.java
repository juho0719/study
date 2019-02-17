package com.juho.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class BookService {

    @Autowired
    BookRepository myBookRepository;

    public void printBookRepository() {
        System.out.println(myBookRepository.getClass());
    }

    @PostConstruct
    public void setup() {
        System.out.println(myBookRepository.getClass());
    }
}
