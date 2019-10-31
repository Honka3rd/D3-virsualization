import React from "react";
import ReactDOM from "react-dom";
import LinerScale from "./LinerScale";
import LogarithmicScale from "./Logarithmic";
import ScaleOrdinal from "./ScaleOrdinal";
import BandScale from "./BandScale";
import MarginsAndGroups from "./MarginsAndGroups";
import AxesAndLabels from "./AxesAndLabels"
import StarBreak from './StarBreakProj/main';

const App = () => {
	return (
		<div>
			<StarBreak />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
