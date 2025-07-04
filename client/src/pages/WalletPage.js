import React, { useEffect, useState } from 'react';
import { getWalletBalance, fundWallet } from '../services/api';

function WalletPage() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const res = await getWalletBalance();
            setBalance(res.data.walletBalance);
        } catch (err) {
            setMessage('Error fetching balance');
        }
    };

    const handleFund = async (e) => {
        e.preventDefault();
        try {
            const res = await fundWallet({ amount: parseFloat(amount), token: 'tok_visa'});
            setMessage(res.data.message);
            fetchBalance();
        } catch (err) {
            setMessage('Funding failed');
        }
    };

    return (
    <div>
      <h2>Wallet</h2>
      <p>Current Balance: ${balance}</p>
      <form onSubmit={handleFund}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Fund Wallet</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );

}

export default WalletPage;