import React from "react";
import './App.scss';
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import ApolloProvider from "../src/ApolloProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Home} from "./pages/home/Home";

import { AuthProvider } from "./context/auth";
import DynamicRoute from "./pages/util/dynamicRoute";
import {MessageProvider} from "./context/message";

function App() {
  
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Container className='pt-5'>
              <Routes>
                <Route element={<DynamicRoute auth={true}/>}>
                  <Route path="/" element={<Home/>} />
                </Route>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
            </Container>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
