import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Stories from './components/Stories';
import MyStories from './components/MyStories';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Provider } from 'react-redux';
import { store } from './app/store';
import News from './components/News';
import NewsErrorBountry from './ErrorBoundries/NewsErrorBoundary'
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Stories' element={<Stories />}></Route>
          <Route path='/News' element={<ErrorBoundary FallbackComponent={NewsErrorBountry}><News /></ErrorBoundary>} />
          <Route path='/MyStories' element={<MyStories />}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/Login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
