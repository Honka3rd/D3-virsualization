import React, { Component } from "react";
import * as $D from "d3";

class BandScale extends Component {
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
		const svg = $D
			.select("#playGround")
			.append("svg")
			.attr("width", 500)
			.attr("height", 500);

		const arr = this.building.map((elem) => {
			return elem.name;
		});

		let width = $D
			.scaleBand()
			.domain(arr)
			.range([0, 400])
			.paddingOuter(0.2)
			.paddingInner(0.2);

		let height = $D.scaleLinear().domain([
			0,
			$D.max(this.building, (bd) => {
				return bd.height;
			})
		]).range([0,400]);

		let bars = svg.selectAll("rect").data(this.building);

		bars
			.enter()
			.append("rect")
			.attr("x", (d, i) => {
				return width(d.name);
			})
			.attr("y", 50)
			.attr("fill", "blue")
			.attr("width", width.bandwidth)
			.attr("height", (d, i) => {
				// linear map a new height
				return height(d.height);
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
export default BandScale;
