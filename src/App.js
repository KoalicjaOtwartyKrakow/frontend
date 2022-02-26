import { GlobalProvider } from './context/GlobalState';
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from './components/Home';
import { ApartmentEdit } from './components/ApartmentEdit'

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/edit/:id" element={<ApartmentEdit/>} exact />
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;