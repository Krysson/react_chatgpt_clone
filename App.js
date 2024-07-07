import { useState, useEffect } from "react"

const App = () => {
  const [value, setValue] = useState(null)
  const [messages, setMessages] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setCurrentTitle(null)
    setValue("")
    setMessages(null)
  }

  const handleClick = uniqueTitle => {
    setCurrentTitle(uniqueTitle)
    setValue("")
    setMessages(null)
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch("http://localhost:8000/completions", options)
      const data = await response.json()
      console.log(data)
      setMessages(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, messages)
    if (!currentTitle && value && messages) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && messages) {
      setPreviousChats(prevChats => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value
        },
        {
          title: currentTitle,
          role: messages.role,
          content: messages.content
        }
      ])
    }
  }, [messages, currentTitle])
  // this is just a seperator

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  console.log(uniqueTitles)

  // This is just a seperator
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>&#1422; New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={(() => handleClick, uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Krysson</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>KryssonGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <div className="submit" onClick={getMessages}>
              &#10146;
            </div>
            <p className="info">KryssonGPT can make mistakes. Check important info.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
