import React from 'react';
import { hot } from 'react-hot-loader/root';
import Home from './components/Home';
class App extends React.Component {
	render() {
		return (
			<>
				<Home />
			</>
		);
	}
}

export default hot(App);
