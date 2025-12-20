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

  useEffect(()=>{
    setLoading(true)
    console.log("Fetching pins...")

    if(categoryId){
      //fetch pins based on category
      const query = searchQuery(categoryId)
      client.fetch(query)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
      .catch((error)=>{
        console.error("Error fetching pins by category:", error)
        setLoading(false)
      })
    } else{
      //fetch all pins
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }

  },[categoryId])

  if(loading){
    return <Spinner message="We are adding new ideas to your feed!"/>
  }
  return (
    <div>
      {pins && <MasonaryLayout pins={pins} />}
    </div>
  )
}

export default Feed
