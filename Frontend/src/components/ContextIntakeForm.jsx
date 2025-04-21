import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'


const ContextIntakeForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    typicalDay: '',
    emotionTriggers: '',
    likesDislikes: '',
    calmingActivities: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real app, this would send data to backend
    console.log('Form data submitted:', formData)
    
    // Navigate to task planner
    navigate('/task-planner')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Tell Us About Yourself</h1>
        <p className="text-muted-foreground">This helps us personalize your experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Context</CardTitle>
          <CardDescription>
            Share some details about your life to help us provide more personalized support
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="typicalDay">What's your typical day like?</Label>
              <Textarea
                id="typicalDay"
                name="typicalDay"
                value={formData.typicalDay}
                onChange={handleChange}
                placeholder="Describe your usual daily routine..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emotionTriggers">When do you feel this emotion most?</Label>
              <Textarea
                id="emotionTriggers"
                name="emotionTriggers"
                value={formData.emotionTriggers}
                onChange={handleChange}
                placeholder="E.g., during work meetings, after using social media, when alone..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="likesDislikes">What are your likes and dislikes?</Label>
              <Textarea
                id="likesDislikes"
                name="likesDislikes"
                value={formData.likesDislikes}
                onChange={handleChange}
                placeholder="Activities, hobbies, interests you enjoy or dislike..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="calmingActivities">What activities help calm you down?</Label>
              <Textarea
                id="calmingActivities"
                name="calmingActivities"
                value={formData.calmingActivities}
                onChange={handleChange}
                placeholder="E.g., meditation, walking, reading, listening to music..."
                required
              />
            </div>

            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Back
              </Button>
              <Button type="submit">
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContextIntakeForm
