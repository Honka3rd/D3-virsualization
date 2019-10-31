import React, { Component } from "react";
import * as $D from "d3";

class ScaleOridinal extends Component {
	componentDidMount() {
        const arr = [1,2,3,4,5];
        const colors = $D.scaleOrdinal().domain(arr).range($D.schemeCategory10);
        for(let i=0; i<arr.length;i++){
            console.log(colors(i));
        }
    }

	render() {
		return null;
	}
}

export default ScaleOridinal;
