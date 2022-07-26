import { Provider } from 'react-redux';
import './App.css';
import store from './Redux/store';
import GitSearch from './Components/GitSearch';
import UserDetails from './Components/UserDetails';

function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<GitSearch />
				<UserDetails />
			</Provider>
		</div>
	);
}

export default App;
