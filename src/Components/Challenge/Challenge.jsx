import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Challenge() {
	const { id } = useParams();
	const [challenges, setChallenges] = useState("");
	const [challenge, setChallenge] = useState("");
	const [progress, setProgress] = useState(Array(0));
	const [dates, setDates] = useState(Array(75).fill(new Date()));

	useEffect(() => {
		const receivedChallenge = handleGetChallenge(id);
		console.log("Received = ", receivedChallenge.progress);
		setChallenge((prevChallenge) => {
			setProgress(receivedChallenge.progress);
			return receivedChallenge;
		});
		setProgress(receivedChallenge.progress);
	}, []);

	useEffect(() => {
		if (challenge.startDate !== undefined) {
			handleGenerateDates();
		}
	}, [challenge]);

	function handleGenerateDates() {
		const startDate = new Date(challenge.startDate);
		console.log(challenge.startDate);
		const dateCollection = [];

		for (let i = 0; i < 75; i++) {
			const nextDate = new Date(startDate);
			nextDate.setDate(startDate.getDate() + i);
			console.log("Next Date ", nextDate);
			dateCollection.push(new Date(nextDate)); // Push a copy of the date object
		}
		setDates(dateCollection);
		console.log(dates);
	}

	function handleProgressChange(index) {
		const newProgress = [...progress];

		if (newProgress[index] === "lightblue") {
			newProgress[index] = "olive";
		} else {
			newProgress[index] = "lightblue";
		}

		setProgress(newProgress);
		const newChallenge = challenge;
		newChallenge.progress = newProgress;
		newChallenge.streak = handleStreakCount(newProgress);
		setChallenge(newChallenge);
		console.log("New Challenge ", newChallenge);
		handleChallengeChange(newChallenge);
	}

	function handleStreakCount(progress) {
		let streak = 0;
		progress.forEach((element) => {
			if (element === "olive") {
				streak++;
			}
		});
		return streak;
	}

	function handleChallengeChange(modifiedChallenge) {
		const receivedChallenges = challenges.filter(
			(challenge) => challenge.id != modifiedChallenge.id
		);
		receivedChallenges.push(modifiedChallenge);
		setChallenges(receivedChallenges);
		handleSaveChallenges(challenges);
	}

	function handleGetChallenge(id) {
		const challenges = handleGetChallenges();
		setChallenges(challenges);
		const challenge = challenges.filter(
			(challenge) => challenge.id == id
		)[0];
		return challenge;
	}

	function handleSaveChallenges(challenges) {
		try {
			console.log("Challenges", challenges);
			localStorage.setItem("75hard", JSON.stringify(challenges));
		} catch (error) {
			console.error("Error saving challenges to localStorage:", error);
		}
	}

	function handleGetChallenges() {
		return JSON.parse(localStorage.getItem("75hard") || "[]");
	}

	function handleGetProgress(challenge) {
		return challenge.progress;
	}

	return (
		<div>
			<div className="flex justify-between p-2 bg-slate-200 m-1 rounded">
				<p>{challenge.name}</p>
				<p>{challenge.streak}/75</p>
			</div>
			<div className="grid grid-cols-6">
				{progress.map((date, index) => {
					return (
						<p
							key={index}
							onClick={() => {
								console.log("Clicked");
								handleProgressChange(index);
							}}
							className="bg-slate-100 p-2 m-1 rounded cursor-pointer"
							style={{
								backgroundColor: progress[index],
							}}
						>
							{dates[index].toLocaleDateString()}{" "}
							{/* Display the date */}
						</p>
					);
				})}
			</div>
		</div>
	);
}

export default Challenge;
