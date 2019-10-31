import React, {Component} from 'react';
import * as $D from 'd3';

class ScaleAndAxes extends Component {
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
        
        // restrict or expand a height of an element in a certain range
        let restrictedY = $D.scaleLinear().domain([0,svg.attr("height")]).range([0, 200]);

		let bars = svg.selectAll("rect").data(this.building);

		bars
			.enter()
			.append("rect")
			.attr("x", (d, i) => {
				return i * 100;
			})
			.attr("y", 50)
			.attr("fill", "blue")
			.attr("width", 80)
			.attr("height", (d, i) => {
                // use estricted or expanded value as an output
				return restrictedY(d.height);
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

export default ScaleAndAxes;