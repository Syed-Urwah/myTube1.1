import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import VideoCard from '../components/VideoCard'
import PuffLoader from "react-spinners/PuffLoader";

export default function YourVideo() {

    const {currentUser} = useSelector(state=>state.user)

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edit , setEdit] = useState(false);

    const fetchVideos = async () =>{
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/video/userVideo/${currentUser._id}`)
        console.log(response.data);
        setVideos(response.data)
        setLoading(false);
    }

    useEffect(()=>{
        fetchVideos()
        console.log(currentUser)
    },[edit])


  return (
    
    <section className="w-screen bg-bg-main flex justify-center gap-4 flex-wrap pt-10 text-white">
      {loading ? <PuffLoader className="m-auto" color={"#FFFFFF"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> : 
    Object.keys(videos).length === 0 ? <h2 className='text-white m-auto'>You didn't create any video yet</h2> : 
    videos.map((e)=>{
        return <VideoCard key={e._id} data={e} setEdit={setEdit}/>
    })
    }
    </section>
  )
}
