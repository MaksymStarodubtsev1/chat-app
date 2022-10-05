import React from "react";
import './App.scss';
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import ApolloProvider from "../src/ApolloProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Home} from "./pages/Home";

import { AuthProvider } from "./context/auth";

function App() {
  
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className='pt-5'>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
