import './App.css';
import Route from './components/Route/Route.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

import Home from './pages/Home/Home.js';
import Pokedex from './pages/Pokedex/Pokedex.js';
import News from './pages/News/News.js';
import NotFound from './pages/404/404.js';

function App() {
  return (
    <>
      <Header/>
      <Route path="/" component={Home}/>
      <Route path="/pokedex" component={Pokedex}/>
      <Route path="/news" component={News}/>
      <Route path="/pokeNews" component={NotFound}/>
      <Route path="/404" component={NotFound}/>
      <Route path="" notFound={true} component={NotFound}/>
      <Footer/>
    </>
  );
}

export default App;
