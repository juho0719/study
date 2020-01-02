package com.example.vscode.test.vscodetest.controller;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.util.Date;

import org.junit.jupiter.api.Test;

public class QuestionControllerTest {
	@Test
	public void questionAnswersDataAdded() {
		Instant now = new Date().toInstant();
		controller.setClock(Clock.fixed(now, ZoneId.of("Asia/Seoul")));
		int id = controller.addBooleanQuestion("text");

		Question question = controller.find(id);

		assertThat(question.getCreateTimestamp(), equalTo(now));
	}
}