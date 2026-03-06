import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import LandingPage   from "./pages/LandingPage.jsx";
import AuthPage      from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import QuizPage      from "./pages/QuizPage.jsx";

type Page = "landing" | "auth" | "dashboard" | "quiz";

function App() {
  const [page, setPage] = useState<Page>("landing");
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState(null);

  const navigate = (p: Page) => {
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