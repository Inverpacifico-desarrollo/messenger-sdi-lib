'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getUserByUserAuthIdChatService } from '../services/user.services'
import { UserChat } from '../types/user-chat.types'
import { getPermissionsMessenger, meService } from '../services/auth-services'
import { configureChatHttp } from '../lib/http-request'

export interface ChatConfig {
  apiBaseUrl: string
  authToken: string
  applicationId: string | number
  reverb: {
    key: string
    host: string
    port: number
    wsPath: string
    scheme: 'http' | 'https'
  }
}

export interface ChatContextValue {
  currentUser: UserChat | null
  currentUserId: string
  permissions: string[]
  isLoadingUser: boolean
  hasError: boolean
  error: Error | null
  config: ChatConfig
  setCurrentUser: (user: UserChat) => void
}

export interface ChatProviderProps {
  config: ChatConfig
  children: React.ReactNode
}

const ChatContext = createContext<ChatContextValue | null>(null)

function validateChatConfig(config: ChatConfig): void {
  const missingValues: string[] = []

  if (!config.apiBaseUrl?.trim()) missingValues.push('apiBaseUrl')
  if (!config.authToken?.trim()) missingValues.push('authToken')
  if (config.applicationId === undefined || config.applicationId === null) {
    missingValues.push('applicationId')
  }

  if (!config.reverb) {
    missingValues.push('reverb')
  } else {
    if (!config.reverb.key?.trim()) missingValues.push('reverb.key')
    if (!config.reverb.host?.trim()) missingValues.push('reverb.host')
    if (!Number.isFinite(config.reverb.port) || config.reverb.port <= 0) {
      missingValues.push('reverb.port')
    }
    if (!config.reverb.wsPath?.trim()) missingValues.push('reverb.wsPath')
    if (config.reverb.scheme !== 'http' && config.reverb.scheme !== 'https') {
      missingValues.push('reverb.scheme')
    }
  }

  if (missingValues.length > 0) {
    throw new Error(`Configuración incompleta del chat: ${missingValues.join(', ')}`)
  }
}

export function ChatProvider({ config, children }: ChatProviderProps) {
  validateChatConfig(config)

  const { authToken } = config
  const [currentUser, setCurrentUserState] = useState<UserChat | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [loadedContextKey, setLoadedContextKey] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [errorContextKey, setErrorContextKey] = useState<string | null>(null)
  const contextKey = JSON.stringify([config.apiBaseUrl, config.applicationId, authToken])

  useEffect(() => {
    let isMounted = true

    if (!authToken) {
      return () => {
        isMounted = false
      }
    }

    configureChatHttp({
      apiBaseUrl: config.apiBaseUrl,
      authToken
    })

    const loadCurrentUser = async () => {
      try {
        const authUserResponse = await meService()
        const chatUserResponse = await getUserByUserAuthIdChatService(authUserResponse.data.data.id)

        const userData: UserChat = chatUserResponse.data.data

        const permissionResponse = await getPermissionsMessenger({
          userId: userData.attributes.user_auth_id,
          applicationId: config.applicationId
        })
        const permissionData = permissionResponse.data.data?.map((s) => s.attributes.name) ?? []

        if (!userData?.id) {
          throw new Error('La respuesta no contiene un usuario válido para el chat')
        }

        if (isMounted) {
          setCurrentUserState(userData)
          setPermissions(permissionData)
          setLoadedContextKey(contextKey)
          setError(null)
          setErrorContextKey(null)
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error al cargar el usuario en ChatProvider:', error)
          setError(error instanceof Error ? error : new Error('Error al inicializar el chat'))
          setErrorContextKey(contextKey)
        }
      }
    }

    void loadCurrentUser()

    return () => {
      isMounted = false
    }
  }, [authToken, config.apiBaseUrl, config.applicationId, contextKey])

  const setCurrentUser = (user: UserChat) => {
    setCurrentUserState(user)
  }

  const currentUserId = useMemo(() => {
    return currentUser?.id ? String(currentUser.id) : ''
  }, [currentUser])

  const isReady = Boolean(currentUser?.id) && loadedContextKey === contextKey
  const hasError = errorContextKey === contextKey && error !== null
  const isLoadingUser = Boolean(authToken) && !isReady && !hasError

  const value: ChatContextValue = {
    currentUser,
    currentUserId,
    permissions,
    isLoadingUser,
    hasError,
    error: hasError ? error : null,
    config,
    setCurrentUser
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useOptionalChatContext(): ChatContextValue | null {
  return useContext(ChatContext)
}

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext debe usarse dentro de un ChatProvider con un usuario válido')
  }
  return context
}
