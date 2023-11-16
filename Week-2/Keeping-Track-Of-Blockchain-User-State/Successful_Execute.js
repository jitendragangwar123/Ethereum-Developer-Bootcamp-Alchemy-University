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

    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const txo3 = new TXO(fromAddress, 3);
    const txo4 = new TXO(fromAddress, 4);
    const outputTXO1 = new TXO(toAddress, 7);
    const outputTXO2 = new TXO(fromAddress, 3); 

    it('should mark both inputs as spent', () => {
        const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);
        tx.execute();
        assert(txo1.spent);
        assert(txo2.spent);
    });

    it('should leave both inputs unspent if funds unavailable', () => {
        const tx = new Transaction([txo3, txo4], [outputTXO1, outputTXO2]);
        let ex;
        try {
            tx.execute();
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Expected an exception to be thrown!");
        assert(!txo3.spent, "The transaction should be marked as unspent");
        assert(!txo4.spent, "The transaction should be marked as unspent");
    });

    it('should leave valid inputs unspent if a double spend occurs', () => {
        const tx = new Transaction([txo1, txo4], [outputTXO1, outputTXO2]);
        let ex;
        try {
            tx.execute();
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Expected an exception to be thrown!");
        assert(!txo4.spent, "The transaction should be marked as unspent");
    });

});