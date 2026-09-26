"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Info,
  WalletCards,
} from "lucide-react";

function peso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(2);

  const calculation = useMemo(() => {
    const monthlyInterest = amount * 0.15;
    const totalInterest = monthlyInterest * term;
    const totalPayable = amount + totalInterest;

    const numberOfCutoffs = term * 2;
    const perCutoff = totalPayable / numberOfCutoffs;

    return {
      monthlyInterest,
      totalInterest,
      totalPayable,
      numberOfCutoffs,
      perCutoff,
    };
  }, [amount, term]);

  return (
    <section
      id="calculator"
      className="calculator-section"
    >
      <div className="container">
        <div className="calculator-heading">
          <div>
            <div className="eyebrow-dark">
              LOAN CALCULATOR
            </div>

            <h2>
              See an example before
              <span> you apply.</span>
            </h2>
          </div>

          <p>
            Adjust the amount and repayment term to see an
            illustrative estimate based on the stated 15%
            monthly interest.
          </p>
        </div>

        <div className="calculator-card">
          {/* INPUT SIDE */}

          <div className="calculator-inputs">
            <div className="calculator-title">
              <div className="calculator-icon">
                <Calculator size={20} />
              </div>

              <div>
                <h3>Estimate your loan</h3>

                <p>
                  Change the amount or repayment term.
                </p>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="loanAmount">
                Desired loan amount
              </label>

              <div className="money-input">
                <span>₱</span>

                <input
                  id="loanAmount"
                  type="number"
                  min="1000"
                  step="500"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      Math.max(
                        1000,
                        Number(e.target.value)
                      )
                    )
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="loanRange">
                Adjust amount
              </label>

              <input
                id="loanRange"
                className="calculator-range"
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={amount}
                onChange={(e) =>
                  setAmount(Number(e.target.value))
                }
              />

              <div className="range-labels">
                <span>₱5,000</span>
                <span>₱100,000</span>
              </div>
            </div>

            <div className="input-group">
              <label>Loan term</label>

              <div className="term-grid">
                {[1, 2, 3, 4].map((months) => (
                  <button
                    type="button"
                    key={months}
                    className={
                      term === months
                        ? "term-button active"
                        : "term-button"
                    }
                    onClick={() => setTerm(months)}
                  >
                    <strong>{months}</strong>

                    <span>
                      {months === 1
                        ? "month"
                        : "months"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rate-note">
              <Info size={17} />

              <span>
                Stated interest rate:{" "}
                <strong>15% per month</strong>
              </span>
            </div>
          </div>

          {/* RESULT SIDE */}

          <div className="calculator-result">
            <div className="result-label">
              ILLUSTRATIVE ESTIMATE
            </div>

            <div className="result-main">
              <span>Estimated total payable</span>

              <strong>
                {peso(calculation.totalPayable)}
              </strong>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <span>Principal</span>

                <strong>{peso(amount)}</strong>
              </div>

              <div className="result-item">
                <span>Total interest</span>

                <strong>
                  {peso(calculation.totalInterest)}
                </strong>
              </div>

              <div className="result-item">
                <span>Number of cutoffs</span>

                <strong>
                  {calculation.numberOfCutoffs}
                </strong>
              </div>

              <div className="result-item highlight">
                <span>Example per cutoff</span>

                <strong>
                  {peso(calculation.perCutoff)}
                </strong>
              </div>
            </div>

            <div className="calculator-disclaimer">
              <WalletCards size={17} />

              <p>
                This is an illustrative calculation using
                the stated 15% monthly interest and two
                salary cutoffs per month. Your approved
                loan amount, payment schedule, and final
                terms are subject to evaluation and the
                official loan agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}