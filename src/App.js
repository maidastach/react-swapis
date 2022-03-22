import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Films from "./components/Films";
import Film from "./components/Film";
import Header from "./components/Header";

export default function App() {
  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route exact path="/" element={ <Films /> } />
          <Route path="films/:id" element={ <Film /> } />
        </Routes>
      </Router>
    </>
  );
}
