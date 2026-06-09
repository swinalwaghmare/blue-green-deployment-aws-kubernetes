import { useState, useEffect, useRef } from "react";

function App() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8080/ws/chat");

    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);
    ws.current.onmessage = (event) => {
      setMessage((prev) => [...prev, event.data]);
    };

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      ws.current.send(input);handleKey; 
      setInput("");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily:"sans-serif" }}>
      <h2>PingBoard Chat</h2>
      <p style={{ color: connected ? "green" : "red"}}>
        {connected ? "● Connected" : "○ Disconnected"}
      </p>

      <div style={{
        border: "1px solid #ccc", borderRadius: 8,
        height: 300, overflowY: "auto", padding: 12, marginBottom: 12
      }}>
        {message.map((msg, i) => (
          <div key={i} style={{ marginBottom: 6}}>{msg}</div>
        ))}
      </div>
      
      <div style={{ display: "flex", gap: 8}}>
        <input
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc"}}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          />
        <button
          style={{ 
            padding: "8px 16px", 
            borderRadius: 6, 
            background: "#1D9E75",
            color: '#fff',
            border: "none",
            cursor: "pointer"}}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;