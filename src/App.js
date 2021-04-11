import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route} from 'react-router-dom'
import AllQuiz from './components/AllQuiz';
import Quiz from './components/Quiz';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>      
      <div className="container mt-3">
        <div className="text-center mb-5">
          <h1 className="display-6"> AIS Annual Ramazan Quiz | 2021 </h1>
        </div>       
        <Route component={AllQuiz} path="/" exact/>
        <Route component={Quiz} path="/:slug" />        
      </div>
    </BrowserRouter>
   
     
    </div>
  );
}

export default App;
