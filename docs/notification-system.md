# Notification System Documentation

## Overview
This document explains how to use the playful notification system implemented in the Nebulux project.

## Components

### 1. Notification Context (`notification-context.tsx`)
This file provides the core functionality for managing notifications:
- `NotificationProvider`: Wraps the application to provide notification context
- `useNotification`: Hook to access notification functions

### 2. Notification Component (`notification.tsx`)
This file contains the UI components for displaying notifications:
- `NotificationContainer`: Container that positions notifications in the bottom-right corner
- `NotificationItem`: Individual notification with animation and auto-dismiss

### 3. Notification Utilities (`notifications.ts`)
This file provides a convenient way to show predefined playful notifications:
- `usePlayfulNotification`: Hook that returns a function to show random playful messages

## Usage

### Basic Usage
1. The `NotificationProvider` is already added to the root layout
2. The `NotificationContainer` is already included in the root layout
3. To show a notification, simply use the `usePlayfulNotification` hook:

```tsx
import { usePlayfulNotification } from '@/lib/notifications'

function MyComponent() {
  const { showPlayfulNotification } = usePlayfulNotification()
  
  return (
    <button onClick={showPlayfulNotification}>
      Show Notification
    </button>
  )
}
```

### Custom Notifications
To show custom notifications, use the `useNotification` hook directly:

```tsx
import { useNotification } from '@/components/nebulux/notification-context'

function MyComponent() {
  const { addNotification } = useNotification()
  
  const showCustomNotification = () => {
    addNotification({
      message: "Custom message here",
      emoji: "🎉",
      type: 'success'
    })
  }
  
  return (
    <button onClick={showCustomNotification}>
      Show Custom Notification
    </button>
  )
}
```

## Features
- Playful, gaming-inspired messages
- Smooth fade-in and slide-up animations
- Auto-dismiss after 3 seconds
- Stacking support for multiple notifications
- Bottom-right positioning
- Responsive design
- Emoji support

## Customization
To add more predefined messages, edit the `PLAYFUL_MESSAGES` array in `lib/notifications.ts`.

## Styling
The notification styles can be customized by modifying the `NotificationItem` component in `components/nebulux/notification.tsx`. The animations are defined in `globals.css`.