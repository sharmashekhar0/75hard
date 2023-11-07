import { useState } from "react";
import Challenge from "./Challenge";
import ChallengeView from "./challengeView";

function Hero() {
	return (
		<div className="min-h-screen bg-blue-100">
			<button className=" bg-cyan-400 p-2 m-4 rounded shadow">
				Create New Challenge
			</button>
			<ChallengeView />
		</div>
	);
}

export default Hero;
