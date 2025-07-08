import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from '../services/api';
import '../App.css';

function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getTransactionHistory();
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  return (
    <div className="history-container">
      <h2>Transaction History</h2>
      <ul className="history-list">
        {transactions.map((txn, index) => (
          <li key={index} className="history-item">
            <span>{txn.date}</span>
            <span>{txn.type}</span>
            <span>${txn.amount}</span>
            <span>{txn.recipient || 'N/A'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistoryPage;

