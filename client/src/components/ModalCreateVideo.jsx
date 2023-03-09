import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.js'


export default function ModalCreateVideo() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [imgProg, setImgProg] = useState(0);
  const [videoProg, setVideoProg] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('')


  //convert plural into singular
  function singularize(words) {
    const singularRules = [
      [/(quiz)zes$/i, "$1"],
      [/^(ox)en/i, "$1"],
      [/([m|l])ice$/i, "$1ouse"],
      [/(matr|vert|ind)(ix|ices)$/i, "$1ix"],
      [/(x|ch|ss|sh)es$/i, "$1"],
      [/([^aeiouy]|qu)ies$/i, "$1y"],
      [/(hive)s$/i, "$1"],
      [/(?:([^f])fe|([lr])f)s$/i, "$1$2"],
      [/sis$/i, "sis"],
      [/([ti])a$/i, "$1um"],
      [/(p)erson$/i, "$1eople"],
      [/(m)an$/i, "$1en"],
      [/(c)hild$/i, "$1hildren"],
      [/(buffal|tomat)o$/i, "$1o"],
      [/(bu)s$/i, "$1s"],
      [/(alias|status)$/i, "$1"],
      [/(octop|vir)us$/i, "$1us"],
      [/(ax|test)is$/i, "$1is"],
      [/s$/i, ""]
    ];
  
    if (Array.isArray(words)) {
      return words.map(word => {
        for (let i = 0; i < singularRules.length; i++) {
          const rule = singularRules[i];
          if (rule[0].test(word)) {
            return word.replace(rule[0], rule[1]);
          }
        }
        return word;
      });
    }
  
    for (let i = 0; i < singularRules.length; i++) {
      const rule = singularRules[i];
      if (rule[0].test(words)) {
        return words.replace(rule[0], rule[1]);
      }
    }
  
    return words;
  }
  
  


  function handleModal(e) {
    e.preventDefault()
    document.getElementById('modal-video').classList.remove('modalAnimationDown')
    document.getElementById('modal-video').classList.add('modalAnimationUp')
    document.getElementById('main').classList.remove('opacity-70')
    document.getElementById('header').classList.remove('opacity-70')
    document.getElementById('body').classList.remove('overflow-y-hidden')
    document.getElementById('modal-video').classList.remove('flex')
    document.getElementById('modal-video').classList.add('hidden')

  }

  function handleTags(e) {
    let tag = e.target.value.split(',');
    setTags(tag)
    console.log(e.target.value)
  }





  const addVideo = async (e) => {
    e.preventDefault()
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8000/api/video/addVideo',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('auth-token')
      },
      credentials: 'include',
      data: {
        title: title,
        desc: desc,
        imgUrl: imgUrl,
        videoUrl: videoUrl,
        category: category,
        tags: singularize(tags)
      }
    });
    let data = await response.data;
    console.log(data);
    setTitle(""); setDesc(""); setCategory(""); setImgUrl(""); setVideoUrl(""); setImgProg(0); setVideoProg(0);
    handleModal(e)
  }

  function fileUpload(file, type) {
    //firebase
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);


    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        type === 'imgUrl' ? setImgProg(Math.round(progress-5)) : setVideoProg(Math.round(progress-5));
        // console.log(imgProg)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;  
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          type === 'imgUrl' ? setImgUrl(downloadURL) : setVideoUrl(downloadURL)
          type === 'imgUrl' ? setImgProg(100) : setVideoProg(100);
        });
      }
    );
    
  }

  useEffect(()=>{
    img && fileUpload(img, "imgUrl")
    console.log(imgUrl)
    console.log(singularize(tags))
  },[img])

  useEffect(()=>{
    video && fileUpload(video, "videoUrl")
    console.log(videoUrl)
  },[video])


  


  return (
    <section
      id="modal-video"
      className="absolute hidden text-white max-w-[750px] justify-center items-start mx-auto  flex-col top-[-120vh] left-0 right-0 z-20 bg-bg-main rounded-2xl py-10 px-2 md:px-32"
    >
      <h2 className="sm:text-6xl text-4xl mx-auto">Add a Video</h2>
      <form onSubmit={addVideo} className="flex flex-col gap-5 w-full mt-10">
        <div className="first-row flex gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="title">Title</label>
            <input
              className="bg-transparent border-gray-600 border rounded-md w-full"
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ''}
            />
          </div>

        </div>

        <div className="first-row flex gap-5 flex-wrap">
          <div className="flex flex-col w-4/5">
            <label htmlFor="tags">Tags</label>
            <input
              className="bg-transparent border-gray-600 border rounded-md w-full"
              type="text"
              id="tags"
              placeholder="Seperate tags by comma"
              onChange={handleTags}
              value={tags}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <select
              className="bg-slate-800 px-4 py-1 rounded-md"
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category || ''}
            >
              <option disabled value="">Select</option>
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="news">News</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>



        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-transparent border-gray-600 border rounded-md h-40"
            type="text"
            id="description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc || ''}
          />
        </div>

        <div className="block">
          <label htmlFor="image">Choose Thumbnail</label>

          
          
          {imgProg > 0 & imgProg <100 ? <p>Uploading {imgProg}% </p> : imgProg === 100 ? <><p>Upload successfully</p><button onClick={()=>{setImgUrl('');setImgProg(0)}}>Cancel</button></> :
          <input onChange={(e) => setImg(e.target.files[0])} className="block" type="file" accept="image/*" id="image" />
          }
        </div>

           {videoProg > 0 & videoProg <100 ? <p>Uploading {videoProg}% </p> : videoProg === 100 ? <><p>Upload successfully</p><button onClick={()=>{setVideoUrl('');setVideoProg(0)}}>Cancel</button></> :
            
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input onChange={(e) => setVideo(e.target.files[0])} id="dropzone-file" type="file" accept="video/*" className="hidden" />
          </label>
        </div>
            }

        <div className="buttons flex justify-end gap-2">
          <button disabled={imgUrl==='' || videoUrl ===''} type="submit" className="border-blue-600 border border-solid rounded-md px-4 py-2 hover:bg-blue-700 hover:text-black">Create</button>
          <button onClick={handleModal} className="border-blue-600 border border-solid rounded-md px-4 py-2 hover:bg-blue-700 hover:text-black">Cancel</button>
        </div>

      </form>
    </section>
  );
}
