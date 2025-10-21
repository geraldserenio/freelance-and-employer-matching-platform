import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { PRIVATE_ROUTES } from "./routes/PrivateRoute";
import { PUBLIC_ROUTES } from "./routes/PublicRoute";
import { SideBar } from "./components/navigation/sidebar";
import LiberLogin from "./components/pages/liber-login/LiberLogin";
import ChatWidget from "./components/shared/chat-widget/ChatWidget";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="App">
      <Router>
        <SideBar>
          <Routes>
            {PUBLIC_ROUTES.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.element />}
                />
              );
            })}

            {PRIVATE_ROUTES.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={isAuthenticated ? <route.element /> : <LiberLogin />}
                />
              );
            })}
          </Routes>
        </SideBar>
      </Router>
      {!userData && <ChatWidget />}
    </div>
  );
}

export default App;
