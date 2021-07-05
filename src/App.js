
import './App.css';
import UploadComponent from './upload/UploadComponent';
import FooterComponent from './Footer'
function App() {
  
  return (
    <div className="App"> 
      <header className="App-header"> 
      <div className="App-header2"></div>
      <div class="header-content">
           <h3> Ultra Fashion Assistant</h3>
      </div>             
      </header>
      <UploadComponent />
      <FooterComponent />
    </div>
  );   
}

export default App;
