import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import UserProfile from "./pages/UserProfile";
import CreateEditEvent from "./pages/CreateEditEvent";
import { UserProvider } from "./context/UserProvider";

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/create-event" element={<CreateEditEvent />} />
              <Route path="/edit-event/:id" element={<CreateEditEvent />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
