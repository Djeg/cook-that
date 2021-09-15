import React, { useEffect } from 'react'
import LoginRequire from './LoginRequire'
import { useStateSlice } from '../Context/StateContext'

export default function Firewall({ children }) {
  const isConnected = useStateSlice('user.isConnected')

  return isConnected ? children : <LoginRequire />
}
