import { useState, useEffect } from "react";

// API https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

// API DOCS https://www.frankfurter.app/docs/

export default function App() {
  const [amount, setAmount] = useState(0);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [output, setOutput] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  function handleAmount(e) {
    const parsedValue = Number(parseFloat(e.target.value));

    if (parsedValue >= 0) {
      setAmount(parsedValue);
    }
  }

  // function handleconvertFrom(e) {
  //   setConvertFrom(() => e.target.value);
  // }

  // function handleconvertTo(e) {
  //   setConvertTo(() => e.target.value);
  // }

  useEffect(
    function () {
      async function fetchConvertionRate() {
        try {
          // setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`
          );
          const data = await res.json();
          setOutput(data.rates[convertTo]);
          // setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      if (amount > 0 && convertFrom !== convertTo) {
        fetchConvertionRate();
      } else if (convertFrom === convertTo) {
        setOutput(amount);
      }
    },
    [amount, convertFrom, convertTo]
  );

  return (
    <div>
      <input
        type="text"
        // disabled={isLoading}
        value={amount}
        onChange={handleAmount}
      />
      <select
        value={convertFrom}
        onChange={(e) => setConvertFrom(e.target.value)}
        // disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={convertTo}
        onChange={(e) => setConvertTo(e.target.value)}
        // disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{`${amount} ${convertFrom} is ${
        output === null ? 0 : output
      } ${convertTo}`}</p>
    </div>
  );
}
