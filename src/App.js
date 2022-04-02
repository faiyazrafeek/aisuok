import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AllQuiz from './components/AllQuiz';
import Quiz from './components/Quiz';


function App() {
  return (   
      <BrowserRouter>
      <Navbar/>      
      <div className="container">
        <div className="text-center my-4">
          <h1 className="display-6"> AIS Annual Ramazan Quiz | 2022 </h1>
        </div>       
      
        <Switch>
          <Route component={AllQuiz} path="/" exact/>
          <Route component={Quiz} path="/:slug" /> 
        </Switch>       
      </div>     
    </BrowserRouter>  
  );
}

export default App;
