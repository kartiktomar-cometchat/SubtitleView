import "./styles/App.css";
import { BrowserRouter } from 'react-router-dom';
import Login from "./components/CometChatLogin/CometChatLogin";
import { AppContextProvider } from "./context/AppContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Credentials from "./components/CometChatLogin/CometChatAppCredentials";
import { CometChatHome } from "./components/CometChatHome/CometChatHome";
import CometChatWidget from "./CometChatWidget/CometChatWidget";

interface IAppProps {
  loggedInUser?: CometChat.User,
  theme?: string
}

function App(props: IAppProps) {


  const App = () => {
    return (
      <AppContextProvider>
          <Routes>
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='login' element={<Login />} />
            <Route path='home' element={<CometChatHome theme={props.theme} />} />
            <Route path='credentials' element={<Credentials />} />
            <Route path='widget' element={<CometChatWidget />} />
          </Routes>
      </AppContextProvider>
    );
  };

  return (
    <div>
      <div className='App' >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
