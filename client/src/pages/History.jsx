import React, { useEffect, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import axios from 'axios';
import VideoCard from '../components/VideoCard';

export default function History() {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVideo = async () =>{
        setLoading(true);
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8000/api/video/history',
            headers:{
                'access_token': localStorage.getItem('auth-token')
            }
        });
        console.log(response.data);
        setVideos(response.data.reverse());
        setLoading(false);
    }

    useEffect(()=>{
        fetchVideo();
    },[])

  return (
    <section className="w-screen bg-bg-main flex justify-center gap-4 flex-wrap pt-10 text-white">
      {loading ? <PuffLoader className="m-auto" color={"#FFFFFF"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> : 
    Object.keys(videos).length === 0 ? <h2 className='text-white m-auto'>You didn't create any video yet</h2> : 
    videos.map((e)=>{
      if(e !== null)
        return <VideoCard key={e._id} data={e}/>
    })
    }
    </section>
  )
}
