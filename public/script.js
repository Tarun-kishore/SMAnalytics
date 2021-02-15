const codes = [];

async function displayMatches(e) {
	suggestions.innerHTML = '';
	if (e.key === 'Enter') return
	if(this.value === '') return
    const keyword = this.value
    await fetch('/option',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            keywords: keyword
        })
    })
      .then(blob => blob.json())
      .then(data => {
		//   console.log(data['bestMatches'])
          let t = data['bestMatches']
		  for(var value in t) {
			if(!t.hasOwnProperty(value)) continue
				codes.push(t[value])
				// console.log(codes)
			}
					
      });
	  function findMatches(wordToMatch, codes) {
		return codes.filter(place => {
		  // here we need to figure out if the city or state matches what was searched
		  const regex = new RegExp(wordToMatch, 'gi');
		  return place['1. symbol'].match(regex) || place['2. names'].match(regex)
		});
	  }

// console.log(cities)
const matchArray = findMatches(this.value, codes);  
//   const matchArray = codes;
//   console.log(matchArray)
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    // console.log(place)

    // console.log(place['1. symbol'])
	
	const Sym = place['1. symbol'].replace(regex, `<span class="hl">${this.value}</span>`);
    const name = place['2. name'].replace(regex, `<span class="hl">${this.value}</span>`);
    // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${Sym}, ${name}</span>
        </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

let label = []
let val = []
let Symb
let max1=0,min1=100000;

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('change', () =>{
	suggestions.innerHTML = '';
});
// let values
searchInput.addEventListener('keyup',async function (e) {
    if (e.key === 'Enter') {
		suggestions.innerHTML = '';

		await fetch('/search',{
			        method:'POST',
			        headers:{
			            'Content-Type': 'application/json',
			            'Accept': 'application/json'
			        },
			        body: JSON.stringify({
			            code: this.value
			        })
				}).then(res => res.json()).then(data1 => {
					// values = data
					console.log(data1)
					// const arr = JSON.parse(data)
					if(data1['message'] === "You have exceeded the rate limit per minute for your plan, BASIC, by the API provider"){
						alert("Try after Sometime")
						Symb = ''
						return;
					}
					const data = data1['Time Series (30min)']
					for(var value in data) {
						
						if(!data.hasOwnProperty(value)) continue
						var temp = data1['Meta Data']
						var temp2 = temp['3. Last Refreshed']
							Symb = temp['2. Symbol']
							let final = temp2.split(' ')[0]
						if(!value.includes(final)) continue
						let a = value.split(' ')[1]
						label.push(a)
						label.push(a)
						label.push(a)
						label.push(a)
						
						var arr = data[value]
						if(toInt(arr['2. high']) > max1) 
						max1 = toInt(arr['2. high'])
						if(toInt(arr['3. low']) < min1) 
						min1 = toInt(arr['3. low'])
						for(var value1 in arr ) {
							if(value1 === '5. volume') continue
							let num = toInt(arr[value1])
							val.push(num)
						}
					}
				})
					if(Symb === '') return	  

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
				
			
			function toInt(str){
				let power =2,sum =0;
				for(var i=0; i < str.length ; i++){
		if(str[i] == '.') {
			power = -1;
			continue
		}
		
		sum += (str[i])*Math.pow(10,power)
		power--;
	}
	sum = sum.toFixed(4)
	return sum
}

searchInput.addEventListener('keyup', displayMatches);