import React, { Component } from "react";
import * as $D from "d3";

class DMap_1 extends Component {
	data = [25, 20, 10, 12, 15];

	componentDidMount() {
		const svg = $D
			.select("#playGround")
			.append("svg")
			.attr("width", 400)
			.attr("height", 400);

		// create shell for adding circle, which has data.length place to insert
		// The shell cannot be a const, otherwise the append will not work
		let circles = svg.selectAll("circle").data(this.data);

		// enter the shell and insert data.length circles
		circles
			.enter()
			.append("circle")
			.attr("cx", (d, index) => {
				return index * 50 + d;
			})
			.attr("cy", (d, index) => {
				return index * d + d;
			})
			.attr("r", (d, index) => {
				return d;
			})
			.attr("fill", "red");
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

export default DMap_1;
