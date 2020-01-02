package com.example.vscode.test.vscodetest;

import java.util.*;

public class ScoreCollection {
	private List<Scoreable> scores = new ArrayList<>();

	public void add(Scoreable scoreable) {
		if (scoreable == null)
			throw new IllegalArgumentException();
		scores.add(scoreable);
	}

	public int arithmeticMean() {
		if (scores.size() == 0)
			return 0;
		int total = scores.stream().mapToLong(Scoreable::getScore).sum();
		return (int) (total / scores.size());
	}
}