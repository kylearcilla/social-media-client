import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

// give App.js provider
import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'

import MenuBar from './components/MenuBar'
import Home from './pages/Home';

// once we log in or regist the entire application will have this data inside of the context
import Login from './pages/Login';
import Register from './pages/Register';

import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>

        <Container>
          <MenuBar />

          <Route exact path='/' component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />

        </Container>

      </Router>
    </AuthProvider>
  );
}

export default App;
