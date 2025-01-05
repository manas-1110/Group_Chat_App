import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./Pages/homePage";
import ChatPage from "./Pages/chatPage";

function App() {
    const [count, setCount] = useState(0);
    return (
        <div className="App">
            <Route path="/" component={HomePage} exact />
            <Route path="/chats" component={ChatPage} />
        </div>
    );
}

export default App;
