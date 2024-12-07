import { useCallback, useEffect, useState } from 'react'
// @ts-ignore
import io from 'socket.io-client'

// const data = `재적의원 3 분의 2에 미치지
// 못했습니다.

// 따라서 이 안건에 대한 투표는...
// 성립되지 않았음을 선포합니다.

// 대통령 윤석열 탄핵소추안에 대한
// 투표가 성립되지 않았습니다.

// 전 국민이 오늘 국회의 결정을 지켜보고 있습니다.
// 세계 각국이 주시하고 있습니다.
// 이토록 중대한 국가적 사안에 대해 투표 조차 이루어지지 않은 것은 매우 유감입니다.

// 민주주의는 내용도 중요하지만 절차도 몹시 중요합니다.

// 이 사안에 대한 투표 불성립은 국가의 중대사를 놓고 가부를 판단하는 민주적 절차조차 판단하지 못한 것입니다.

// 국회를 대표해 국민께 죄송합니다.
// 산회를 선포합니다.`.split('\n')

function App() {
  const [connected, setConnected] = useState<boolean | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [socket] = useState(() => io('wss://smi.webcast.go.kr/10'))

  const onMessage = useCallback((message: string) => {
    setMessages((prev) => prev[prev.length - 1] === message ? prev : [...prev, message])
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
  }, [])

  useEffect(() => {
    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('receive message', onMessage)
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('receive message')
    }
  }, [socket])

  // useEffect(() => {
  //   data.forEach((message, index) => {
  //     setTimeout(() => onMessage(message), index * 1000)
  //   })
  // }, [onMessage])

  if (!messages.length) {
    return <div>{connected === null ? '연결 중...' : connected === true ? '연결됨' : '연결 끊김'}</div>
  }

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  )
}

export default App
