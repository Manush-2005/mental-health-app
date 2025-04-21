import React from 'react'
import { Link } from 'react-router-dom'
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from './ui/navigation-menu'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">Empower Mind</Link>
          
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-1">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink 
                    className={cn(
                      "block px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
                    )}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/task-planner">
                  <NavigationMenuLink 
                    className={cn(
                      "block px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
                    )}
                  >
                    Tasks
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/video-suggestions">
                  <NavigationMenuLink 
                    className={cn(
                      "block px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
                    )}
                  >
                    Videos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/community">
                  <NavigationMenuLink 
                    className={cn(
                      "block px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
                    )}
                  >
                    Community
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/login">
                  <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Login
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
            
            {/* Mobile menu button - would be expanded in a real implementation */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </div>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar
