function postResult(
	languageName,
	accuracy,
	time,
	speed,
	maxSpeed,
	quantityAnswer,
	quantityСorrectAnswer,
	quantityMistakeAnswer,
) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/app/actions/result.php");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(
		"language=" +
			languageName +
			"&accuracy=" +
			accuracy +
			"&time=" +
			time +
			"&speed=" +
			speed +
			"&answer=" +
			quantityAnswer +
			"&correctAnswer=" +
			quantityСorrectAnswer +
			"&mistake=" +
			quantityMistakeAnswer,
	);
}
