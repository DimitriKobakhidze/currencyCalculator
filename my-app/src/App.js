import React from "react";
import "./App.css"
import {HiOutlineSwitchHorizontal} from "react-icons/hi"

const App = () => {
  const [fromCurrency,setFromCurrency] = React.useState("USD")
  const [toCurrency,settoCurrency] = React.useState("EUR")
  const [amounts,setAmounts] = React.useState({toConvert:1,afterConvert:1})
  const [allCurrencies,setAllCurrencies] = React.useState([])
  const [rates,setRates] = React.useState({})

  React.useEffect(() =>{
    const url = `https://api.exchangerate.host/latest?base=${fromCurrency}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[toCurrency]
      const converted = Math.round(amounts.toConvert * rate * 100) / 100
      setRates(data.rates)
      setAllCurrencies(Object.keys(data.rates))
      setAmounts(prev => ({...prev,afterConvert:converted}))
    })
  },[fromCurrency])

  React.useEffect(() => {
    const rate = rates[toCurrency]
    const converted = Math.round(amounts.toConvert * rate * 100) / 100
    setAmounts(prev =>({...prev,afterConvert:converted}))
  },[toCurrency,amounts.toConvert])

  const swapCurrency = () => {
    setFromCurrency(toCurrency)
    settoCurrency(fromCurrency)
  }


  
  return (
    <div className="App">
      <header>
        <h2 className="header-text">Currency Converter</h2>
      </header>
      <main>
        <div className="answer-div">
          <h4 className="answer-heading">{`exchange rate ${Math.round(rates[toCurrency] * 100) / 100}`}</h4>
          <h1 className="answer-el">{`${amounts.afterConvert} ${toCurrency}`}</h1>
        </div>
        <form className="main-form">
          <label htmlFor="amount" className="input-label">Amount</label>
          <input 
            className="input-el" 
            id="amount" 
            onChange={(e) => setAmounts(prev => ({...prev,toConvert:e.target.value}))} 
          />
          <div className="selection-div">
            <div className="select-wrap">
              <label htmlFor="from">from</label>
              <select className="select-el" id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {allCurrencies.map((curr,id) =>
                  <option key={id} value={curr}>
                    {curr}
                  </option>  
                )}
              </select>
            </div>
            <div className="swap-click" onClick={swapCurrency}>
              <HiOutlineSwitchHorizontal size={30} className="switcher" />
            </div>
            <div className="select-wrap">
              <label htmlFor="to">to</label>
              <select className="select-el" id="to" value={toCurrency} onChange={(e) => settoCurrency(e.target.value)}>
                {allCurrencies.map((curr,id) =>
                    <>
                      <option key={id} value={curr}>
                        {curr}
                      </option>  
                    </>
                )}
              </select>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
