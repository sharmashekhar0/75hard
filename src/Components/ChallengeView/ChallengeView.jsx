function ChallengeView({ challenge }) {
	return (
		<div className="flex justify-between items-center p-2 px-4 m-2 bg-blue-400 rounded">
			<p>{challenge.name}</p>
			<div className="flex gap-4">
				<p>Current Date</p>
				<p>{challenge.streak}/75</p>
			</div>
		</div>
	);
}

export default ChallengeView;
