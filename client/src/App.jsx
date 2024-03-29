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
import Contacts from "./pages/home/Contacts";
import Requests from "./pages/home/Requests";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Container className='pt-5'>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
              />
              <Routes>
                <Route element={<DynamicRoute auth={true}/>}>
                  <Route path="/" element={<Home/>} />
                  <Route path="/contacts" element={<Contacts/>} />
                  <Route path="/requests" element={<Requests/>} />
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
