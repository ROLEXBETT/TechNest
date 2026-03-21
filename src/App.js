import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Getproducts from './components/Getproducts';

function App() {
  return (
   <Router> 
    <div className="App">
      <header className="App-header">
       <h2>Welcome to TechNest - Where smart tech meets smart prices</h2>
    
      </header>
      <Routes>       
        <Route path='/addproducts' element={<Addproducts/>} />
        <Route path='/' element={<Getproducts/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/makepayment' element ={<Makepayment/>} />
        <Route path='*' element={<Notfound/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
