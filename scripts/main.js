// import '../styles/style.css'
// import * as d3 from 'd3';
// import { style } from 'd3';




fetch('https://opensheet.elk.sh/1ruaa1MeV_-utrSGHXwmI_JoY_64e90BBS_UswFq9vmE/loss')
	.then(res => res.json())
	.then(data => {
		const dataResults = []

		data.forEach(item => {
            dataResults.push({year: item["YEAR"], revenue: item["Total lost revenue"]})
        })

		console.log(dataResults)
});

// MAP 1

const width = 780
const height = 450 

const svg = d3.select("#map1").attr('width', width).attr('height', height)

const projection = d3.geoNaturalEarth1()
    .scale(width / 1.7 / Math.PI)
    .translate([width / 2.10, height / 1.65])

const dtacountries = ["Portugal", "Mauritius", "Italy", "United Arab Emirates", "South Africa", "Macao", "India", "Vietnam"]

d3.json("../map.json").then( function(data) {

	const Tooltip = d3.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("position", "absolute")
	.style("opacity", 0)
	.style("color", "white")
	.style("background-color", "red")
	.style("padding", "1em")
	.style("border", "2px black solid")
	.style("font-weight", "bold")

	function mouseOver(e,d) {

		if(dtacountries.includes(d.properties.name)) {
				Tooltip.style("opacity", 1)
				d3.select(this)
					.style("fill", "#00cfb7")
				d3.select(".tooltip")
				.html(`<span>${d.properties.name}<br/>Loss: ${d.properties.test}</span>`)
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
				.style("fill", "red")
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
				// Hier dataset
				if(dtacountries.includes(d.properties.name)) {
				return "red"
				} else {
				   return "grey"
			   }
		   })
		   .on("mouseover touchstart", mouseOver )
		   .on("mousemove", mouseMove)
           .on("mouseout", mouseOut)
})

// MAP 2

const svg2 = d3.select("#map2"),
  width2 = +svg2.attr("width"),
  height2 = +svg2.attr("height");

const path = d3.geoPath();
const projection2 = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width2 / 2, height2 / 2]);

let data = new Map()
const colorScale = d3.scaleOrdinal().domain(data)
.range(["#e30513", "#970613", "#f18188", "#f9cbce"])
svg2.selectAll(".firstrow").data(data).enter().append("circle").attr("cx", function(d,i){return 30 + i*60}).attr("cy", 50).attr("r", 19).attr("fill", function(d){return myColor(d) })

Promise.all([
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),

// Hier dataset
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) {
    data.set(d.code, +d.pop)
})
]).then(function(loadData){
    let topo = loadData[0]

  svg2.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
      .attr("d", d3.geoPath()
        .projection(projection2)
      )
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
})


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

// Create the observer
let observer1 = new IntersectionObserver(callback1);
let observer2 = new IntersectionObserver(callback2);
let observer3 = new IntersectionObserver(callback3);
let observermap = new IntersectionObserver(callbackmap);
let observer4 = new IntersectionObserver(callback4);
let observer5 = new IntersectionObserver(callback5);
let observer6 = new IntersectionObserver(callback6);

// Target the element you want to observe
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
			body.style.backgroundImage = "url(../images/screen1.jpg)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        }
    });
}

function callback2(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen2.jpg)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
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
			body.style.backgroundColor = "red";
			body.style.backgroundImage = '';
			// body.style.backgroundImage = "url(../images/screen2.jpg)"
			// body.style.backgroundSize = "cover";
			// body.style.backgroundRepeat = "no-repeat";
			// body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callback4(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen4.jpg)"
			body.style.backgroundSize = "cover";
			body.style.backgroundRepeat = "no-repeat";
			body.style.backgroundAttachment = "fixed";
        } 
    });
}

function callback5(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
			body.style.backgroundImage = "url(../images/screen5.jpg)"
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