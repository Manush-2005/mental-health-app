import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

//  components

import EmotionDashboard from './components/EmotionDashboard'
import Navbar from './components/NavBar'
import ContextIntakeForm from './components/ContextIntakeForm'
import TaskPlanner from './components/TaskPlanner'
import VideoSuggestions from './components/VideoSuggestions'
import CommunitySupport from './components/CommunitySupport'
import Login from './components/Login'
import Register from './components/Register'


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar/>
        
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<EmotionDashboard />} />
            <Route path="/context-intake" element={<ContextIntakeForm />} />
            <Route path="/task-planner" element={<TaskPlanner />} />
            <Route path="/video-suggestions" element={<VideoSuggestions />} />
            <Route path="/community" element={<CommunitySupport />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
