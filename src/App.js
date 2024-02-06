import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Home from './Home'
import Paymentsuccess from './paymentsuccess';
function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path='/paymentsuccess' element={<Paymentsuccess/>}/>
      </Routes>
    </Router>
  );
}

export default App;
