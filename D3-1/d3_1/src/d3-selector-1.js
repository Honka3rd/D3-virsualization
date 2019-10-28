import React, { Component } from "react";
import * as $D from "d3";

class DSelector_1 extends Component {
	componentDidMount() {
		$D.select("#canvas")
			.append("rect")
			.attr("x", 25)
			.attr("y", 0)
			.attr("width", 150)
			.attr("height", 50)
			.attr("fill", "blue");
	}

	componentDidUpdate() {}

	render() {
		return (
			<div>
				<svg id='canvas' width='400' height='60'></svg>
			</div>
		);
	}
}

export default DSelector_1;
