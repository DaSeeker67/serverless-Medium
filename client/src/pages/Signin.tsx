
import React from 'react'
import { Quote } from '../components/Quote'
import { Auth } from '../components/Auth'
function Signin() {
  return (
     <div className='grid grid-cols-2 md: grid-cols-1'>
            <div className='flex justify-center'><Auth type='signin'></Auth></div>
            <div className='invisible md:visible'>
                <Quote/>
            </div>
            
          
        </div>
  )
}

export default Signin
