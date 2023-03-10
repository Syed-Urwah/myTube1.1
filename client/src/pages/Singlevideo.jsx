import React,{useEffect, useState} from 'react'
import demoVideo from '../assets/demo-video.mp4'

import shareIcon from '../assets/share.svg'
import saveIcon from '../assets/layer-plus.svg'
import Comments from '../components/Comments'
import RecommendedCard from '../components/RecommendedCard'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../redux/user/CurrentUserSlice'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PuffLoader from "react-spinners/PuffLoader";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

export default function SingleVideo() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [resComments, setresComments] = useState(false)
    const [video , setVideo] = useState({});
    const [user , setUser] = useState({});
    const [subscribe, setSubscribe] = useState(false);
    const [like, setLike] = useState(false)
    const [dislike, setDislike] =useState(false);
    const [watchLater, setWatchLater] = useState(false);
    const [recVideos, setRecVideos] = useState([])
    const [catgVideos, setCatgVideos] = useState([])
    let {id} = useParams();
    let params = useParams();

    const currentUser = useSelector(state => state.user.currentUser)

    function browserWidth (){
        let width = window.innerWidth;
            // console.log(width)
            if(width < 1024){
                setresComments(true);
            }else{
                setresComments(false)
            }
    }

    //fetching video
    const fetchVideo = async () =>{
        try {
            setLoading(true)
            const response = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/fetchVideo/${id}`)
            let data = await response.data
            setVideo(data);
            console.log(video)

            //getting recommended videos
            const recRes = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/tags?tag=${data.tags}`)
            console.log(recRes.data)
            setRecVideos(recRes.data);

            //get same category videos
            const catg = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/category?catg=${data.category}`);
            console.log(catg)
            setCatgVideos(catg.data)

            //getting user of the video
            const res = await axios.get(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/find/${data.userId}`)
            setUser(res.data);
            console.log(res.data._id)

            //updaing the history of user

            //checking the subscribtion
            if(currentUser.subscribedUsers.includes(res.data._id)){
                setSubscribe(true)
                console.log("user already subscribed this channel")
            }else{
                setSubscribe(false)
            }

            //checking user likes
            if(data.likes.includes(currentUser._id)){
                console.log('user already liked this video')
                setLike(true);
            }else{
                setLike(false)
            }
            //checking user dislikes
            if(data.dislikes.includes(currentUser._id)){
                setDislike(true)
                console.log("user already disliked")
            }else{
                setDislike(false)
            }

            //checking watchLater
            if(currentUser.watchLater.includes(data._id)){
                setWatchLater(true);
                console.log("already watchLater")
            }else{
                setWatchLater(false);
                console.log("not watchLater")
            }
            
            setTimeout(()=>{
                setLoading(false)
            }, 500)
            // setLoading(false)
        } catch (error) {
            console.log(error)
        }
      
    }

    const updatingHistory = async () =>{
        const response = await axios({
            method: 'put',
            url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/history/${id}`,
            headers:{
                'access_token': localStorage.getItem('auth-token')
            }
        })
        console.log(response.data);
    }

    //increasing the video views by 1
    const increaseVideViews = async () =>{
        const response = await axios.put(`https://my-tube-server-git-master-syed-urwah.vercel.app/api/video/views/${id}`)
        
        console.log(response.data);
    }

    //subscribe
    async function handleSubscribe (){
            const response = await axios({
                method: 'put',
                url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/sub/${user._id}`,
                headers: {
                    'access_token': localStorage.getItem('auth-token')
                }, 
                
              });
            let data = await response.data;
            console.log(response.data);
            dispatch(loginSuccess(response.data));
            setSubscribe(true);
            user.subscribers++
       
        
    }

    //unsubscribe
    async function handleUnSubscribe (){
        if(Object.keys(currentUser).length !== 0){
            const response = await axios({
                method: 'put',
                url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/unsub/${user._id}`,
                headers: {
                    'access_token': localStorage.getItem('auth-token')
                }, 
                
              });
            let data = await response.data;
            console.log(response.data);
            dispatch(loginSuccess(response.data));
            setSubscribe(false);
            user.subscribers--
        }else{
            console.log("kindly login first")
        }
       
   
    
}

    const handleLike = async () =>{
        if(Object.keys(currentUser).length !== 0){
            const response = await axios({
                method: 'put',
                url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/like/${video._id}`,
                headers: {
                    'access_token': localStorage.getItem('auth-token')
                }, 
                
              });
              let data = await response.data;
              console.log(data);
            if(!like){
              setLike(true);
              setDislike(false)
              video.likes.length++
            }else{
                setLike(false);
                video.likes.length--
            }
        }else{
            console.log("user not signIn")
        }
        
    }   

    const handleDisLike = async () =>{
        const response = await axios({
            method: 'put',
            url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/unlike/${video._id}`,
            headers: {
                'access_token': localStorage.getItem('auth-token')
            }, 
            
          });
          let data = await response.data;
          console.log(data);

        //if user didnt dislike before
        if(!dislike){
              setLike(false);
              setDislike(true);
               like && video.likes.length--
        }else{
            setDislike(false)
        }
          
        
        
    }
    
    const handleWatchLater = async () =>{
        const response = await axios({
            method: 'put',
            url: `https://my-tube-server-git-master-syed-urwah.vercel.app/api/user/watch-later/${video._id}`,
            headers: {
                'access_token': localStorage.getItem('auth-token')
            }, 
            
          });
        console.log(response.data);
        dispatch(loginSuccess(response.data));
        if(watchLater){
            setWatchLater(false)
        }else{
            setWatchLater(true);
        }
        console.log(currentUser);
        
    }

    function handleShare(){
        navigator.clipboard.writeText(window.location.href);
        alert("Link Copied")
        // console.log(window.location.href)
    }
    



    

    

    useEffect(() => {
        window.onresize = browserWidth
        window.onload = browserWidth
        
        console.log(currentUser)
        console.log(localStorage.getItem('auth-token'))
        increaseVideViews();
        updatingHistory();
        fetchVideo();
        // console.log(currentUser.subscribedUsers.includes(user._id))

        
        
    },[id])
    

  return (
    // <main id='main' className='bg-bg-main'>
    <>
        {/* <Navbar display="hidden1" videoId={id}/> */}

        {loading ? <PuffLoader className='m-auto' color={"#FFFFFF"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>
        : 
            <section className='xl:w-[95%] mx-auto text-white flex flex-col lg:flex-row gap-4'>
                <section className="video-section xl:w-[70%] lg:w-[62%] flex flex-col lg:ml-4"> 
                    
                    <div className="video-wrapper w-full max-h-[600px]">
                        <video id='video' className='h-full w-full bg-gray-900' poster={video.imgUrl} loop src={video.videoUrl} width="1080px" controls/>
                    </div>
                        
                    <div className='flex flex-col gap-4'>

                    <h2 className='font-semibold text-2xl'>{video.title}</h2>

                    <div className="channel flex lg:flex-nowrap flex-wrap justify-between items-center w-full gap-2">

                        <div className="left flex items-center gap-5">
                            <img className='w-12 h-12 rounded-full' src={user.img} alt="" />
                            <div className='flex flex-col'>
                                <h2 className='text-lg'>{user.name}</h2>
                                <p className='text-[#aaaaaa]'>{user.subscribers} subscribers</p>
                            </div>
                            {!subscribe?<button onClick={handleSubscribe} className='border-solid bg-white text-black rounded-xl px-3 py-1 text-sm font-semibold'>Subscribe</button>
                            :<button onClick={handleUnSubscribe} className='border-solid bg-[#2d2b2b] text-white rounded-xl px-3 py-1 text-sm font-semibold'>UnSubscribe</button>
                        }  
                        </div>

                        <div className="right flex gap-5 items-center">
                            <div className="like-dislike flex items-center gap-4 gray-button">
                                <button onClick={handleLike}>
                                {!like ? <ThumbUpOffAltOutlinedIcon/>
                                :<ThumbUpAltIcon/>
                                }
                                </button>
                                
                                <p className='border-r-2 pr-2'>{video.likes === undefined ? "0" : video.likes.length}</p>
                                <button onClick={handleDisLike}>
                                    {!dislike ? <ThumbDownAltOutlinedIcon/>
                                    :<ThumbDownAltIcon/>
                                    }
                                </button>
                            </div>
                            <div onClick={handleShare} className="share flex gap-2 items-center gray-button hover:cursor-pointer">
                                <img className='w-5 h-5' src={shareIcon} alt="" />
                                <p>Share</p>
                            </div>


                            <div onClick={handleWatchLater} className="share flex gap-2 items-center gray-button hover:cursor-pointer">
                                {!watchLater ? <LibraryAddOutlinedIcon/> : <LibraryAddCheckIcon/>}
                                {/* <img className='w-5 h-5' src={saveIcon} alt="" /> */}
                                <p>Save</p>
                            </div>
                        </div>
                    </div>

                    <div className="description bg-border-bg px-2 py-2 rounded-2xl w-full">
                        <p>{video.views} views {format(video.createdAt)}</p>
                        <p className='description'>{video.desc}</p>
                    </div>

                    {!resComments && <Comments videoId = {video._id}/>}

                    </div>
                </section>

                <section className="flex flex-col lg:items-center items-start lg:w-2/5 gap-3 ml-4">
                    {recVideos.map((e)=>{
                        if(e._id !== video._id){
                            return <RecommendedCard key={e._id} video = {e}/>
                        }
                        
                    })}

                    {catgVideos.map((e)=>{
                        if(e._id !== video._id && recVideos.includes(e._id) === false){
                            // return <RecommendedCard key={e._id} video = {e}/>
                            console.log(recVideos.includes(catgVideos))
                            console.log(e.title)
                        }
                        
                    })}
                
                </section>
                
                {resComments && <Comments videoId={video._id}/>}
            </section>
        }
        </>
        // </main>
  )
}
