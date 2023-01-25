// import '../styles/style.css'
// import * as d3 from 'd3';
// import { style } from 'd3';


// fetch('https://opensheet.elk.sh/1ruaa1MeV_-utrSGHXwmI_JoY_64e90BBS_UswFq9vmE/loss')
// 	.then(res => res.json())
// 	.then(data => {
// 		const dataResults = []

// 		data.forEach(item => {
//             dataResults.push({year: item["YEAR"], revenue: item["Total lost revenue"]})
//         })

// 		console.log(dataResults)
// });



// -------------------------------------



// GRAPH

const india = [
	{group: "Dividends", value: 7.5},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 10}
 ];
 
 const italy = [
	 {group: "Dividends", value: 15},
	 {group: "Interests", value: 10},
	 {group: "Royalties", value: 10}
 ];
 
 const macau = [
	 {group: "Dividends", value: 10},
	 {group: "Interests", value: 10},
	 {group: "Royalties", value: 10}
 ];
 
 const mauritius = [
	 {group: "Dividends", value: 8},
	 {group: "Interests", value: 8},
	 {group: "Royalties", value: 5}
 ];
 
 const southafrica = [
	 {group: "Dividends", value: 8},
	 {group: "Interests", value: 8},
	 {group: "Royalties", value: 5}
 ];
 
 const uae = [
	 {group: "Dividends", value: 0},
	 {group: "Interests", value: 0},
	 {group: "Royalties", value: 0}
 ];
 
 const vietnam = [
	 {group: "Dividends", value: 10},
	 {group: "Interests", value: 10},
	 {group: "Royalties", value: 10}
 ];
 
 const portugal = [
	 {group: "Dividends", value: 10},
	 {group: "Interests", value: 10},
	 {group: "Royalties", value: 0}
 ];
 
 const botswana = [
	 {group: "Dividends", value: 0},
	 {group: "Interests", value: 10},
	 {group: "Royalties", value: 10}
 ];
 
 const margin = {top: 30, right: 30, bottom: 70, left: 60},
	 width2 = 460 - margin.left - margin.right,
	 height2 = 400 - margin.top - margin.bottom;
 
 const svg2 = d3.select("#ratesgraphic")
	 .attr("width", width2 + margin.left + margin.right)
	 .attr("height", height2 + margin.top + margin.bottom)
	 .append("g")
	 .attr("transform", `translate(${margin.left},${margin.top})`);
 
 const x = d3.scaleLinear()
   .domain([0, 20])
   .range([ 0, width2])
 svg2.append("g")
   .attr("transform", `translate(0,${height2})`)
   .call(d3.axisBottom(x))
   .append("text")
   .html("Percentage")
   .style("fill", "white")
   .attr("y", "40")
   .attr("x", "185")
 
 const y = d3.scaleBand()
   .range([ height2, 0 ])
   .domain(india.map(d => d.group))
   .padding(0.2);
 svg2.append("g")
   .attr("class", "myYaxis")
   .call(d3.axisLeft(y));
 
 function update(data) {
 
   var u = svg2.selectAll("rect")
	 .data(data)
 
   u
	 .join("rect")
	 .transition()
	 .duration(1000)
	   .attr("x", 0)
	   .attr("y", d => y(d.group))
	   .attr("height", y.bandwidth())
	   .attr("width", function(d) {
	   return x(d.value);
	 })
   svg2.select("rect:nth-of-type(3)")
   .attr("fill", '#007368')
   svg2.select("rect:nth-of-type(2)")
   .attr("fill", 'black')
   svg2.select("rect:nth-of-type(1)")
   .attr("fill", '#FFE200')
   svg2.append("rect")
   .attr("x", 0)
   .attr("y", 18.75)
   .attr("height", 75)
   .attr("width", 370)
   .attr("fill", "none")
   .attr("stroke", "#007368")
 
   svg2.append("rect")
   .attr("x", 0)
   .attr("y", 112.5)
   .attr("height", 75)
   .attr("width", 370)
   .attr("fill", "none")
   .attr("stroke", "black")
 
   svg2.append("rect")
   .attr("x", 0)
   .attr("y", 206.25)
   .attr("height", 75)
   .attr("width", 370)
   .attr("fill", "none")
   .attr("stroke", "#FFE200")
 
 
 }
 
 update(india)
 
 // MAP 1
 
 const width = 900
 const height = 450 
 
 const svg = d3.select("#map1").attr('width', width).attr('height', height)
 
 const projection = d3.geoNaturalEarth1()
	 .scale(width / 1.7 / Math.PI)
	 .translate([width / 2.20, height / 1.65])
 
 const dtacountries = ["Portugal", "Mauritius", "Italy", "United Arab Emirates", "South Africa", "Macao", "India", "Vietnam"]
 const forcecountries = ["Botswana", "Ethiopia"]
 const negotiationscountrys = ["Netherlands", "Turkey", "Seychelles"]
 
 // d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then( function(data) {
 
 d3.json("../map.json").then( function(data) {
 
	 const Tooltip = d3.select("body")
	 .append("div")
	 .attr("class", "tooltip")
	 .style("position", "absolute")
	 .style("opacity", 0)
	 .style("color", "white")
	 .style("background-color", "black")
	 .style("padding", "1em")
	 .style("border", "2px black solid")
	 .style("font-weight", "bold")
 
	 function mouseOver(e,d) {
 
		 if(dtacountries.includes(d.properties.name)) {
				 Tooltip.style("opacity", 1)
				 d3.select(this)
					 .style("fill", "white")
				 d3.select(".tooltip")
				 .html(`<h5>${d.properties.name}</h5><h6>Total loss as result of DTA: $${d.properties.total}</h6>`)
			 } else {
				 console.log("fout")
			 }
		 if(forcecountries.includes(d.properties.name) || negotiationscountrys.includes(d.properties.name) || d.properties.name == "Mozambique") {
				 Tooltip.style("opacity", 1)
				 d3.select(this)
					 .style("fill", "white")
				 d3.select(".tooltip")
				 .html(`<h5>${d.properties.name}</h5>`)
			 } else {
				 console.log("fout")
			 }
	 }
 
	 function mouseMove (e) {
		 d3.select(".tooltip")
			 .style("left", e.pageX + 15 + "px")
			 .style("top", e.pageY + 15 + "px")
	 }
 
	 function mouseOut (e, d) {
		 if(dtacountries.includes(d.properties.name)) {
			 d3.select(this)
				 .style("fill", "#E5002C")
		 }
		 if(forcecountries.includes(d.properties.name)) {
			 d3.select(this)
				 .style("fill", "#FFE200")
		 } 
		 if(negotiationscountrys.includes(d.properties.name)) {
			 d3.select(this)
				 .style("fill", "#007368")
		 }
		 if(d.properties.name == "Mozambique") {
			 d3.select(this)
				 .style("fill", "black")
		 }
		 else {
			 console.log("fout")
		 }
		 d3.select(".tooltip")
			 .style("opacity", 0)
	 }
 
	 svg.append("g")
		 .selectAll("path")
		 .data(data.features)
		 .join("path")
			 .attr("d", d3.geoPath()
			 .projection(projection)
			 )
			 .attr("fill", function (d) {
				 if(dtacountries.includes(d.properties.name)) {
					 return "#E5002C"
				 } 
				 if(forcecountries.includes(d.properties.name)) {
					 return "#FFE200"
				 }
				 if(negotiationscountrys.includes(d.properties.name)) {
					 return "#007368"
				 }
				 if(d.properties.name == "Mozambique") {
					 return "black"
				 }
				 else {
					return "#3D5A5B"
				}
			})
			.style("stroke", "white")
			.style("stroke-width", 0.5)
			.on("mouseover touchstart", mouseOver )
			.on("mousemove", mouseMove)
			.on("mouseout", mouseOut)
 })
 
 var svg3 = d3.select("#legend")
 
 svg3.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#E5002C")
 svg3.append("circle").attr("cx",10).attr("cy",40).attr("r", 6).style("fill", "#FFE200")
 svg3.append("circle").attr("cx",10).attr("cy",70).attr("r", 6).style("fill", "#007368")
 svg3.append("text").attr("x", 30).attr("y", 10).text("Tax treaty").style("font-size", "15px").style("fill", "#fff").attr("alignment-baseline","middle")
 svg3.append("text").attr("x", 30).attr("y", 40).text("Not yet ratified").style("font-size", "15px").style("fill", "#fff").attr("alignment-baseline","middle")
 svg3.append("text").attr("x", 30).attr("y", 70).text("In negotiation").style("font-size", "15px").style("fill", "#fff").attr("alignment-baseline","middle")


