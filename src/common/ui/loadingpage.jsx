import React from 'react'
import Loading from '../../assets/image/loading.gif'

export default function LoadingPage() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <img src={Loading} alt="loading" width="5%"/>
      <p>Loading...</p>
    </div>
  )
}
