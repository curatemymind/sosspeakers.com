// myComponent.js
import React from 'react';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";

const fup = ['orlando', 'sharanya', 'hello','orlando', 'sharanya', 'hello','orlando', 'sharanya', 'hello','orlando', 'sharanya', 'hello','orlando', 'sharanya', 'hello']

export default function myComponent() {
	const options = {
		size: 180,
		minSize: 20,
		gutter: 8,
		provideProps: true,
		numCols: 6,
		fringeWidth: 160,
		yRadius: 130,
		xRadius: 220,
		cornerRadius: 50,
		showGuides: false,
		compact: true,
		gravitation: 5
	}

	const children = fup.map((data, i) => {
		 return <div data={data} className="child" key={i}>{data}</div>
	});

	return (<BubbleUI options={options} className="myBubbleUI">
		{children}
	</BubbleUI>)
};