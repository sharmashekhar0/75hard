import { useEffect, useState } from "react";
import ChallengeView from "../ChallengeView/ChallengeView";
import { Link } from "react-router-dom";

function Home() {
	const [challenges, setChallenges] = useState(Array(0));

	useEffect(() => {
		handleLoadChallenges();
	}, []);

	function handleLoadChallenges() {
		const receivedChallenges = handleGetChallenges();
		setChallenges(receivedChallenges);
	}

	function handleShowChallenges() {
		console.log("Challenges", challenges);
	}

	function handleGenerateId() {
		return Math.floor(Math.random() * 100000);
	}

	function handleGetName() {
		const inputEl = document.querySelector("#challengeInput");
		const name = inputEl.value;
		return name;
	}

	function handleGetStartDate() {
		let startDate = new Date().toString().split(" ");
		startDate = `${startDate[1]} ${startDate[2]} ${startDate[3]}`;
		return startDate;
	}

	function handleInitializeProgress(challenge) {
		return Array(75).fill("lightblue");
	}

	function handleCountStreak(challenge) {
		return 0;
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

	function handleCreateNewChallenge() {
		const currentChallenges = handleGetChallenges();
		const challengeName = handleGetName();
		if (!challengeName) {
			alert("Challenge Name Required");
			return;
		}
		currentChallenges.push({
			id: handleGenerateId(),
			name: handleGetName(),
			startDate: handleGetStartDate(),
			progress: handleInitializeProgress(),
			streak: handleCountStreak(),
		});
		setChallenges(currentChallenges);
		handleSaveChallenges(currentChallenges);
	}

	function handleDeleteChallenge(id) {
		const allChallenges = [...challenges];
		const remainingChallenges = allChallenges.filter(
			(challenge) => id !== challenge.id
		);
		setChallenges(remainingChallenges);
		handleSaveChallenges(remainingChallenges);
		console.log(remainingChallenges);
	}

	return (
		<div className="min-h-screen">
			<div>
				<input
					id="challengeInput"
					className="border-2 m-2 p-1 shadow-lg border-blue-700 rounded "
					type="text"
					placeholder="Enter Challenge Name"
					required
				/>
				<button
					className="border-2 m-2 p-1 shadow-lg border-blue-700 rounded text-blue-700"
					onClick={handleCreateNewChallenge}
				>
					Create New Challenge
				</button>
			</div>
			{challenges.map((challenge, index) => {
				return (
					<div
						key={index}
						className="flex justify-center items-center"
					>
						<div className="flex-1">
							<Link to={`/challenge/${challenge.id}`}>
								<ChallengeView challenge={challenge} />
							</Link>
						</div>
						<button
							onClick={() => {
								handleDeleteChallenge(challenge.id);
							}}
							className="border p-2 m-2 rounded h-fit"
						>
							Delete
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
