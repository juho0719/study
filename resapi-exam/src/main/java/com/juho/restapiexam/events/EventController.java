package com.juho.restapiexam.events;

import org.springframework.hateoas.MediaTypes;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URI;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

@Controller
@RequestMapping(value = "/api/events", produces = MediaTypes.HAL_JSON_UTF8_VALUE)
public class EventController {

    @PostMapping
    public ResponseEntity createEvent(@RequestBody Event event) {

        URI createUri = linkTo(EventController.class).slash("{id}").toUri();
        event.setId(10);
        return ResponseEntity.created(createUri).body(event);
    }
}
