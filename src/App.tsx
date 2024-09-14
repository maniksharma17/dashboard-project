import './App.css';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Layout from "./pages/Layout"
import { RootState } from './main';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Geography from './pages/Geography';
import Overview from './pages/Overview';
import Daily from './pages/Daily';
import Monthly from './pages/Monthly';
import Breakdown from "./pages/Breakdown"
import Admins from "./pages/Admins"
import Performance from "./pages/Performance"


function App() {
  const mode = useSelector((state: RootState)=>state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/geography' element={<Geography />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/daily' element={<Daily />} />
            <Route path='/monthly' element={<Monthly />} />
            <Route path='/breakdown' element={<Breakdown />} />
            <Route path='/admin' element={<Admins />} />
            <Route path='/performance' element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </>
  );
}

export default App;
