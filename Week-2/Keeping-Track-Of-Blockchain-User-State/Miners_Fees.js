//Transaction.js
class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        const anySpent = this.inputUTXOs.some((x) => x.spent);
        if (anySpent) {
            throw new Error("Cannot include a spent UTXO");
        }

        const inputAmount = this.inputUTXOs.reduce((p, c) => {
            return p + c.amount;
        }, 0);
        const outputAmount = this.outputUTXOs.reduce((p, c) => {
            return p + c.amount;
        }, 0);
        if (inputAmount < outputAmount) {
            throw new Error("Not enough here");
        }

        this.inputUTXOs.forEach((utxo) => {
            utxo.spend();
        });

        this.fee = (inputAmount - outputAmount);
    }
}

module.exports = Transaction;

//TXO.js
class TXO {
    constructor(owner, amount) {
        this.owner=owner;
        this.amount=amount;
        this.spent=false;
    }
    spend() {
        this.spent=true;
    }
}

module.exports = TXO;

//test.js
const { assert } = require('chai');
const Transaction = require('../Transaction');
const TXO = require('../TXO');

describe('Transaction', function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

    describe('with no remainder', () => {
        const txo1 = new TXO(fromAddress, 5);
        const txo2 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 7);
        const outputTXO2 = new TXO(fromAddress, 3);

        const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);

        tx.execute();

        it('should have zero fee', () => {
            assert.equal(tx.fee, 0);
        });
    });

    describe('with some remainder', () => {
        const txo1 = new TXO(fromAddress, 15);
        const outputTXO1 = new TXO(toAddress, 7);
        const outputTXO2 = new TXO(fromAddress, 6);

        const tx = new Transaction([txo1], [outputTXO1, outputTXO2]);

        tx.execute();

        it('should have the remainder as the fee', () => {
            assert.equal(tx.fee, 2);
        });
    });
});
