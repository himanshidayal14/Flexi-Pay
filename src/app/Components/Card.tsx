import React from 'react'
import '../style/Card.css'


import AnonLogin from './AnonLogin'
import MeteorCard2 from './meteorCard2'
export default function Card() {
    return (
        <div style={{display:"flex" , justifyContent:"center" , marginTop:"6%"}} className='Anon-card-align'>
            <div className="card">
               <div className="hero BigText text-center mt-8" style={{ marginTop : "20px"}}>
                    <h1 className="text">Verify Anon-Aadhar</h1>
                    <h1 className="text2 mt-3" style={{fontSize:"24px"}}>
                        
                    Anon Aadhaar is a zk-SNARK-based protocol enabling Aadhaar holders to prove identity privately.  
Built by Ethereum Foundation, it ensures verification without revealing personal data.  
Secure, private, and non-interactive.</h1>
                </div>
               
               <div style={{display:"flex" , justifyContent:"center" , marginTop:"6%" , marginBottom : "50px"}}>
                <AnonLogin />
               </div>
               <div>
                
               </div>
               
                <MeteorCard2  />
              
           
            </div>
        </div>
        
    )
}
