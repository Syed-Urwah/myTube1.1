import React, { useEffect } from 'react'
import VideoForm from '../Forms/VideoForm'
import video from '../sampleVideo.json'

export default function CreateVideo() {

    useEffect(()=>{
        console.log(video)
    },[])

    return (
        <section className='text-white w-screen flex justify-center'>
            <VideoForm/>
        </section>
    )
}
