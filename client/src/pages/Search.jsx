import React, { useEffect, useState } from 'react'
import HorizontalVideoCard from '../components/HorizontalVideoCard'
import { useSelector } from 'react-redux'
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';


export default function Search() {

  const query = useSelector(state=>state.user.query);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useSelector((state)=>state.user)


  const fetchVideos = async () =>{
    setLoading(true);
    const response = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/search?q=${query}`);
    setVideos(response.data);
    console.log(response.data);
    setLoading(false)
    console.log(Array.isArray(videos))
  }

  useEffect(()=>{
    fetchVideos()
    console.log(query)
  },[query])

  return (
    <section className="w-screen bg-bg-main flex flex-col items-center gap-4 flex-wrap pt-10 text-white">
        {loading ? <PuffLoader className="m-auto" color={"#FFFFFF"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> :
          Object.keys(currentUser).length !== 0 ?
          Array.isArray(videos) ?
          videos.map((e)=>{
            return <HorizontalVideoCard key={e._id} data={e}/>
          }): 'search again' 
          : 'login first' 
        }
    </section>
  )
}
