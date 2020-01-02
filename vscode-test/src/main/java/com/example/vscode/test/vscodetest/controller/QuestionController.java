package com.example.vscode.test.vscodetest.controller;

import java.time.Clock;

import org.springframework.data.domain.Persistable;

public class QuestionController {
	private Clock clock = Clock.systemUTC();

	public int addBooleanQuestion(String text) {
		return persist(new BooleanQuestion(text));
	}

	void setClock(Clock clock) {
		this.clock = clock;
	}

	private int persist(Persistable object) {
		object.setCreateTimestamp(clock.instant());
		executeInTransaction((em) -> em.persist(object));
		return object.getId();
	}
}