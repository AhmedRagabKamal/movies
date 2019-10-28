import React from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovie from './components/newMovie';

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/new-movie" component={NewMovie} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={NewMovie} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
