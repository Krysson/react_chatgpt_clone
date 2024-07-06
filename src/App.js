const App = () => {
  return (
    <div className="app">
      <section className="side-bar">
        <button>&#1422; New Chat</button>
        <ul className="history">
          <li>blech</li>
        </ul>
        <nav>
          <p>Made by Krysson</p>
        </nav>
      </section>
      <section className="main">
        <h1>KryssonGPT</h1>
        <ul className="feed"></ul>
        <div className="bottom-section">
          <div className="input-container">
            <input type="text" />
            <div className="submit">&#10146;</div>
            <p className="info">KryssonGPT can make mistakes. Check important info.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
