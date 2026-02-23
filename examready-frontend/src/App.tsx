import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage   from "./pages/LandingPage";
import AuthPage      from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import QuizPage      from "./pages/QuizPage";

function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState(null);

  const navigate = (p) => {
    if ((p === "dashboard" || p === "quiz") && !user) {
      setPage("auth");
      return;
    }
    setPage(p);
  };

  return (
    <>
      {page !== "auth" && (
        <Navbar setPage={navigate} user={user} setUser={setUser} />
      )}

      {page === "landing"   && <LandingPage   setPage={navigate} />}
      {page === "auth"      && <AuthPage       setPage={navigate} setUser={setUser} />}
      {page === "dashboard" && <DashboardPage  setPage={navigate} user={user} setTopic={setTopic} />}
      {page === "quiz"      && <QuizPage       setPage={navigate} topic={topic} user={user} />}
    </>
  );
}
export default App;