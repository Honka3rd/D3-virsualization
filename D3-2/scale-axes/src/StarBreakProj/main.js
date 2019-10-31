import React, { Component } from "react";
import * as $D from "d3";
import $ from "jquery";
import "./style.css";
import logo from "./logo.png";

class StarBreak extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}

	componentDidMount() {
		let revenue = [];
		const xrange = this.state.width / 1.2;
		const yrange = this.state.height / 1.5;

		$.getJSON("./revenues.json", (data) => {
			revenue = data;
			console.log(revenue);
			const svg = $D.select("#chart-area").append("svg");
			const g = svg
				.attr("width", xrange)
				.attr("height", yrange)
                .append("g");
            
            g.append("text").attr("x", xrange/2).attr("y", yrange*0.9).attr("text-anchor", "middle")
            .attr("font-size", "20px").text("Time line")
            
            g.append("text").attr("x", -xrange*0.1).attr("y", yrange*0.15).attr("text-anchor", "middle")
            .attr("font-size", "20px").attr("transform", "rotate(-90)").text("Revenue");

			let width = $D
				.scaleBand()
				.domain(
					revenue.map((re) => {
						return re.month;
					})
				)
				.range([0, xrange])
				.paddingOuter(0.5)
				.paddingInner(0.2);

			//console.log(width.bandwidth())

			let xAxisCall = $D.axisBottom(width);
			g.append("g")
				.attr(
					"transform",
					"translate(" + this.state.width * 0.04 + "," + yrange * 0.8 + ")"
				)
				.call(xAxisCall);

			let height = $D
				.scaleLinear()
				.domain([
					0,
					$D.max(
						revenue.map((re) => {
							return re.revenue;
						})
					)
				])
				.range([yrange * 0.8, 0]);

			let yAxisCall = $D
				.axisLeft(height)
				.ticks(revenue.length)
				.tickFormat((d) => {
					return d + "$";
				});
			g.append("g")
				.call(yAxisCall)
				.attr(
					"transform",
					"translate(" +
						this.state.width * 0.04 +
						"," +
						-this.state.height * 0.01 +
						")"
				);

			let bars = g.selectAll("rect").data(revenue);
			bars
				.enter()
				.append("rect")
				.attr("x", (d) => {
					return this.state.width * 0.04 + width(d.month);
				})
				.attr("y", (d) => {
					return height(d.revenue);
				})
				.attr("width", width.bandwidth)
				.attr("height", (d) => {
					return yrange * 0.8 - height(d.revenue);
				})
				.attr("fill", "green");
		});
	}

	render() {
		return (
			<div>
				<nav className='navbar navbar-default'>
					<div className='container'>
						<a className='navbar-brand' href='#'>
							<img id='logo' src={logo} />
						</a>
					</div>
				</nav>
				<div className='container'>
					<div className='row'>
						<div id='chart-area'></div>
					</div>
				</div>
			</div>
		);
	}
}

export default StarBreak;
