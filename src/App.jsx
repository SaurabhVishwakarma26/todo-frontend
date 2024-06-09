import Login from "./components/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Error404 from "./components/error/Error404";
import ListTodos from "./components/listTodos/ListTodos";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logout from "./components/logout/Logout";
import AuthProvider, { useAuth } from "./components/security/AuthContext";
import "./App.scss";
import Todo from "./components/todo/Todo";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  else return <Navigate to="/" />;
}

function App() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <Todo />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
