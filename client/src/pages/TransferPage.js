import React, { useState, useEffect } from 'react';
import { transferMoney } from '../services/api';
import '../App.css';


function TransferPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [spaceCount, setSpaceCount] = useState(0);
  const [balances, setBalances] = useState({ sender: 0, recipient: 0 });

  // Handle Send button click
  const handleTransfer = () => {
    if (!recipient || !amount || isNaN(parseFloat(amount))) {
      setMessage('Please enter valid recipient and amount.');
      return;
    }
    setConfirming(true);
    setMessage('Press SPACE twice to confirm transfer');
  };

  // Listen for SPACE key presses
  const handleKeyDown = (e) => {
    if (!confirming) return;

    if (e.code === 'Space') {
      const newCount = spaceCount + 1;
      setSpaceCount(newCount);

      if (newCount === 2) {
        transferMoney({ recipientEmail: recipient, amount: parseFloat(amount) })
          .then(res => {
            setMessage(res.data.message || 'Transfer successful!');
            setBalances({
              sender: res.data.senderBalance,
              recipient: res.data.recipientBalance
            });
            resetConfirmation();
            clearMessageAfterDelay();
          })
          .catch(err => {
            setMessage(err.response?.data?.message || 'Transfer failed');
            resetConfirmation();
            clearMessageAfterDelay();
          });
      }
    }
  };

  const resetConfirmation = () => {
    setConfirming(false);
    setSpaceCount(0);
  };
  const clearMessageAfterDelay = () => {
    setTimeout(() => {
        setMessage('');
    }, 5000);
  };


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spaceCount, confirming, recipient, amount]);

  return (
    <div className="container">
      <h2>Send Money</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }}>
        <button type="submit">Send</button>
      </form>


      {message && (
  <p
    className={
      message.toLowerCase().includes('success') ? 'message success' : 'message error'
    }
  >
    {message}
  </p>
)}


      {balances.sender > 0 && balances.recipient > 0 && (
  <div>
    <p>Your Balance: ${balances.sender}</p>
    <p>Recipient's Balance: ${balances.recipient}</p>
  </div>
)}
    </div>
  );
}

export default TransferPage;
