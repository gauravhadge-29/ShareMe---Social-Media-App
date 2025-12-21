import React from 'react'
import { useState,useEffect } from 'react'
import { client } from '../sanityConfig/config'
import MasonaryLayout from './MasonaryLayout'
import Spinner from './Spinner'
import { feedQuery,searchQuery } from '../utils/data'

const Search = ({searchTerm}) => {

  const [pins, setPins] = useState(null)
  const [loading ,setLoading] = useState(false)
  useEffect(()=>{
    if(searchTerm){
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }


    },[searchTerm])
  return (
    <div>
      {loading ? (
        <Spinner message="Searching for pins..."/>
      ) :
      pins?.length ? (
        <MasonaryLayout pins={pins}/>
      ) : ( 
        <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>No Pins Found!</div>
      )
      }
    </div>
  )
}

export default Search
