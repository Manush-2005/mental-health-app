import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Button } from './ui/button'
import { cn } from '../lib/utils'



const EmotionDashboard =  () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [description, setDescription] = useState('')

  const emotions = [
    { 
      id: 'anxiety', 
      name: 'Anxiety', 
      icon: '😰', 
      description: 'Feeling of worry, nervousness, or unease about something with an uncertain outcome.'
    },
    { 
      id: 'sadness', 
      name: 'Sadness', 
      icon: '😢', 
      description: 'Feeling unhappy or showing sorrow; sorrowful.'
    },
    { 
      id: 'loneliness', 
      name: 'Loneliness', 
      icon: '😔', 
      description: 'Feeling of being alone or isolated.'
    },
    { 
      id: 'anger', 
      name: 'Anger', 
      icon: '😠', 
      description: 'Strong feeling of annoyance, displeasure, or hostility.'
    },
    { 
      id: 'stress', 
      name: 'Stress', 
      icon: '😫', 
      description: 'State of mental or emotional strain or tension resulting from adverse or demanding circumstances.'
    },
    { 
      id: 'fear', 
      name: 'Fear', 
      icon: '😨', 
      description: 'An unpleasant emotion caused by the threat of danger, pain, or harm.'
    }
  ]

  const handleEmotionSelect = (emotionId) => {
    setSelectedEmotion(emotionId)
    localStorage.setItem('selectedEmotion', emotionId);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedEmotion) return
    
    // In a real app, this would navigate to the next page or send data to backend
    console.log('Selected emotion:', selectedEmotion)
    console.log('Description:', description)
    
    // Navigate to context intake form
    window.location.href = '/context-intake'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">Mental Health Companion</h1>
        <p className="text-muted-foreground">Select an emotion you want to work on today</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {emotions.map((emotion) => (
          <Card 
            key={emotion.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedEmotion === emotion.id ? "border-primary bg-primary/5" : ""
            )}
            onClick={() => handleEmotionSelect(emotion.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">{emotion.icon}</div>
              <CardTitle className="text-lg mb-1">{emotion.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{emotion.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedEmotion && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Tell us more about your {emotions.find(e => e.id === selectedEmotion)?.name.toLowerCase()}
            </CardTitle>
            <CardDescription>
              How does it affect you and when does it usually appear?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="E.g., I feel anxious during work meetings and before important deadlines..."
                  rows={4}
                ></textarea>
                
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default EmotionDashboard
