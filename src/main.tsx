import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Environment check
console.log("ENV loaded:", !!import.meta.env.VITE_SUPABASE_URL);

createRoot(document.getElementById("root")!).render(<App />);
