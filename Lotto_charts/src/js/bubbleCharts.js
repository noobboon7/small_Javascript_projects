export default () => {
let dataFromSelectedNumbers;
const data = {
	datasets: [
		{
			label: "Lottery Numbers frequency by date",
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			data: dataFromSelectedNumbers,
		},
	],
};

const config = {
	type: "bubble",
	data: data,
	options: {},
};
const myChart = new Chart(document.getElementById("myChart"), config);
};