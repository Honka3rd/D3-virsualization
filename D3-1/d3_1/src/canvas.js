import React, { Component } from "react";

class Canvas extends Component {
	componentDidMount() {}

	componentDidUpdate() {}

	render() {
		return (
			<div>
				<svg width='400' height='60'>
					<rect
						x='0'
						y='0'
						width='50'
						height='50'
						fill='green'
						stroke='grey'
						strokeWidth='5px'></rect>
                        <circle cx='90' cy='25' r='25' fill='red'></circle>
                        <ellipse cx="130" cy='25' rx="10" ry="25" fill="blue"></ellipse>
                        <line x1="160" y1="30" x2="190" y2="20" stroke="orange" strokeWidth="5px"></line>
                        <text x="250" y="25" textAnchor="end" fill="lightblue">The</text>
                        <text x="275" y="25" textAnchor="middle" fill="lightblue">Basic</text>
                        <text x="300" y="25" textAnchor="start" fill="lightblue">shape</text>
				</svg>
			</div>
		);
	}
}

export default Canvas;
