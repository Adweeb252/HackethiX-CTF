import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Flag from './pages/Flag';

function App() {
  return (
      <Routes>
        <Route path = '/' element = {<HomePage/>}>
          <Route index element = {<Home/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/Flag' element = {<Flag/>}/>
          <Route path = '*' element = {<NotFound/>}/>
        </Route>
      </Routes>
  )
}

export default App;
