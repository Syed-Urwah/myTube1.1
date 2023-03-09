import React, { useEffect, useState } from 'react'
import profilePic from "../assets/profile.jpg";
import { format } from 'timeago.js';
import axios from 'axios';


export default function CommentCard(props) {
    const [user,setUser]=useState({});

    const fetchUser = async () =>{
        const response = await axios.get(`http://localhost:8000/api/user/find/${props.comment.userId}`);
        let data = await response.data;
        setUser(data);
        console.log(data);
    }

    useEffect(()=>{
        fetchUser();
        console.log(user)
    },[])

  return (
    <section className="comments-card flex flex-col gap-4">
        {/* <div className="comments flex gap-3">
            <img className="rounded-full w-12 h-12" src={user.img} alt="" />
            <div>
            <div className="flex gap-1">
                <p>{user.name}.</p>
                <p className="text-[#aaaaaa]">{format(props.comment.createdAt)}</p>
            </div>
            <p>
                {props.comment.desc}
            </p>
            </div>
        </div> */}
        <div className="comments flex gap-3">
            <img className="rounded-full w-12 h-12" src={user.img} alt="" />
            <div>
            <div className="flex gap-1">
                <p>{user.name}.</p>
                <p className="text-[#aaaaaa]">{format(props.comment.createdAt)}</p>
            </div>
            <p>
                {props.comment.desc}
            </p>
            </div>
        </div>
      </section>
  )
}
