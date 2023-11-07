import { useState, useEffect } from "react";

const days = [];

for (let i = 0; i < 75; i++) {
	let day = new Date();
	let nextDay = new Date(day);
	nextDay.setDate(day.getDate() + i);

	let date = nextDay.toString();
	let dateArr = date.split(" ");
	days.push(`${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`);
}

function Challenge() {
	const [color, setColor] = useState(Array(days.length).fill("transparent"));
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		getIntialColors();
	}, []);

	function getIntialColors() {
		const receivedColors = getColors();
		console.log(receivedColors);
		setColor(receivedColors);
		const receivedProgress = countProgress(receivedColors);
		setProgress(receivedProgress);
	}

	const changeBg = (index) => {
		const newColors = [...color];
		newColors[index] =
			newColors[index] === "transparent" ? "olive" : "transparent";
		setColor(newColors);
		localStorage.setItem("arr", JSON.stringify(newColors));
		const count = countProgress(newColors);
		setProgress(count);
	};

	function countProgress(arr) {
		let count = 0;
		for (let i = 0; i < 75; i++) {
			if (arr[i] === "olive") count++;
		}
		return count;
	}

	function getColors() {
		return JSON.parse(localStorage.getItem("arr") || []);
	}

	return (
		<div className="p-4 bg-blue-200 w-fit m-auto flex flex-col items-center">
			<div className="flex justify-around w-full">
				<p className="font-bold text-lg">Challenge Title</p>
				<p className="font-bold text-lg">{progress}/75</p>
			</div>
			<div className="grid grid-cols-8">
				{days.map((day, index) => (
					<p
						onClick={() => changeBg(index)}
						style={{ backgroundColor: color[index] }}
						className="m-2 whitespace-nowrap cursor-pointer hover:bg-slate-400 w-fit p-2 rounded"
						key={index}
					>
						{day}
					</p>
				))}
			</div>
		</div>
	);
}

export default Challenge;
