import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./Pages/homePage";
import ChatPage from "./Pages/chatPage";
import ChatProvider from "./context/chatProvider";

function App() {
    return (
        <ChatProvider>
            <div className="App">
                <Route path="/" component={HomePage} exact />
                <Route path="/chats" component={ChatPage} />
            </div>
        </ChatProvider>
    );
}

export default App;
