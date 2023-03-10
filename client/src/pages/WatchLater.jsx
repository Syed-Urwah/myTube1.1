import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'
import PuffLoader from "react-spinners/PuffLoader";


export default function WatchLater() {

    const [videos , setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () =>{
        setLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: 'https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/watch-later',
                headers: {
                    'access_token': localStorage.getItem('auth-token')
                }
            });
            setVideos(response.data);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
        
    }

    useEffect(()=>{
        fetchVideos()
        console.log(Object.keys(videos).length);
    },[])

  return (
    <section className="w-screen bg-bg-main flex justify-center gap-4 flex-wrap pt-10 text-white">
        {loading ? <PuffLoader className="m-auto" color={"#FFFFFF"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> : 
        Object.keys(videos).length === 0 ? <h2 className='text-white m-auto'>No video saved in watchLater</h2> : 
        videos.map((e)=>{
            if(e !== null)
        return <VideoCard key={e._id} data={e}/>
        })
        }
    </section>
  )
}
