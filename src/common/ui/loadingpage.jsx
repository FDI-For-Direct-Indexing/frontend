import React from 'react'
import Loading from '../../assets/image/loading.svg'

export default function LoadingPage() {
  return (
    <>
      <img src={Loading} alt="loading" width="5%"/>
      <p>Loading...</p>
    </>
  )
}
