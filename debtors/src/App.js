import React from 'react';
import Items from "./components/Items";
import Header from "./components/Header";
import Customers from "./components/Customers";
import Traders from './components/Traders';
import Invoices from './components/Invoices';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
const App = () => {
    return (
        <Router>
            <div  style={{ paddingBottom: '60px' }}>
                <Header/>
                <Routes>
                    <Route path='Items' element={<Items />} />
                    <Route path='Customers' element={<Customers />} />
                    <Route path='Traders' element={<Traders />} />
                    <Route path='Invoices' element={<Invoices />} />
                </Routes>
            </div>
        </Router>
    )
};
export default App;