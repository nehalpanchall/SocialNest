import Header from './components/Header';

import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';
import CreatePost from './components/CreatePost';
import Card from './components/Card';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="right-contents">
        <Header />
        <CreatePost />
        <Card />
        <Footer className="footer" />
      </div>
    </div>
  );
};

export default App;
