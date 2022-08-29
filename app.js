import './App.css';
import axios from 'axios';
import { useState } from "react"
import { useEffect } from "react"

let data = [
  { currency: "CAD", rate: 0, buy: 0, sell:0 },
  { currency: "EUR", rate: 0, buy: 0, sell:0 },
  { currency: "IDR", rate: 0, buy: 0, sell:0 },
  { currency: "JPY", rate: 0, buy: 0, sell:0 },
  { currency: "CHF", rate: 0, buy: 0, sell:0 },
  { currency: "GBP", rate: 0, buy: 0, sell:0 },
]

const processData = (data,currencyData) => {
  const result = []
  for (let i =0; i<data.length;i++){
    let currencyKey = data[i].currency
    let exchangeRate = Number(currencyData[currencyKey]).toFixed(4)
    let fivePercent = Number((exchangeRate*5)/100).toFixed(4)
    // console.log(fivePercent,`<===== five percent =====>`)
    data[i].rate= exchangeRate
    data[i].buy=Number(+exchangeRate + +fivePercent).toFixed(4)
    data[i].sell=Number(exchangeRate - fivePercent).toFixed(4)
    result.push(data[i])
  }
  // console.log(result)
  return result
}


const Apidata = () => {
  const url ='https://api.currencyfreaks.com/latest?apikey=911b075f63884743a58393ef2a6d5562&symbols=CAD,IDR,JPY,CHF,EUR,GBP';
  const [currencyData, setCurrencyData] = useState([])
  useEffect(() => {
     axios.get(url)
      .then(({ data }) => {
        setCurrencyData(data.rates)
      })
  }, [])
  return currencyData
}



function App() {
  const finalData = processData(data,Apidata())
  return (
    <div className="App">
      <table>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sale</th>
        </tr>
        {finalData.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.currency}</td>
              <td>{val.buy}</td>
              <td>{val.rate}</td>
              <td>{val.sell}</td>
            </tr>
          )
        })}
      </table>
  </div>
  );
}
  
export default App;