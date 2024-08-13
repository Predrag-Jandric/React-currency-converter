import { useState, useEffect } from "react";

// API https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

// DOCS https://www.frankfurter.app/docs/

export default function App() {
  const [amount, setAmount] = useState(0);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [output, setOutput] = useState(null);

  function handleAmount(e) {
    const parsedValue = parseFloat(e.target.value);

    if (parsedValue >= 0) {
      setAmount(parsedValue);
    }
  }

  function handleconvertFrom(e) {
    setConvertFrom(() => e.target.value);
  }

  function handleconvertTo(e) {
    setConvertTo(() => e.target.value);
  }

  useEffect(() => {
    const fetchConvertionRate = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`
        );
        const data = await res.json();
        setOutput(data.rates[convertTo]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConvertionRate();
  }, [amount, convertFrom, convertTo]);

  console.log(amount);
  console.log(`i am convert from ${convertFrom}`);
  console.log(`i am convert to ${convertTo}`);

  return (
    <div>
      <input type="number" value={amount} onChange={handleAmount} />
      <select value={convertFrom} onChange={handleconvertFrom}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={convertTo} onChange={handleconvertTo}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
