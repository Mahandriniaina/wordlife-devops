import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


import Landin from '@/components/landin/landin';
import Starting from '@/components/landin/startin';
export default function App() {
  const [ loading , setLoading] =useState(false)
  useEffect(() =>{
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  },[])
  {
    if(loading) { 
      return (
       <Starting/>
      ); 
    }
    else{
      return (
        <Landin />
        
      );
    }
  }
}
