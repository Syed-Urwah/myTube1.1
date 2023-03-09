import React, { useEffect, useState } from 'react'
import VideoForm from '../Forms/VideoForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function EditVideo() {

    const {id} = useParams();
    const [video, setVideo] = useState({});

    const fetchVideo = async () =>{
        const response = await axios.get(`http://localhost:8000/api/video/fetchVideo/${id}`)
        console.log(response.data);
        setVideo(response.data);
    }

    useEffect(()=>{
        fetchVideo()
        // console.log(params)
    },[])

    return (
        <section className='text-white w-screen flex justify-center'>
            <VideoForm/>
        </section>
    )
}
