function statement(invoice, plays) {
  let printer = statementPrinter();
  printer.printStatementHeader();
  printer.printOrderLines();
  printer.printTotalOwedAmount();
  printer.printVolumeCredits();
  return printer.getStatement();

  function statementPrinter() {
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;

    let statement = '';

    function printStatementHeader() {
      statement += `Statement for ${invoice.customer}\n`;
    }

    function printVolumeCredits() {
      statement += `You earned ${calculateTotalVolumeCredits()} credits\n`;
    }

    function printTotalOwedAmount() {
      statement += `Amount owed is ${format(calculateTotalAmount() / 100)}\n`;
    }

    function printOrderLines() {
      for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        printOrderLine(play, perf);
      }
    }

    function printOrderLine(play, perf) {
      const instance = createPlayInstance(play.type);
      let thisAmount = instance.calculateAmount(perf);

      statement += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    }

    function getStatement() {
      return statement;
    }

    return {
      getStatement,
      printStatementHeader,
      printVolumeCredits,
      printOrderLines,
      printTotalOwedAmount
    };
  }

  function calculateTotalAmount() {
    return invoice.performances.reduce((totalAmount, currentPerformance) => {
      const instance = createPlayInstance(plays[currentPerformance.playID].type);
      return totalAmount + instance.calculateAmount(currentPerformance);
    }, 0);
  }

  function calculateTotalVolumeCredits() {
    return invoice.performances.reduce((totalVolumeCredits, currentPerformance) => {
      const instance = createPlayInstance(plays[currentPerformance.playID].type);
      return totalVolumeCredits + instance.calculateVolumeCredits(currentPerformance);
    }, 0);
  }
}

function tragedy() {
  function calculateVolumeCredits(perf) {
    return calculateBaseVolumeCredits(perf);
  }

  function calculateAmount(perf) {
    let thisAmount = 40000;
    if (perf.audience > 30) {
      thisAmount += 1000 * (perf.audience - 30);
    }
    return thisAmount;
  }

  return {
    calculateVolumeCredits,
    calculateAmount
  };
}

function comedy() {
  function calculateVolumeCredits(perf) {
    return calculateBaseVolumeCredits(perf) + calculateBonusCredits(perf);
  }

  function calculateAmount(perf) {
    let thisAmount = 30000;
    if (perf.audience > 20) {
      thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    thisAmount += 300 * perf.audience;
    return thisAmount;
  }

  return {
    calculateVolumeCredits,
    calculateAmount
  };
}

function calculateBonusCredits(perf) {
  return Math.floor(perf.audience / 5);
}

function calculateBaseVolumeCredits(perf) {
  return Math.max(perf.audience - 30, 0);
}

function createPlayInstance(type) {
  if (type === 'tragedy') {
    return tragedy();
  } else if (type === 'comedy') {
    return comedy();
  }

  throw new Error(`unknown type: ${type}`);
}

module.exports = statement;
