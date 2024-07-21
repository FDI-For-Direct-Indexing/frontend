import React from 'react'
import { DESCRIPTION } from '../../constants/color';

export default function CartSummary() {
  const recentCart = [
    {name: '삼성전자', price: 84600},
    {name: '카카오', price: 146000},
  ];

  return (
    <div className='basicBox'>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <p style={{fontSize:'18px', fontFamily:'SpoqaHanSansNeo-Bold', textWrap:'inherit', marginBottom:'5px'}}>다이렉트 인덱싱</p>
        <p style={{color:DESCRIPTION, fontSize:'14px', paddingLeft:'10px', marginBottom:'2px'}}>최근에 담은 종목</p>
      </div>
      <div>
        {
          recentCart.map((item, index) => (
            <div key={index} style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:'10px 10px 0px 10px'}}>
              <p style={{fontSize:'16px', margin:'0px'}}>{item.name}</p>
              <p style={{fontSize:'16px', margin:'0px'}}>{item.price}원</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
