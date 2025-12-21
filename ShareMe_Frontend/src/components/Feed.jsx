import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityConfig/config'
import MasonaryLayout from './MasonaryLayout'
import Spinner from './Spinner'
import { searchQuery,feedQuery } from '../utils/data'


const Feed = () => {
  const [loading ,setLoading] = useState(false)
  const {categoryId} = useParams()
  const [pins, setPins] = useState(null)
  const [pinNotFound, setPinNotFound] = useState(false)

  useEffect(()=>{
    setLoading(true)
    console.log("Fetching pins...")

    if(categoryId){
      //fetch pins based on category
      const query = searchQuery(categoryId)
      console .log("Category ID:", categoryId)
      client.fetch(query)
      .then((data)=>{
        setPins(data)
        console.log("Fetched pins by category:", data)
        setLoading(false)
      })
      .catch((error)=>{
        console.log("Error fetching pins by category:", error)
        setLoading(false)
      })
    } else{
      //fetch all pins
      client.fetch(feedQuery)
      
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
      console.log("Fetched all pins")
    }

  },[categoryId])

  if(loading){
    return <Spinner message="We are adding new ideas to your feed!"/>
  }

  if(!pins?.length){
    return <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>No Pins Found!</div>
  }
  return (
    <div>
      {pins && <MasonaryLayout pins={pins} />}
    </div>
  )
}

export default Feed
