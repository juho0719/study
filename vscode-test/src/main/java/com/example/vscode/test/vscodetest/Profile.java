package com.example.vscode.test.vscodetest;

import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import com.jayway.jsonpath.Criteria;

import java.util.HashMap;

public class Profile {
	private Map<String, Answer> answers = new HashMap<>();
	private int score;
	private String name;

	public Profile(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void add(Answer answer) {
		answers.put(answer.getQuestionText(), answer);
	}

	public boolean matches(Criteria criteria) {
		score = 0;

		boolean kill = false;
		boolean anyMatches = false;
		for (Criterion criterion : criteria) {
			Answer answer = answers.get(criterion.getAnswer().getQuestionText());
			boolean match = criterion.getWeight() == Weight.Dontcare || answer.match(criterion.getAnswer());

			if (!match && criterion.getWeight() == Weight.MustMatch) {
				kill = true;
			}
			if (match) {
				score += criterion.getWeight().getValue();
			}
			anyMatches |= match;
		}
		if (kill) {
			return false;
		}
		return anyMatches;
	}

	public int score() {
		return score;
	}

	public List<Answer> find(Predicate<Answer> pred) {
		return answers.values().stream().filter(pred).collect(Collectors.toList());
	}
}