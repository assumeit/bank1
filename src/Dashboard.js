import React, { useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountNumberInput, setAccountNumberInput] = useState('');
  const [depositAccountNumber, setDepositAccountNumber] = useState('');
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferFromAccount, setTransferFromAccount] = useState('');
  const [transferToAccount, setTransferToAccount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [activeForm, setActiveForm] = useState(null); // State to track active form ('deposit', 'withdraw', or 'transfer')

  // Add a new account
  const handleAddAccount = () => {
    if (accountNumberInput && !accounts.some(acc => acc.accountNumber === accountNumberInput)) {
      setAccounts([...accounts, {
        accountNumber: accountNumberInput,
        balance: 0,
        transactions: []
      }]);
      setAccountNumberInput(''); // Clear input after adding
    } else {
      alert('Account number already exists or is invalid');
    }
  };

  // Handle deposit
  const handleDeposit = () => {
    const account = accounts.find(acc => acc.accountNumber === depositAccountNumber);
    if (account && depositAmount) {
      const newBalance = account.balance + parseFloat(depositAmount);
      const updatedAccount = {
        ...account,
        balance: newBalance,
        transactions: [...account.transactions, {
          type: 'Deposit',
          amount: parseFloat(depositAmount),
          balance: newBalance,
          date: new Date().toLocaleString()
        }]
      };
      updateAccounts(updatedAccount);
      setDepositAmount(''); // Clear deposit input after the transaction
    } else {
      alert('Account number not found or invalid amount');
    }
  };

  // Handle withdraw
  const handleWithdraw = () => {
    const account = accounts.find(acc => acc.accountNumber === withdrawAccountNumber);
    if (account && withdrawAmount && account.balance >= parseFloat(withdrawAmount)) {
      const newBalance = account.balance - parseFloat(withdrawAmount);
      const updatedAccount = {
        ...account,
        balance: newBalance,
        transactions: [...account.transactions, {
          type: 'Withdraw',
          amount: parseFloat(withdrawAmount),
          balance: newBalance,
          date: new Date().toLocaleString()
        }]
      };
      updateAccounts(updatedAccount);
      setWithdrawAmount(''); // Clear withdraw input after the transaction
    } else {
      alert('Account number not found, insufficient balance, or invalid amount');
    }
  };

  // Handle transfer
  const handleTransfer = () => {
    const fromAccount = accounts.find(acc => acc.accountNumber === transferFromAccount);
    const toAccount = accounts.find(acc => acc.accountNumber === transferToAccount);

    if (fromAccount && toAccount && transferAmount && fromAccount.balance >= parseFloat(transferAmount)) {
      const newFromBalance = fromAccount.balance - parseFloat(transferAmount);
      const newToBalance = toAccount.balance + parseFloat(transferAmount);

      const updatedFromAccount = {
        ...fromAccount,
        balance: newFromBalance,
        transactions: [...fromAccount.transactions, {
          type: 'Transfer Out',
          amount: parseFloat(transferAmount),
          balance: newFromBalance,
          date: new Date().toLocaleString()
        }]
      };

      const updatedToAccount = {
        ...toAccount,
        balance: newToBalance,
        transactions: [...toAccount.transactions, {
          type: 'Transfer In',
          amount: parseFloat(transferAmount),
          balance: newToBalance,
          date: new Date().toLocaleString()
        }]
      };

      updateAccounts(updatedFromAccount);
      updateAccounts(updatedToAccount);

      setTransferFromAccount('');
      setTransferToAccount('');
      setTransferAmount(''); // Clear transfer inputs after the transaction
    } else {
      alert('Account numbers not found, insufficient balance, or invalid amount');
    }
  };

  // Update accounts array with the modified account
  const updateAccounts = (updatedAccount) => {
    setAccounts(accounts.map(acc =>
      acc.accountNumber === updatedAccount.accountNumber ? updatedAccount : acc
    ));
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your RBC Bank Dashboard</h1>

      {/* Add Account Section */}
      <div className="account-section">
        <label>Add New Account Number:</label>
        <input
          type="text"
          value={accountNumberInput}
          onChange={(e) => setAccountNumberInput(e.target.value)}
          placeholder="Enter new account number"
        />
        <button onClick={handleAddAccount}>Add Account</button>
      </div>

      {/* Buttons to Show Deposit, Withdraw, or Transfer Form */}
      <div className="transaction-buttons">
        <button onClick={() => setActiveForm('deposit')}>Deposit</button>
        <button onClick={() => setActiveForm('withdraw')}>Withdraw</button>
        <button onClick={() => setActiveForm('transfer')}>Transfer</button>
      </div>

      {/* Conditionally render deposit form */}
      {activeForm === 'deposit' && (
        <div className="account-section">
          <h3>Deposit</h3>
          <label>Account Number:</label>
          <input
            type="text"
            value={depositAccountNumber}
            onChange={(e) => setDepositAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />
          <label>Amount:</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter deposit amount"
          />
          <button onClick={handleDeposit}>Deposit</button>
        </div>
      )}

      {/* Conditionally render withdraw form */}
      {activeForm === 'withdraw' && (
        <div className="account-section">
          <h3>Withdraw</h3>
          <label>Account Number:</label>
          <input
            type="text"
            value={withdrawAccountNumber}
            onChange={(e) => setWithdrawAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />
          <label>Amount:</label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter withdraw amount"
          />
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      )}

      {/* Conditionally render transfer form */}
      {activeForm === 'transfer' && (
        <div className="account-section">
          <h3>Transfer</h3>
          <label>From Account:</label>
          <input
            type="text"
            value={transferFromAccount}
            onChange={(e) => setTransferFromAccount(e.target.value)}
            placeholder="Enter account number"
          />
          <label>To Account:</label>
          <input
            type="text"
            value={transferToAccount}
            onChange={(e) => setTransferToAccount(e.target.value)}
            placeholder="Enter account number"
          />
          <label>Amount:</label>
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Enter transfer amount"
          />
          <button onClick={handleTransfer}>Transfer</button>
        </div>
      )}

      {/* Transactions */}
      <h3>Transactions</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Number</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {accounts.flatMap((account, accIndex) => account.transactions.map((transaction, index) => (
            <tr key={`${accIndex}-${index}`}>
              <td>{index + 1}</td>
              <td>{account.accountNumber}</td>
              <td className={transaction.type.toLowerCase().replace(' ', '-')}>{transaction.type}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>${transaction.balance.toFixed(2)}</td>
              <td>{transaction.date}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
