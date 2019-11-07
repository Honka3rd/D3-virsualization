import React, { Component } from "react";
import $ from "jquery";
import * as $D from "d3";

class LoopWithInterval extends Component {
	constructor() {
		super();
		this.toggleInc = true;
		this.bars = null;
		this.digitBar = null;
	}

	componentDidMount() {
		const svg = $D.select("#playground").append("svg");

		$("#playground svg").css({
			"margin-left": "auto",
			"margin-right": "auto",
			display: "block"
		});
		const height = 500;
		const width = 600;

		const g = svg
			.attr("height", height)
			.attr("width", width)
			.append("g");

		g.append("text")
			.attr("x", width / 2)
			.attr("y", height * 0.9)
			.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.text("Time line");

		g.append("text")
			.attr("x", -width * 0.1)
			.attr("y", height / 15)
			.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("transform", "rotate(-90)")
			.text("Revenue");

		const gx = g
			.append("g")
			.attr(
				"transform",
				"translate(" + width * 0.15 + "," + height * 0.8 + ")"
			);

		const gy = g
			.append("g")
			.attr(
				"transform",
				"translate(" + width * 0.15 + "," + -height * 0.01 + ")"
			);

		this.bars =	g.selectAll("rect");

		this.update(height, width, g, gx, gy);
		
		$D.interval(() => {
			this.update(height, width, g, gx, gy);
		}, 2000);
	}

	update = (height, width, g, gx, gy) => {
		$.getJSON("./revenues.json", (data) => {
			data.forEach((d) => {
				d.revenue = parseInt(d.revenue);
				d.profit = parseInt(d.profit);
			});
			this.toggleInc = !this.toggleInc;
			let flag = this.toggleInc === true ? "revenue" : "profit";

			let xrange = $D
				.scaleBand()
				.domain(
					data.map((d) => {
						return d.month;
					})
				)
				.range([0, width * 0.8])
				.paddingOuter(0.5)
				.paddingInner(0.2);

			let xAxisCall = $D.axisBottom(xrange);

			gx.call(xAxisCall);

			let yrange = $D
				.scaleLinear()
				.domain([
					0,
					$D.max(
						data.map((d) => {
							return d[flag];
						})
					)
				])
				.range([height * 0.8, 0]);

			let yAxisCall = $D
				.axisLeft(yrange)
				.ticks(data.length)
				.tickFormat((d) => {
					return d + "$";
				});

			gy.call(yAxisCall);
			
			this.digitBar = this.bars.data(data);
			g.selectAll('rect').remove();
			// this.digitBar.exit().remove();
			this.digitBar
				.enter()
				.append("rect")
				.attr("x", (d) => {
					return xrange(d.month)+height*0.2;
				})
				.attr("y", (d) => {
					return yrange(d[flag]);
				})
				.attr("width", xrange.bandwidth)
				.attr("height", (d) => {
					return height * 0.8 - yrange(d[flag]);
				})
				.attr("fill", "aliceblue");
		});
	};

	render() {
		const style = {
			marginLeft: "auto",
			marginRight: "auto",
			display: "block"
		};
		return (
			<div
				id='playground'
				style={{
					marginLeft: style.marginLeft,
					marginRight: style.marginRight,
					display: style.display
				}}></div>
		);
	}
}

export default LoopWithInterval;
