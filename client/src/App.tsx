import { ContextWrapper } from '@/context/Contexts';
import './App.css';
import { AntDesignConfig } from '@/context/AntDesignContextWrapper';
import Home from '@/pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/pages/Auth';
import HabitGroups from '@/pages/groups/Groups';
import DashboardPage from '@/pages/dashboard/sections/Dashboard';

function App() {
  return (
    <div className="w-full app">
      <AntDesignConfig>
        <ContextWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<HabitGroups />} />
            <Route path="/dashboard" element={<DashboardPage />} />
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
