import React, { useEffect, useState } from "react";
import thumbnail from "../assets/thumbnail.jpg";
import channelPic from '../assets/channel.jpg';
import { Link, useLocation } from "react-router-dom";
import {format} from 'timeago.js'
import axios from 'axios'
import th from '../assets/placeholder-thumbnail.png'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import eidt from '../assets/edit.png'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



export default function VideoCard({data, setEdit}) {

  const [channel, setChannel] = useState({})
  const [video, setVideo] = useState(false);
  const location = useLocation();

    
  async function fetchChannel(){
    const res = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/find/${data.userId}`);
    setChannel(res.data)
    console.log(res.data)
  }

  const handleDelete = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios({
        method: 'delete',
        url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/delete/${data._id}`,
        headers:{
          'access_token': localStorage.getItem('auth-token')
        }
      });
      console.log(response.data);
      // setVideo(response.data);
      setEdit(true);
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{
  
    fetchChannel()
  },[video])


  return (
    <>
    <Link to={`/video/${data._id}`} className="video flex flex-col relative">
      <img className="lazyload w-96 mb-3 rounded-2xl h-60 hover:opacity-30 object-cover bg-gray-800"src={data.imgUrl} alt="" />
      <div className="video-details flex justify-between">
        <div className="flex">
        <img className="rounded-full w-12 h-12" src={channel.img} alt="" />
        <div className="details pl-5">
          <h2 className="video-title text-white">{data.title.slice(0,30) + '...'}</h2>
          <p className="channel text-[#aaaaaa] capitalize">{channel.name}</p>
          <p className="views text-[#aaaaaa]">{data.views} views . {format(data.createdAt)}</p>
        </div>
        </div>
        {location.pathname === '/your-video' && 
        <div className="edit-delete flex gap-2">
          <Link to={`/editVideo/${data._id}`}><EditOutlinedIcon/></Link>
          <DeleteOutlineOutlinedIcon onClick={handleDelete}/>
        </div>
        }
        
        
      </div>
    </Link>
    </>
  );
}
