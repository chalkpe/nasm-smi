import { useEffect, useState } from 'react'
// @ts-ignore
import io from 'socket.io-client'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [socket] = useState(() => io('wss://smi.webcast.go.kr/10'))

  useEffect(() => {
    socket.on('receive message', (data: any) => {
      setMessages((prev) => [...prev, data])
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    })

    return () => {
      socket.off('receive message')
    }
  }, [socket])

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  )
}

export default App
