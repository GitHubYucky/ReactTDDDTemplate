// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import { CounterContainer } from "./features/counter/components/CounterContainer";
import { TodoContainer } from "./features/todo/components/TodoContainer";
import { EchoContainer } from "./features/echo/components/EchoContainer";

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <nav>
          <ul>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/counter">Counter</Link></li>
            <li><Link to="/echo">Echo</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<div>ホーム画面です</div>} />
          <Route path="/todo" element={<TodoContainer />} />
          <Route path="/counter" element={<CounterContainer />} />
          <Route path="/echo" element={<EchoContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
