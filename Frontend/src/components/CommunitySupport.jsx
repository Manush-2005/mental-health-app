import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { cn } from '../lib/utils'

const CommunitySupport = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [activeGroup, setActiveGroup] = useState('anxiety')
  const messagesEndRef = useRef(null)
  
  // Mock current user
  const currentUser =  {
    id: 'user1',
    username: 'Anonymous_User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
  }
  
  // Mock other users
  const users =  [
    {
      id: 'user2',
      username: 'Anonymous_Helper',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2'
    },
    {
      id: 'user3',
      username: 'Anonymous_Friend',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3'
    }
  ]
  
  // Mock emotion groups
  const emotionGroups = [
    { id: 'anxiety', name: 'Anxiety', activeUsers: 24 },
    { id: 'sadness', name: 'Sadness', activeUsers: 18 },
    { id: 'loneliness', name: 'Loneliness', activeUsers: 15 },
    { id: 'anger', name: 'Anger', activeUsers: 12 },
    { id: 'stress', name: 'Stress', activeUsers: 27 }
  ]
  
  // Mock initial messages
  useEffect(() => {
    // In a real app, these would be fetched from the backend
    const initialMessages =  [
      {
        id: '1',
        userId: 'user2',
        username: 'Anonymous_Helper',
        text: 'Welcome to the Anxiety support group! How is everyone feeling today?',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        userId: 'user3',
        username: 'Anonymous_Friend',
        text: 'I\'ve been practicing deep breathing whenever I feel anxious, and it\'s been helping a lot!',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        userId: 'user2',
        username: 'Anonymous_Helper',
        text: 'That\'s great to hear! Deep breathing is a powerful technique. Does anyone else have strategies they\'d like to share?',
        timestamp: new Date(Date.now() - 900000)
      }
    ]
    
    setMessages(initialMessages)
  }, [activeGroup])
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (!newMessage.trim()) return
    
    const message =  {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      text: newMessage,
      timestamp: new Date()
    }
    
    setMessages([...messages, message])
    setNewMessage('')
  }
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Community Support</h1>
        <p className="text-muted-foreground">Connect with others who understand what you're going through</p>
      </div>
      
      <Card className="overflow-hidden">
        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 border-r border-border bg-muted/10">
            <div className="p-4 border-b border-border">
              <h2 className="font-medium">Emotion Groups</h2>
            </div>
            <div className="overflow-y-auto h-[calc(600px-57px)]">
              {emotionGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => setActiveGroup(group.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 flex justify-between items-center",
                    activeGroup === group.id 
                      ? "bg-primary/10 border-l-4 border-primary" 
                      : "hover:bg-muted/20"
                  )}
                >
                  <span className="font-medium">{group.name}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {group.activeUsers}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border flex items-center">
              <h2 className="font-medium">
                {emotionGroups.find(g => g.id === activeGroup)?.name} Support Group
              </h2>
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {emotionGroups.find(g => g.id === activeGroup)?.activeUsers} online
              </span>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={cn("flex", message.userId === currentUser.id ? "justify-end" : "justify-start")}
                >
                  <div className={cn("flex max-w-xs md:max-w-md", message.userId === currentUser.id ? "flex-row-reverse" : "flex-row")}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={message.userId === currentUser.id 
                          ? currentUser.avatar 
                          : users.find(u => u.id === message.userId)?.avatar || ''
                        } 
                        alt={message.username} 
                      />
                      <AvatarFallback>{message.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div 
                      className={cn(
                        "mx-2 px-4 py-2 rounded-lg",
                        message.userId === currentUser.id 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}
                    >
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-sm">{message.username}</span>
                        <span className={cn(
                          "ml-2 text-xs",
                          message.userId === currentUser.id 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        )}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit">
                  Send
                </Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">
                All messages are anonymous. Be respectful and supportive.
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => navigate('/video-suggestions')}
        >
          Back to Videos
        </Button>
      </div>
    </div>
  )
}

export default CommunitySupport
