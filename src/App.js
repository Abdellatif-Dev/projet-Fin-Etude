import { BrowserRouter } from 'react-router-dom';
import AppProject from './ProjetFinEtude/AppProject';
import { Provider } from 'react-redux';
import {Restaurants} from './ProjetFinEtude/Store/store'
function App() {
  return (
    <div >
      <Provider store={Restaurants}>
      <BrowserRouter>
      <AppProject/>      
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
