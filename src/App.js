import {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render() {
    const {user} = this.state;

    return (
      <>
        <Navbar user={user}/>
        <main className="container mt-3">
          <ToastContainer/>
          <Switch>
            <Route path={'/register'}
                   component={RegisterForm}/>
            <Route path={'/login'}
                   component={LoginForm}/>
            <Route path={'/logout'}
                   component={Logout}/>
            <ProtectedRoute path={'/movies/:id'}
                   component={MovieForm}/>
            <Route path="/movies"
                   render={props => <Movies {...props} user={this.state.user}/>}/>
            <Route path="/customers"
                   component={Customers}/>
            <Route path="/rentals"
                   component={Rentals}/>
            <Route path="/not-found"
                   component={NotFound}>
            </Route>
            <Redirect from={'/'}
                      to={'/movies'}
                      exact/>
            <Redirect to={'/not-found'}/>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
