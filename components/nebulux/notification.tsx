"use client"

import React, { useEffect } from 'react'
import { useNotification } from '@/components/nebulux/notification-context'

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

function NotificationItem({
  notification,
  onDismiss,
}: {
  notification: { message: string; emoji: string }
  onDismiss: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div
      className="
        relative
        transform
        transition-all
        duration-300
        ease-out
        animate-in-down
        fade-in-0
        bg-black/70
        backdrop-blur-md
        border
        border-white/10
        rounded-lg
        px-4
        py-3
        shadow-[0_0_30px_-10px_rgba(0,255,128,0.5)]
        max-w-xs
      "
    >
      <div className="flex items-start">
        <span className="text-lg mr-2">{notification.emoji}</span>
        <p className="text-sm text-white">
          {notification.message}
        </p>
      </div>
    </div>
  )
}
