import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [location, setLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      })
      getData()
    
    })
  }, [])

  const getData = async () => {
    let res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/rj/distritos')
    setData(res.data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Dados da API do navegador</h2>
        <p>
          Latitude: {location.latitude} <br/>
          Longitude: {location.longitude}
        </p>

      </header>
      <div className="container">
        <h1>Dados obtidos da API do IBGE: </h1>
        <ul className="lista">
          {
          data.map((i) => {
            return <li key={i.id}>
                Nome: {i.nome },
                Municipio: {i.municipio.nome },
                Microrregião: {i.municipio.microrregiao.nome },
                <br/>
              </li>
          })
          }
          
        </ul>
      </div>

    </div>
  );
}

export default App;
