import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import EditProfile from './views/EditProfile';
import AddProfile from './views/addProfile';
import Sectors from './views/sector/index';
import AddSector from './views/sector/add';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProfile" element={<AddProfile />} />
        <Route path="/editProfile/:id" element={<EditProfile />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/addSectors" element={<AddSector />} />
      </Routes>
    </Router>
  );
};

export default App;
