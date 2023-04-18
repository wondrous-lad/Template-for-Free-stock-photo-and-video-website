import React from "react";
import {createRoot} from "react-dom/client"
import LoginForm from "./components/LoginForm";

const App = () => {
    return(
        <div>
            <LoginForm />
        </div>
    )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)