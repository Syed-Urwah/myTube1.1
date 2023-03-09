import React, { useEffect, useState } from "react";
import thumbnail from "../assets/thumbnail.jpg";
import channelPic from '../assets/channel.jpg'
import VideoCard from "./VideoCard";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector } from "react-redux";


export default function Vidoes({type,category}) {

  const [videos, setVideos] = useState([]);
  const [loading , setLoading] = useState(true)
  const {currentUser} = useSelector((state)=>state.user)

  async function getVideos(){
    setLoading(true);
    if(!type){
      const response = await axios.get(`http://localhost:8000/api/video/category?catg=${category}`)
      setVideos(response.data);
    
    
    }else{
      const response = await axios.get(`http://localhost:8000/api/video/${type}`,{
      headers:{
        'access_token': localStorage.getItem('auth-token')
      }
    })
      setVideos(response.data);
      console.log(response)
    }
    //stop loading
    setTimeout(()=>{
      setLoading(false)
    },500)
  }


  useEffect(()=>{
    console.log(currentUser)
    
    getVideos();

    console.log(Object.keys(videos).length)
  },[type])


  return (
    <section className="w-screen bg-bg-main flex justify-center gap-4 flex-wrap pt-10 text-white">

      {loading ? <PuffLoader className="m-auto" color={"#FFFFFF"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> : 
      Object.keys(currentUser).length !== 0 ? 
      Object.keys(videos).length !== 0 ? videos.map((e)=>{
        return <VideoCard key={e._id} data={e}/>
      }): <h2 className="text-white m-auto">Kindly Subscribed any Channel to see their videos</h2>
      : "login to see subscribed videos"
      
      }

      
      

    </section>
  );
}