// -------------------------------


// const screen1 = document.querySelector("#screen1");
// const screen2 = document.querySelector("#screen2");
// const screen3 = document.querySelector("#screen3");
// const screen4 = document.querySelector("#screen4");
// const screen5 = document.querySelector("#screen5");


// const button4 = document.querySelector("#time4");
// button4.addEventListener("click", chooseTime4);
// const button6 = document.querySelector("#time6");
// button6.addEventListener("click", chooseTime6);
// const button10 = document.querySelector("#time10");
// button10.addEventListener("click", chooseTime10);
// const button13 = document.querySelector("#time13");
// button13.addEventListener("click", chooseTime13);


// function chooseTime4() {
// 	screen2.classList.remove("show");
// 	screen3.classList.remove("show");
// 	screen4.classList.remove("show");
// 	screen5.classList.remove("show");
// 	screen2.classList.add("show");
// 	screen3.classList.add("hide");
// 	screen4.classList.add("hide");
// 	screen5.classList.add("hide");
// }

// function chooseTime6() {
// 	screen2.classList.remove("show");
// 	screen3.classList.remove("show");
// 	screen4.classList.remove("show");
// 	screen5.classList.remove("show");
// 	screen2.classList.add("show");
// 	screen3.classList.add("show");
// 	screen4.classList.add("hide");
// 	screen5.classList.add("hide");
// }

