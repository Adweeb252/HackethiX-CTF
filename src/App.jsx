import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Flag from './pages/Flag';
import Submit from './pages/Submit';
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
      <Routes>
        <Route path = '/' element = {<HomePage/>}>
          <Route index element = {<Home/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/Flag' element = {<Flag/>}/>
          <Route path = '/Submit' element = {<Submit/>}/>
          <Route path = '/Leaderboard' element = {<Leaderboard/>}/>
          <Route path = '*' element = {<NotFound/>}/>
        </Route>
      </Routes>
  )
}

export default App;
