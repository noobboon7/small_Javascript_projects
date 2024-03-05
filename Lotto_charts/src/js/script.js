import { getLottoNumbers } from "./fetchPowerballNumbers.js";
// import bubbleChart from './bubbleCharts.js';
/*  description:
Powerball numbers have 01-69 range and 6 slots
The first five slot have the main game numbers and 6th slot is the powerball number
I speculate that each slot has a range the that it falls into between 01-69 

winning opportunities:
Powerball number = $4
1 number + powerball number = $4
2 number + powerball number = $7
3 number ==================== $7
3 number + powerball number = $100
4 number ================== = $100
4 number + powerball number = $50,000
5 number ================== = $1,000,000
5 number + powerball number = $Grand Prize (multi-million)

api documentation: http://dev.socrata.com/foundry/data.ny.gov/d6yy-54nr
*/

// const lottoNumbers = document.querySelectorAll(".lotto-list");
const lotteryData = JSON.parse(window.localStorage.getItem("data")) || [];

// checks if data is present else it will fetch data
const validateData = () => {
	// console.log(!lotteryData.length);
	if (!lotteryData.length) {
		try {
			getLottoNumbers().then((data) => {
				const cleanUp = cleanData(data);
				localStorage.setItem("data", JSON.stringify(cleanUp));
			});
		} catch (error) {
			console.error(error.message);
		}
	}
};

// console.log(typeof lotteryData);
const cleanData = (Data) => {
	let options = { year: "numeric", month: "short", day: "numeric" };
	let dayOption = { weekday: "long" };
	return Data.map((obj) => {
		return {
			numbers: obj.winning_numbers.split(" "),
			date: new Date(obj.draw_date).toLocaleDateString("en-US", options),
			weekday: new Date(obj.draw_date).toLocaleDateString("en-US", dayOption),
		};
	});
};
// console.log(lotteryData);

function addNum(obj) {
	ul.innerHTML += `Winning Numbers: ${obj.winning_numbers}
	\n Date: ${obj.draw_date}
	</li>`;
}

document.addEventListener("DOMContentLoaded", validateData);
// ///////////////below can have its own module////////////////
// all numbers minus the latest winning numbers;
// 999 would be the max, because api call is limited to 1000
let predictNumbers = lotteryData.map((obj) => obj.numbers).slice(1);
const columns = {},
	colCount = {}
	
// separate the numbers into columns
for (const arr of predictNumbers) {
	for (let i = 0; i < arr.length; i++) {
		columns[i + 1] ? columns[i + 1].push(arr[i]) : (columns[i + 1] = [arr[i]]);
	}
}

// create a count for of numbers in each column
for (const key in columns) {
	colCount[key] = columns[key].reduce((hash, num) => {
		hash[num] = (hash[num] || 0) + 1;
		return hash;
	}, {});
}

const percentPick = Object.assign({}, colCount);
const percentPickFromRange = Object.assign({}, colCount);

// create a probability chart of winning for each number
for (const colNum in percentPick) {
	for (const numDrawn in percentPick[colNum]) {
		percentPick[colNum][numDrawn] = Math.fround(percentPick[colNum][numDrawn] / 999) * 1600;
	}
}

// Percentage Math needs to be fixed 
// create a probability chart of winning for each number in a range of numbers of it's column
for (const colNum in percentPickFromRange) {
	for (const numDrawn in percentPickFromRange[colNum]) {
		percentPickFromRange[colNum][numDrawn] =  percentPickFromRange[colNum][numDrawn] /Object.keys(percentPickFromRange).length  * 1
	}
}

console.log(percentPick);
let sum = 0;
for (const key in percentPickFromRange[1]) {
	sum += percentPick[1][key];
	// console.log(key, percentPickFromRange[1][key]);
}
// for (const key in percentPickFromRange[1]) {
// 	sum += percentPickFromRange[1][key];
// 	// console.log(key, percentPickFromRange[1][key]);
// }
console.log(sum)
// for later
// set event listener to get lotto Numbers from API
// how to reload page once data is fetched and stored in local storage
