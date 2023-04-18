import React from "react";
import {createRoot} from "react-dom/client"
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
    return(
        <div>
            <RegistrationForm />
        </div>
    )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)