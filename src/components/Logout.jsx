import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function Logout({openModals}) {
    const {logout}=useAuth()
    useEffect(()=>{
        logout()
    },[])
  return  null
}

export default Logout