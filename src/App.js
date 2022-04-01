import { notification } from 'antd';
import { useState } from 'react';
import Web3 from 'web3';

import 'antd/dist/antd.min.css';
import './App.css';
import Wallet from './components/Wallet';

const App = () => {
	const [currentAccount, setCurrentAccount] = useState(null);

	const onLogin = async provider => {
		const web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();
		if (accounts.length === 0) {
			notification['error']({
				message: 'Error!',
				description: 'Plz connect to MetaMask!',
			});
		} else if (accounts[0] !== currentAccount) {
			setCurrentAccount(accounts[0]);
		}
	};

	return (
		<div className="App">
			<Wallet currentAccount={currentAccount} onLogin={onLogin} />
		</div>
	);
};

export default App;
