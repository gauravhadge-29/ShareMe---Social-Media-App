import React from 'react'
import { useState,useEffect } from 'react'
import {MdDownloadForOffline} from 'react-icons/md'
import { Link,useParams } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { client,urlFor } from '../sanityConfig/config'
import MasonryLayout from './MasonaryLayout'
import { pinDetailMorePinQuery,pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'

const PinDetail = ({user}) => {

  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const {pinId} = useParams()

  
  const fetchPinDetails = (pinId)=>{

    let query = pinDetailQuery(pinId)
    
    if(pinId){
      client.fetch(query)
      .then((data)=>{
        setPinDetail(data[0])


        if(data[0]){
          query = pinDetailMorePinQuery(data[0])

          client.fetch(query)
          .then((res)=>{
            setPins(res)
          })

        }
      })
      .catch((error)=>{
        console.log("Error fetching pin details:", error);
      })
    }

    console.log(pinDetail);
  }

  const addcomment = ()=>{
    console.log("Adding comment:", comment);
    if(comment){
      setAddingComment(true)


      client  
        .patch(pinId)
        .setIfMissing({comments : []})
        .insert('after','comments[-1]',[{
          comment,
          key : uuidv4(),
          postedBy : {
            _type : 'postedBy',
            _ref : user?.sub
          }
        }])
        .commit()
        .then(()=>{
          fetchPinDetails();
          setComment('')
          setAddingComment(false)
        })
        .catch((error)=>{
          console.log("Error adding comment:", error);
        })  

    }

  }

  useEffect(()=>{
    fetchPinDetails(pinId)
  },[pinId])
  
  if(!pinDetail) return <Spinner message="Loading pin..."/>

  return (
    <>
    <div className='flex xl:flex-row flex-col m-auto bg-white' style={{maxWidth:'1500px',borderRadius:'32px'}}>
      <div className='flex justify-center items-center md:items-start flex-initial w-full xl:w-1/2'>
        <img
          src={
            pinDetail?.image?.asset?.url ||
            (pinDetail?.image ? urlFor(pinDetail.image).url() : '')
          }
          alt="user-post"
          className='rounded-t-3xl rounded-b-lg w-full h-auto'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:w-1/2'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a
            href={`${pinDetail.image.asset.url}?dl=`}
            download
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
            <MdDownloadForOffline />
            </a>

          </div>
          <a 
          href={pinDetail.destination}
          target='_blank'
          rel="noreferrer"
          >
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className='text-3xl font-bold break-words mt-3'>
            {pinDetail.title}
          </h1>
          <p className='mt-3'>{pinDetail.about}</p>
        </div>

        <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                        <img src={pinDetail.postedBy?.image} alt="user-profile" className='w-8 h-8 rounded-full object-cover' />
                        <p className='font-semibold'>{pinDetail.postedBy?.userName}</p>
                    </Link>
        
        
        <h2 className='mt-5 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto '>
          {
            pinDetail?.comments?.map((comment,ind)=>{
              return(
                <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={ind}>
                  <img src={comment.postedBy?.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />
                  <div className='flex flex-col'>
                    <p className='font-bold'>{comment.postedBy?.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>  
              )
            })
          }

        </div>

        <div className='flex items-center flex-wrap mt-6 gap-3'>
          <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className=''>
          <img src={pinDetail.postedBy?.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />
          </Link>

          <input
          type='text'
          placeholder='Add a Comment'
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className='flex-1 border-gray-100 outline-none border-2 rounded-2xl p-2  focus:border-gray-300'
          />              
          <button
          type='button'
          onClick={addcomment}
          className={`bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none ${addingComment ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          >{addingComment ? 'Posting...' : 'Post'}</button>          
        </div>
      </div>
    </div>

    {pins?.length> 0  ? (
      <div>
        <h2 className='text-center font-bold mt-8 mb-4 text-2xl'>More like this</h2>
        <MasonryLayout pins={pins}/>
      </div>
    ) : (
      <Spinner message="Loading more pins..."/>
    )
    }

  </>
)}

export default PinDetail
