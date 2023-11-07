function ChallengeView() {
	return (
		<div className="flex justify-between items-center px-4 bg-blue-900 text-white h-14 m-4 text-2xl rounded">
			<p>Challenge Title</p>
			<div className="flex items-center gap-8">
				<button className="bg-blue-950 px-4 rounded h-10">
					Current Day
				</button>
				<p>0/75</p>
			</div>
		</div>
	);
}

export default ChallengeView;
