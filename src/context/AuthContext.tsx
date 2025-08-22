import React, { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from '@/lib/customJWTPayload'
import { getAuthToken, removeAuthToken } from '@/lib/axiosHelper'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  isAuthenticated: boolean
  isContractor: boolean
  isOrganization: boolean
  isRecyclingPlant: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isContractor, setIsContractor] = useState(false)
  const [isOrganization, setIsOrganization] = useState(false)
  const [isRecyclingPlant, setIsRecyclingPlant] = useState(false)

  // const navigate = useNavigate()

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token)
        //@ts-ignore
        localStorage.setItem("userId",decoded.userId)
        setIsAuthenticated(true)
        if (decoded.role === 'CONTRACTOR') {
          setIsContractor(true)
        } else if (decoded.role === 'ORGANIZATION') {
          setIsOrganization(true)
        } else if (decoded.role === 'RECYCLING_PLANT') {
          setIsRecyclingPlant(true)
        }
      } catch (error) {
        console.error('Invalid token:', error)
        removeAuthToken()
        setIsAuthenticated(false)
        setIsContractor(false)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const logout = async () => {
    try {
      await axios.post('api/v1/auth/logout')
      //@ts-ignore
      localStorage.removeItem("userId")
      removeAuthToken()
      setIsAuthenticated(false)
      setIsContractor(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isContractor,
        isOrganization,
        isRecyclingPlant,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
