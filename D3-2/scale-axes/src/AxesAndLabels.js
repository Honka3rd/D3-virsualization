import React, { Component } from "react";
import * as $D from "d3";

class AxesAndLabels extends Component {
	constructor() {
		super();
		this.building = [
			{
				name: "Burj Khalifa",
				height: "350"
			},
			{
				name: "Shanghai Tower",
				height: "263.34"
			},
			{
				name: "Abraj Al-Bait Clock Tower",
				height: "254.04"
			},
			{
				name: "Ping An Finance Centre",
				height: "253.20"
			},
			{
				name: "Lotte World Tower",
				height: "230.16"
			}
		];
	}
	componentDidMount() {
		const margin = { left: 20, right: 20, top: 20, bottom: 10 };

		const svg = $D.select("#playGround").append("svg");

		const g = svg
			.attr("width", 500)
			.attr("height", 600)
			.append("g")
			// translate(x, y)
			.attr("transform", "translate(80,10)");

		g.append("text")
			.attr("x", 200)
			.attr("y", 550)
			.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.text("The building of the world");

		g.append("text")
			.attr("x", -50)
			.attr("y", -40)
			.attr("text-anchor", "middle")
            .attr("font-size", "20px")
            // when rotate -90 degrees x and y switch
			.attr("transform", "rotate(-90)")
			.text("Meters");

		const arr = this.building.map((elem) => {
			return elem.name;
		});

		let width = $D
			.scaleBand()
			.domain(arr)
			.range([margin.right, 400])
			.paddingOuter(0.2)
			.paddingInner(0.2);

		let xAxisCall = $D.axisBottom(width);

		g.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (400 + margin.top) + ")")
			.call(xAxisCall)
			.selectAll("text")
			.attr("y", margin.top)
			.attr("x", -margin.left)
			.attr("transform", "rotate(-40)");

		let height = $D
			.scaleLinear()
			.domain([
				0,
				$D.max(this.building, (bd) => {
					return bd.height;
				})
			])
			.range([400, 0]);

        // function    
		let yAxisCall = $D
			.axisLeft(height)
			.ticks(3)
			// d is in the output range of height
			.tickFormat((d) => {
				return d + "m";
			});

		g.append("g")
			.attr("class", "y axis")
			.call(yAxisCall);

		let bars = g.selectAll("rect").data(this.building);

		bars
			.enter()
			.append("rect")
			.attr("x", (d, i) => {
				return width(d.name);
			})
			.attr("y", (d)=>{return height(d.height)})
			.attr("fill", "blue")
			.attr("width", width.bandwidth)
			.attr("height", (d, i) => {
				// linear map a new height
				return 400 - height(d.height);
			})
			.attr("stroke", "grey")
			.attr("stroke-width", "5px");
	}
	render() {
		return (
			<div>
				<div id='playGround'></div>
			</div>
		);
	}
}

export default AxesAndLabels;
