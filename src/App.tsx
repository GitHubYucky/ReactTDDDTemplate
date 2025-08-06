// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import { CounterContainer } from "./features/counter/components/CounterContainer";
import { TodoContainer } from "./features/todo/components/TodoContainer";

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <nav>
          <ul>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/counter">Counter</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/todo" element={<TodoContainer />} />
          <Route path="/counter" element={<CounterContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
