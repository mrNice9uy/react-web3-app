import { Button, Card, Input, notification } from 'antd';
import React, { useState } from 'react';

import classes from './Wallet.module.css';

const Wallet = props => {
	const { currentAccount, onLogin } = props;
	const { TextArea } = Input;
	const [isConnected, setIsConnected] = useState(false);

	const detectProvider = () => {
		let provider;
		if (window.ethereum) {
			provider = window.web3.currentProvider;
		} else {
			notification['error']({
				message: 'Error!',
				description: 'No ethereum provider detected! Check out MetaMask',
			});
		}
		return provider;
	};

	const onClickHandler = async () => {
		const provider = detectProvider();
		try {
			setIsConnected(true);
			await provider.request({
				method: 'eth_requestAccounts',
			});
			setIsConnected(false);
			onLogin(provider);
		} catch (e) {
			notification['error']({
				message: 'Error!',
				description: e.message,
			});
		}
	};

	return (
		<Card className={classes.wrapper} title="MetaMask Wallet" bordered={true}>
			<Button type="primary" onClick={onClickHandler}>
				{isConnected ? 'Loading...' : 'Get public key'}
			</Button>
			<TextArea
				className={classes.output}
				value={isConnected ? 'MetaMask is locked - please login' : currentAccount}
			></TextArea>
		</Card>
	);
};

export default Wallet;
