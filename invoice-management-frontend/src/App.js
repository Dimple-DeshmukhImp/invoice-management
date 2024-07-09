// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import CreateInvoice from './components/CreateInvoice';
import InvoiceList from './components/InvoiceList';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<CreateInvoice/>} />
                <Route path="/all-invoices" element={<InvoiceList/>} />
            </Routes>
        </Router>
    );
}

export default App;
