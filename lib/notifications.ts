import { useNotification } from "@/components/nebulux/notification-context"

// Predefined playful messages
const PLAYFUL_MESSAGES = [
  {
    message: "Locked in. You'll be the first to know—no respawn needed.",
    emoji: "🎮"
  },
  {
    message: "Notifications enabled. GG, you're officially OP now.",
    emoji: "⚡"
  },
  {
    message: "We'll ping you faster than a noob rage-quitting.",
    emoji: "🔥"
  },
  {
    message: "Boom! Achievement unlocked: 'Staying updated'.",
    emoji: "🏆"
  },
  {
    message: "You're now in the loop. No FOMO for you!",
    emoji: "😎"
  },
  {
    message: "Subscribed! You're about to get legendary status.",
    emoji: "⭐"
  }
]

export function usePlayfulNotification() {
  const { addNotification } = useNotification()
  
  const showPlayfulNotification = () => {
    // Get a random message from our predefined list
    const randomMessage = PLAYFUL_MESSAGES[Math.floor(Math.random() * PLAYFUL_MESSAGES.length)]
    
    addNotification({
      message: randomMessage.message,
      emoji: randomMessage.emoji,
      type: 'success'
    })
  }
  
  return { showPlayfulNotification }
}