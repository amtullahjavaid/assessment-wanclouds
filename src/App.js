import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/Layout';
import FormPage from './pages/FormPage';
import TablePage from './pages/TablePage';
import './styles/styles.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/users" element={<TablePage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;