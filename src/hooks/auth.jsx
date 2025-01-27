import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { api } from '../services/api'

export const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  updateProfile: () => {}
})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { user, token } = response.data

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user))
      localStorage.setItem('@rocketnotes:token', token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({ user, token })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('Unable to sign in. Please try again.')
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@rocketnotes:token')
    localStorage.removeItem('@rocketnotes:user')
    setData({})
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append('avatar', avatarFile)

        const response = await api.patch('/users/avatar', fileUploadForm)
        user.avatar = response.data.avatar
      }

      await api.put('/users', user)

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user))
      setData({ user, token: data.token })

      alert('Profile updated successfully!')
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('Unable to update the profile. Please try again.')
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('@rocketnotes:user')
    const token = localStorage.getItem('@rocketnotes:token')

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setData({ token, user: JSON.parse(user) })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ updateProfile, signIn, signOut, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
