import React from 'react'
import { GridLoader } from 'react-spinners'
import {PROGRESS_ICON} from '../../constants/color'

export default function ProgressPage({name}) {
  return (
    <div style={{height:'100vh', display:"flex", alignItems:"center", justifyContent:'center'}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:'space-evenly',
        height: '40vh', width: '50vw', maxWidth: '600px',
        padding:'30px', border:'1px solid #E0E0E0', borderRadius:'10px', backgroundColor:'#F9F9F9'
      }}>
        <GridLoader size={30} speedMultiplier={0.5} color={PROGRESS_ICON} />
        
        <p style={{fontFamily:'SpoqaHanSansNeo-Medium', fontSize:19}}>name님에게 맞는 종목을 찾아볼게요. 조금만 기다려주세요!</p>
      </div>
    </div>
  )
}