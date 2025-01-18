import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./Pages/homePage";
import ChatPage from "./Pages/chatPage";
import ChatProvider from "./context/chatProvider";

function App() {
    return (
        <ChatProvider>
            <div className="App">
                <Route
                    path="https://group-chat-app-vnh5.vercel.app/"
                    component={HomePage}
                    exact
                />
                <Route
                    path="https://group-chat-app-vnh5.vercel.app/chats"
                    component={ChatPage}
                />
            </div>
        </ChatProvider>
    );
}

export default App;
