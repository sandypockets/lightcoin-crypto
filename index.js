// Allow multiple accounts to be created
// Each account can have many transactions
// Allow withdrawals and deposits into accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// Allow us to retrieve the current balance of the account at any time
// Don't allow withdrawals that exceed the remaining balance of the account

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransactions(transaction) {
    this.transactions.push(transaction);
  }
}

class Transactions {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // Check if account has enough to withdrawal
    if (!this.isAllowed()) return false;
    // Transaction timestamp
    this.time = new Date();
    // Add transactions history to account
    this.account.addTransactions(this);
    return true;
  }
}

class Withdrawal extends Transactions {
  get value() {
    return - this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transactions {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE
const myAccount = new Account('snow-patrol');
console.log('Account Balance: ', myAccount.balance); // Starting balance

console.log('Attempting to withdraw...'); // Expected to fail
const t1 = new Withdrawal(5.00, myAccount);
console.log('Withdrawal result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Processing deposit...');
const t2 = new Deposit(9.99, myAccount);
console.log('Deposit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Processing withdrawal for 9.99...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Withdrawal result:', t3.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Account Transaction History: ', myAccount.transactions);
