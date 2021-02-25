function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let printer = statementPrinter();

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  calculateAmountAndVolumeCreditsAndAlsoAddToResult(printer);
  printer.printTotalOwedAmount();
  printer.printVolumeCredits();

  return printer.getStatement();

  function statementPrinter() {
    let statement = '';
    printStatementHeader();

    function printStatementHeader() {
      statement += `Statement for ${invoice.customer}\n`;
    }

    function printVolumeCredits() {
      statement += `You earned ${volumeCredits} credits\n`;
    }

    function printTotalOwedAmount() {
      statement += `Amount owed is ${format(totalAmount / 100)}\n`;
    }

    function printOrderLine(play, thisAmount, perf) {
      statement += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    }

    function getStatement() {
      return statement;
    }

    return {
      getStatement,
      printStatementHeader,
      printVolumeCredits,
      printOrderLine,
      printTotalOwedAmount
    };
  }

  function calculateAmountAndVolumeCreditsAndAlsoAddToResult(printer) {
    for (let perf of invoice.performances) {
      const play = plays[perf.playID];
      let thisAmount = 0;
      switch (play.type) {
        case "tragedy":
          thisAmount += calculateTragedyAmount(perf);
          volumeCredits += calculateTragedyVolumeCredits(perf);

          break;
        case "comedy":
          thisAmount += calculateComedyAmount(perf);
          volumeCredits += calculateComedyVolumeCredits(perf);

          break;
        default:
          throw new Error(`unknown type: ${play.type}`);
      }
      // print line for this order
      printer.printOrderLine(play, thisAmount, perf);
      totalAmount += thisAmount;
    }
  }

  function calculateComedyVolumeCredits(perf) {
    return calculateBaseVolumeCredits(perf) + calculateBonusCredits(perf);
  }

  function calculateBonusCredits(perf) {
    return Math.floor(perf.audience / 5);
  }

  function calculateTragedyVolumeCredits(perf) {
    return calculateBaseVolumeCredits(perf);
  }

  function calculateBaseVolumeCredits(perf) {
    return Math.max(perf.audience - 30, 0);
  }

  function calculateComedyAmount(perf) {
    let thisAmount = 30000;
    if (perf.audience > 20) {
      thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    thisAmount += 300 * perf.audience;
    return thisAmount;
  }

  function calculateTragedyAmount(perf) {
    let thisAmount = 40000;
    if (perf.audience > 30) {
      thisAmount += 1000 * (perf.audience - 30);
    }
    return thisAmount;
  }
}

module.exports = statement;
