import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import axios from 'axios'
import { useState } from 'react'

const VideoSuggestions = () => {
  const navigate = useNavigate();
  const [emotion,setemotion] = useState("");
  const [videos,setvideos] = useState([]);

  useEffect(()=>{

    const savedEmotion = localStorage.getItem('selectedEmotion');
    if (savedEmotion) {
      setemotion(savedEmotion);
    }

    const FetchVideos = async (emotion)=>{

      const res = await axios.get(`http://127.0.0.1:8000/recommend?topic=${savedEmotion}`);
      console.log(res.data.videos);
      setvideos(res.data.videos);

      

    }
    FetchVideos(emotion);

  },[]);
  

  // const videos = [
  //   {
  //     id: '1',
  //     title: 'How to Manage Anxiety - Practical Tips for Daily Life',
  //     thumbnail: 'https://i.ytimg.com/vi/WWloIAQpMcQ/hqdefault.jpg',
  //     channelName: 'Mental Health Channel',
  //     url: 'https://www.youtube.com/watch?v=WWloIAQpMcQ'
  //   },
  //   {
  //     id: '2',
  //     title: '10-Minute Meditation for Anxiety Relief',
  //     thumbnail: 'https://i.ytimg.com/vi/O-6f5wQXSu8/hqdefault.jpg',
  //     channelName: 'Mindfulness Meditation',
  //     url: 'https://www.youtube.com/watch?v=O-6f5wQXSu8'
  //   },
  //   {
  //     id: '3',
  //     title: 'Understanding Anxiety: What\'s Going On in Your Brain',
  //     thumbnail: 'https://i.ytimg.com/vi/ZidGozDhOjg/hqdefault.jpg',
  //     channelName: 'Science of Emotions',
  //     url: 'https://www.youtube.com/watch?v=ZidGozDhOjg'
  //   }
  // ]

  const openVideo = (url) => {
    window.open(url, '_blank')
  }

  return (


    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Recommended Videos</h1>
        <p className="text-muted-foreground">Watch these videos to help understand and manage your emotions</p>
      </div>

      <div className="space-y-4 mb-8">


        {videos ? <>

          {videos.map(video => (
          <Card key={video.id} className="overflow-hidden">
            <div className="md:flex">
              <div 
                className="md:flex-shrink-0 cursor-pointer" 
                onClick={() => openVideo(video.url)}
              >
                <img
    className="h-48 w-full object-cover md:w-48"
    src={`https://img.youtube.com/vi/${new URL(video.url).searchParams.get('v')}/hqdefault.jpg`}
    alt={video.title}
  />
                
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 
                    className="text-lg font-medium mb-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => openVideo(video.url)}
                  >
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    
    
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => openVideo(video.url)}
                    className="flex items-center space-x-2"
                    variant="secondary"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z" />
                    </svg>
                    <span>Watch Video</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        </> : <>
        
        <h1> Fetching videos from youtube ....</h1>
        
        </>}
    
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/task-planner')}
        >
          Back to Tasks
        </Button>
        <Button
          onClick={() => navigate('/community')}
        >
          Join Community
        </Button>
      </div>
    </div>
  )
}

export default VideoSuggestions
