import React, { Component } from "react";
import * as $D from "d3";

class MarginsAndGroups extends Component {
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
		const xrange = 500;
		const yrange = 500;
		const margin = { left: 20, right: 10, top: 20, bottom: 10 };

		const svg = $D
			.select("#playGround")
			.append("svg")
			.attr("width", xrange)
			.attr("height", yrange);

		// create a group inside svg, move the group down and right
		let g = svg
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		const arr = this.building.map((elem) => {
			return elem.name;
		});

		let width = $D
			.scaleBand() // for text label
			.domain(arr)
			.range([0, xrange])
			.paddingOuter(0.2)
            .paddingInner(0.2);
            
        // function return number by passing a key
		let height = $D
			.scaleLinear() // for number
			.domain([
				0,
				$D.max(this.building, (bd) => {
					return bd.height;
				})
			])
			.range([0, 400]);
        
        // insert rects into group, they can be changed together.
		g.selectAll("rect")
			.data(this.building)
			.enter()
			.append("rect")
			.attr("x", (d, i) => {
				return width(d.name);
			})
			.attr("y", 50)
			.attr("fill", "blue")
			.attr("width", width.bandwidth) // bandWidth is a callback function
			.attr("height", (d, i) => {
				// linear map a new height
				return height(d.height);
			})
			.attr("stroke", "grey")
			.attr("stroke-width", "5px");
	}
	componentDidUpdate() {}
	render() {
		return (
			<div>
				<div id='playGround'></div>
			</div>
		);
	}
}

export default MarginsAndGroups;
