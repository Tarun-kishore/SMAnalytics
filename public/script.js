let label = []
let val = []
let Symb, finalDate
let max1 = 0, min1 = 100000;

const searchInput = document.querySelector('.search');
const date = document.querySelector('#date');
searchInput.addEventListener('keyup', async function (e) {
	if (e.key === 'Enter') {

		await fetch('/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				code: this.value
			})
		}).then(res => res.json()).then(data1 => {
			if (data1['message'] === "You have exceeded the rate limit per minute for your plan, BASIC, by the API provider") {
				alert("Try after Sometime")
				Symb = ''
				return;
			}
			if (data1['Error Message'] === "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_INTRADAY.") {
				alert("Wrong equity symbol")
				Symb = ''
				return;
			}

			const data = data1['Time Series (30min)']
			for (var value in data) {

				if (!data.hasOwnProperty(value)) continue
				var temp = data1['Meta Data']
				var temp2 = temp['3. Last Refreshed']
				Symb = temp['2. Symbol']
				finalDate = temp2.split(' ')[0]
				date.innerHTML = `<h5>${finalDate}</h5>`
				if (!value.includes(finalDate)) continue
				let a = value.split(' ')[1]
				label.push('')
				label.push('')
				label.push('')
				label.push(a)

				var arr = data[value]
				if (toInt(arr['2. high']) > max1)
					max1 = toInt(arr['2. high'])
				if (toInt(arr['3. low']) < min1)
					min1 = toInt(arr['3. low'])
				for (var value1 in arr) {
					if (value1 === '5. volume') continue
					let num = toInt(arr[value1])
					val.push(num)
				}
			}
		})

		if (Symb === '') return

		label.reverse()

		var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
			type: 'line',

			data: {
				labels: label,
				datasets: [{
					fill: 'origin',
					label: Symb + " Stocks",
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: val
				}]
			},

			// Configuration options go here
			options: {
				scales: {
					yAxes: [{
						ticks: {
							min: parseFloat(min1)
							// max: max1 +1,
							// 	precision : 1,
							// 	stepSize:0.5
						}
					}]
				}

			}
		});
	}
})


function toInt(str) {
	let power = 2, sum = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i] == '.') {
			power = -1;
			continue
		}

		sum += (str[i]) * Math.pow(10, power)
		power--;
	}
	sum = sum.toFixed(4)
	return sum
}
