import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from "react-dom/client"
import App from "./App.jsx";
import "./index.css";
import { TransactionProvider } from "./Context/Transactioncontext.jsx";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

