import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { FrontPage, UsersList, Register, UsersUpdate, ProvidersList, ProvidersInsert, ProvidersUpdate, ProductsList, ProductsInsert, ProductsUpdate, Login } from '../pages'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Background from './img/bg.jpg';
import img from './img/bg.jpg';

const Container2 = styled.div`
    background-image: url(${img});
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
  background-attachment: fixed;
`;

function App() {
  return (
    <Container2>
      <Router>

        <NavBar />
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/users/list" exact component={UsersList} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/users/update/:id"
            exact
            component={UsersUpdate}
          />


          <Route path="/providers/list" exact component={ProvidersList} />
          <Route path="/providers/create" exact component={ProvidersInsert} />
          <Route
            path="/providers/update/:id"
            exact
            component={ProvidersUpdate}
          />

          <Route path="/products/list" exact component={ProductsList} />
          <Route path="/products/create" exact component={ProductsInsert} />
          <Route
            path="/products/update/:id"
            exact
            component={ProductsUpdate}
          />

        </Switch>
      </Router>
    </ Container2 >
  )
}

export default App