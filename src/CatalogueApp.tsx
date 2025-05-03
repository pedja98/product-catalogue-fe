// In `catalogue/CatalogueApp.tsx`
import React, { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { setAuthData } from './features/auth.slice'
import { Language, UserType } from './types/auth'
import { setNotification } from './features/notifications.slice'
import { NotificationType } from './types/notification'

interface CatalogueAppProps {
  language: Language
  username?: string
  type?: UserType
}

const CatalogueApp: React.FC<CatalogueAppProps> = ({ language, username, type }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      setNotification({
        type: NotificationType.Info,
        text: 'Hello world',
      }),
    )
    dispatch(
      setAuthData({
        username: username,
        language: language,
        type: type,
      }),
    )
  }, [])
  return (
    <div>
      <h1>Catalogue App</h1>
    </div>
  )
}

export default CatalogueApp
