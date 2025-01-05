import { ContextWrapper } from '@/context/Contexts';
import './App.css';
import { AntDesignConfig } from '@/context/AntDesignContextWrapper';
import Home from '@/pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/pages/Auth';

function App() {
  return (
    <div className="w-full app">
      <AntDesignConfig>
        <ContextWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="auth/:id" element={<Auth />} />
          </Routes>
        </ContextWrapper>
      </AntDesignConfig>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
