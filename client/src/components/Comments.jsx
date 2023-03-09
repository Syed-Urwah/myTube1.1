import React, { useEffect, useState } from "react";
import profilePic from "../assets/profile.jpg";
import CommentCard from "./CommentCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Comments(props) {

  const [comment, setComment] = useState([]);
  const [myComment, setMyComment] = useState({
    decs: ""
  })

  const params = useParams();

  const getvalue = (e) =>{
    setMyComment({
      decs: e.target.value
    })
    console.log(e.target.value)
    console.log(myComment)
  }



  const fetchComments = async () =>{
    const response = await axios.get(`http://localhost:8000/api/comment/${params.id}`)
    let data = response.data;
    console.log(data)
    setComment(data);
  }
  

  const addComment = async () =>{
    const response = await axios({
      method: 'post',
      url: `http://localhost:8000/api/comment/add/${params.id}`,
      headers: {
          'access_token': localStorage.getItem('auth-token')
      },
      data:{
        desc: myComment.decs
      } 
      
    });
    let data =await response.data;
    // comment.concat(data)
    setComment(comment.concat(data))
    console.log(data);
  }


  useEffect(()=>{
    console.log(params.id)
    fetchComments();

  },[])
 

  return (
    <section className="gap-4 flex flex-col w-full text-sm font-semibold">
      <div>
        <div className="add-comment flex gap-3 items-end">
          <img className="rounded-full w-12 h-12" src={profilePic} alt="" />
          <textarea
            id="comment-input"
            className="w-full bg-inherit outline-none border-b border-[#3f3f3f] h-10"
            placeholder="Add a Comment..."
            type="text"
            onChange={getvalue}
            value={comment.decs}
          />
          
        </div>
        <div className="flex justify-end gap-4 pt-2">
          <button>Cancel</button>
          <button onClick={addComment} className="border-solid border bg-[#178eef] rounded-2xl text-black py-2 px-4">Comment</button>
        </div>
      </div>
      {comment.map((e)=>{
        return <CommentCard key={e._id} comment={e}/>
      })}
    </section>
  );
}
