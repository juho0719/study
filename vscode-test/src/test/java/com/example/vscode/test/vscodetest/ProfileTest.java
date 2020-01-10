package com.example.vscode.test.vscodetest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;

import java.util.Collection;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;

public class ProfileTest {
	private Profile profile;
	private BooleanQuestion question;
	private Criteria criteria;

	int[] ids(Collection<Answer> answers) {
		return answers.stream().mapToInt(a -> a.getQuestion().getId()).toArray();
	}

	@Before
	public void create() {
		profile = new Profile("Bull Hockey, Inc.");
		question = new BooleanQuestion(1, "Got bonuses?");
		criteria = new Criteria();
	}

	@Test
	public void matchAnswersFalseWhenMustMatchCriteriaNotMet() {
		profile.add(new Answer(question, Bool.FALSE));
		criteria.add(new Criterion(new Answer(question, Bool.TRUE), Weight.MustMatch));

		boolean matches = profile.matches(criteria);

		assertFalse(matches);
	}

	@Test
	public void matchAnswersTrueForAnyDontCareCriteria() {
		profile.add(new Answer(question, Bool.FALSE));
		criteria.add(new Criterion(new Answer(question, Bool.TRUE), Weight.DontCare));

		boolean matches = profile.matches(criteria);

		assertTrue(matches);
	}

	@Test
	public void findAnswerBasedOnPredicate() {
		profile.add(new Answer(new BooleanQuestion(1, "1"), Bool.FALSE));
		profile.add(new Answer(new PercentileQuestion(2, "2", new String[] {}), 0));
		profile.add(new Answer(new PercentileQuestion(3, "3", new String[] {}), 0));

		List<Answer> answers = profile.find(a -> a.getQuestion().getClass() == PercentileQuestion.class);

		assertThat(ids(answers), equalTo(new int[] { 2, 3 }));
	}
}