// function chooseTime10() {
// 	screen2.classList.remove("show");
// 	screen3.classList.remove("show");
// 	screen4.classList.remove("show");
// 	screen5.classList.remove("show");
// 	screen2.classList.add("show");
// 	screen3.classList.add("show");
// 	screen4.classList.add("show");
// 	screen5.classList.add("hide");
// }

// function chooseTime13() {
// 	screen2.classList.remove("show");
// 	screen3.classList.remove("show");
// 	screen4.classList.remove("show");
// 	screen5.classList.remove("show");
// 	screen2.classList.add("show");
// 	screen3.classList.add("show");
// 	screen4.classList.add("show");
// 	screen5.classList.add("show");
// }
	

// -------------------------------------


function myFunction() {
	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
}


// -------------------------------------



let body = document.querySelector('body');

let observer1 = new IntersectionObserver(callback1);
let observer2 = new IntersectionObserver(callback2);
let observer3 = new IntersectionObserver(callback3);
let observermap = new IntersectionObserver(callbackmap);
let observer4 = new IntersectionObserver(callback4);
let observer5 = new IntersectionObserver(callback5);
let observer6 = new IntersectionObserver(callback6);

let target1 = document.querySelector('#screen1');
let target2 = document.querySelector('#screen2');
let target3 = document.querySelector('#screen3');
let targetmap = document.querySelector('#screenmap');
let target4 = document.querySelector('#screen4');
let target5 = document.querySelector('#screen5');
let target6 = document.querySelector('#screen6');

observer1.observe(target1);
observer2.observe(target2);
observer3.observe(target3);
observermap.observe(targetmap);
observer4.observe(target4);
observer5.observe(target5);
observer6.observe(target6);

function callback1(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen1.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        }
    });
}

function callback2(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = '';
			body.style.backgroundColor = "#3D5A5B";
			// body.style.backgroundImage = "url(../images/screen21.png)"
			// body.style.backgroundSize = "cover";
			// body.style.backgroundRepeat = "no-repeat";
			// body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callback3(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen3.jpg)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callbackmap(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			console.log('kaas');
			body.style.backgroundImage = '';
			body.style.backgroundColor = "#3D5A5B";
        } 
    });
}

function callback4(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundColor = "#3D5A5B";
			// body.style.backgroundImage = "url(../images/screen4.jpg)"
			// body.style.backgroundSize = "cover";
			// body.style.backgroundRepeat = "no-repeat";
			// body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callback5(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen5.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callback6(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/banner1.jpeg)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}



// ------------------------------------------------



let observer21 = new IntersectionObserver(callback21);
let observer22 = new IntersectionObserver(callback22);
let observer23 = new IntersectionObserver(callback23);

let target21 = document.querySelector('#screen21');
let target22 = document.querySelector('#screen22');
let target23 = document.querySelector('#screen23');

observer21.observe(target21);
observer22.observe(target22);
observer23.observe(target23);

function callback21(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen21.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        }
    });
}

function callback22(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen22.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callback23(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen23.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}



// ------------------------------------------------



let observer41 = new IntersectionObserver(callback41);
let observer42 = new IntersectionObserver(callback42);

let target41 = document.querySelector('#screen43');
let target42 = document.querySelector('#screen42');

observer41.observe(target41);
observer42.observe(target42);

function callback41(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen41.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        }
    });
}

function callback42(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen42.png)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}