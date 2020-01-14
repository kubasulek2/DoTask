import React, { Component } from 'react';

import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';

class App extends Component {
	state = {}
	
	render() {
		return (
			<Layout />
		);
	}
}

export default WithStyles(App);