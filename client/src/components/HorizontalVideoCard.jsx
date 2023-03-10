import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import thumbnail from '../assets/thumbnail.jpg'
import profilePic from '../assets/profile.jpg'
import { format } from 'timeago.js'
import axios from 'axios'

export default function HorizontalVideoCard({data}) {

    const [channel, setChannel] = useState({})
    // let shortDescription = data.desc.subString(0,2)

    async function fetchChannel(){
        const res = await axios.get(`http://localhost:8000/api/user/find/${data.userId}`);
        setChannel(res.data)
        console.log(res.data)
      }
   
    useEffect(()=>{
        fetchChannel()
        console.log(data.desc.slice(0,2))
    },[])
  return (
        <Link to={`/video/${data._id}`} className='flex sm:gap-4 gap-0 w-3/4 flex-wrap sm:flex-nowrap'>
            <img className='lg:w-96 sm:w-72 sm:h-44 w-auto h-1/2  sm:mb-3 rounded-2xl lg:h-60 hover:opacity-30 object-cover' src={data.imgUrl} alt="thumbnail" />
            <div className="video-details flex flex-col sm:gap-2">
                <div>
                <h2 className="video-title text-white text-xl">{data.title.slice(0,50)}</h2>
                <p className="views text-[#aaaaaa]">{data.views} views . {format(data.createdAt)}</p>
                </div>
                <div className="channel flex items-center gap-2">
                    <img className='rounded-full w-8 h-8' src={channel.img} alt="" />
                    <p className="channel text-[#aaaaaa] capitalize">{channel.name}</p>
                </div>
                <p className="views text-[#aaaaaa]">{data.desc.slice(0,100)+ '...'}</p>
            </div>
        </Link>
  )
}
