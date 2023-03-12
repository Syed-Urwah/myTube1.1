import React, { useEffect, useState } from "react";
import thumbnail from "../assets/thumbnail.jpg";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

export default function RecommendedCard({video}) {

  const [user, setUser] = useState({})


  const fetchUser = async () =>{
    const response = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/find/${video.userId}`)
    setUser(response.data);
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    
      <Link to={`/video/${video._id}`} className="flex justify-center gap-2">
        <img className="w-44 h-32 object-cover rounded-2xl" src={video.imgUrl} alt="" />
        <div className="details flex flex-col gap-1">
          <h2 className="video-title text-white">{video.title.slice(0,10)+ '...'}</h2>
          <p className="channel text-[#aaaaaa]">{user.name}</p>
          <p className="views text-[#aaaaaa]">{video.views} views . {format(video.createdAt)}</p>
        </div>
      </Link>
  );
}
