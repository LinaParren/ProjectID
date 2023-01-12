const svg = d3.select("#map1"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

const projection = d3.geoNaturalEarth1()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2])

const link = [
	{type: "LineString", coordinates: [[255, 175], [190, 80]]}
	]

d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then( function(data) {

    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
            .projection(projection)
            )
            .style("stroke", "#fff")
			.attr("fill", function (d) {
				// Hier dataset
				if(d.properties.name == "Mozambique") {
				return "red"
				} else {
				   return "grey"
			   }
		   })

		   svg.selectAll("myPath")
		   .data(link)
		   .join("path")
			 .attr("d", function(d){ return path(d)})
			 .style("fill", "none")
			 .style("stroke", "blue")
			 .style("stroke-width", 3)
})

const svg2 = d3.select("#map2"),
  width2 = +svg.attr("width"),
  height2 = +svg.attr("height");

const path = d3.geoPath();
const projection2 = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width2 / 2, height2 / 2]);

let data = new Map()
const colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeReds[7]);

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

const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const screen3 = document.querySelector("#screen3");
const screen4 = document.querySelector("#screen4");
const screen5 = document.querySelector("#screen5");


const button4 = document.querySelector("#time4");
button4.addEventListener("click", chooseTime4);
const button6 = document.querySelector("#time6");
button6.addEventListener("click", chooseTime6);
const button10 = document.querySelector("#time10");
button10.addEventListener("click", chooseTime10);
const button13 = document.querySelector("#time13");
button13.addEventListener("click", chooseTime13);


function chooseTime4() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("hide");
	screen4.classList.add("hide");
	screen5.classList.add("hide");
}

function chooseTime6() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("show");
	screen4.classList.add("hide");
	screen5.classList.add("hide");
}

function chooseTime10() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("show");
	screen4.classList.add("show");
	screen5.classList.add("hide");
}

function chooseTime13() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("show");
	screen4.classList.add("show");
	screen5.classList.add("show");
}
	

