import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NeedHelp from './pages/NeedHelp';
import WantWork from './pages/WantWork';
import WorkersList from './pages/WorkersList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* <Header /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workerlist" element={<WorkersList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/need-help" element={<NeedHelp />} />
            <Route path="/want-work" element={<WantWork />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;