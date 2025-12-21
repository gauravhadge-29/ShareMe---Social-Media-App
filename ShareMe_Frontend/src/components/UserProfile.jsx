import React from 'react'
import { useState,useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams,useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userCreatedPinsQuery,userQuery,userSavedPinsQuery } from '../utils/data'
import { client } from '../sanityConfig/config'
import MasonryLayout from './MasonaryLayout'
import Spinner from './Spinner'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created') 
  const navigate = useNavigate();
  const {userId} = useParams()

  useEffect(()=>{

    const query = userQuery(userId)

    client.fetch(query)
    .then((data)=>{
      setUser(data[0])
    })

  },[userId])

  useEffect(()=>{
    if(text === 'Created'){
      const createdPinsQuery = userCreatedPinsQuery(userId)
      client.fetch(createdPinsQuery)
      .then((data)=>{
          
        setPins(data)
      })
      .catch((error)=>{
        console.log("Error fetching created pins:", error);
      })
    }
    else{
      const savedPinsQuery = userSavedPinsQuery(userId)
      client.fetch(savedPinsQuery)
      .then((data)=>{
        
        setPins(data)
      })
      .catch((error)=>{
        console.log("Error fetching saved pins:", error);
      })
    }


  },[text,userId])

  if(!user){
    return <Spinner message="Loading profile..."/>
  }

  const randomImage = 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img 
            src={randomImage} 
            alt="random"
            className='w-full h-100 shadow-lg object-cover' 
            />
            <img 
            className='bg-red-500 rounded-full w-20 h-20 -mt-10 shadow-xl object-cover z-10'
            src={user.image}
            alt="user-image" 
            />
            <h1 className='font-bold text-3xl text-center mt-3'>{user.userName}</h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && (
                <button
                  type="button"
                  className='bg-white p-2 rounded-full cursor-pointer shadow-md outline-none'
                  onClick={() => {
                    try {
                      googleLogout();
                    } catch (e) {
                      // ignore
                      console.log(e);
                    }
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  aria-label="Logout"
                >
                  <AiOutlineLogout color='red' fontSize={24} />
                </button>
              )}

            </div>
          </div>


              <div className='text-center mb-7'>
                <button type='button' onClick={(e)=>{
                  setText(e.target.textContent)
                  setActiveBtn('created')
                } 
                }
                className={`${activeBtn === 'created' ? 'bg-red-500 text-white' : 'bg-primary mr-4 text-black'} font-bold p-2 rounded-full w-20 outline-none`}>
                Created</button>
                <button type='button' onClick={(e)=>{
                  setText(e.target.textContent)
                  setActiveBtn('saved')
                } 
                }
                className={`${activeBtn === 'saved' ? 'bg-red-500 text-white' : 'bg-primary mr-4 text-black'} font-bold p-2 rounded-full w-20 outline-none`}>
                Saved</button>
                

              </div>
                {
pins?.length === 0 ? (
  <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
    No Pins Found!
  </div>
) : (             
                
    <div className='px-2'>
      <MasonryLayout pins={pins} />
    </div>
              
    )

}
        </div>

      </div>
      
    </div>
  )
}

export default UserProfile
