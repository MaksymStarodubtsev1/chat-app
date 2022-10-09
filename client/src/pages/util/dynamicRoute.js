import React from 'react'

import { useAuthState } from "../../context/auth";
import {Navigate, Outlet} from "react-router-dom";

export default function DynamicRoute(props) {
  const { user } = useAuthState()
  console.log('props', props)

  if(props.auth && !user) return <Navigate to="/login" replace />
  else if(props.guest && user) return <Navigate to="/" replace />
  else return <Outlet />

  
}