const URL = "https://data.ny.gov/resource/d6yy-54nr.json";

// REST API calls

//#region Rest GEt
export const getLottoNumbers = async () => {
	const response = await fetch(`${URL}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();

	return data;
};

//#endregion
//#region Future Feature

/* you can check if your numbers where ever chosen in the lottery system to check numbers hit*/
export const getWinningNumberDates = async (winningNumbersArray) => {
	const formattedNumbers = formatNumbersToString(winningNumbersArray);
	const response = await fetch(`${URL}?winning_numbers=${formattedNumbers}`);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const numberFoundObj = await response.json();

	return numberFoundObj;
};

/* make sure numbers are in 2 digit format  */
const formatNumbersToString = (numbersArray) => {
	let formatArr = numbersArray.map((number) =>
		number.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }),
	);
	return formatArr.join(" ").trim();
};
//#endregion
