import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import share from '../assets/share.mp4'
import logo from '../assets/logo.png'
import {jwtDecode} from 'jwt-decode'
import { client } from '../sanityConfig/config'

const Login = () => {
  const navigate = useNavigate()
  const responseGoogle = async (response)=>{

    try {
      const decoded = jwtDecode(response.credential);
      console.log('User Info', decoded);

      localStorage.setItem('user', JSON.stringify(decoded));

      const {name, email, sub, picture } = decoded;

      console.log('Decoded Info:', name, email, sub, picture);

      const doc = { 
        _id: sub,
        _type: 'user',
        userName: name,
        email : email,
        image: picture,
      }

      await client.createIfNotExists(doc)
      console.log('Sanity user ensured')
      navigate('/', { replace: true })

    } catch (error) {
      console.error('Error processing Google login response', error);
    }
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
        src={share}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover' 
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay z-10'>
          <div className='p-5'>
            <img 
            src={logo} 
            alt="logo" 
            width="130px"
            />
          </div>

          <div className='shadow-2xl'>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log('Login success', credentialResponse)
                responseGoogle(credentialResponse)
              }}
              onError={() => {
                console.log('Login Failed')
              }}
              ux_mode="popup"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
