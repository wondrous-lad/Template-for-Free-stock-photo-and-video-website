import Axios from "axios"
import React, {useState} from 'react'

const LoginForm = () => {
        const report = document.querySelector("#form-message")
        const [userRegistration, setUserRegistration] = useState({
            username: "",
            password:""
        });

        const [records, setRecords] = useState([]);

        const handleInput = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setUserRegistration({...userRegistration, [name] : value});
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            const newRecord = {...userRegistration}
            // , id : new Date().getTime().toString()}
            setRecords([...records, newRecord]);
            setUserRegistration({username:"", password:""});
            const newUserResult = await Axios.post("/login-user", newRecord)
            if(newUserResult.data==userRegistration.username){
                Axios.get("/user-template")
            }else{
            report.innerHTML = newUserResult.data
            const resDispTime = setTimeout(()=> report.innerHTML = "", 3000)
            }
            // console.log(newUser)
        }

    return (
        <>
            <p id="form-message"></p>
            <h5 className='header'>Log in to your Pixapic account</h5>
            <form  onSubmit={handleSubmit} >
                <div>
                    <label htmlFor='username'>User name</label><br/>
                    <input type="text" autoComplete='off'
                    value = {userRegistration.username} 
                    onChange={handleInput}
                    name='username' id='username' minLength={4} maxLength={20} size={40} required autoFocus/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label><br/>
                    <input type="password" autoComplete='off'
                    value = {userRegistration.password} 
                    onChange={handleInput}
                    name='password' id='password' minLength={8} maxLength={20} size={40} required />
                </div>
                <div>
                    <button type = "submit" className='submit'>Login</button>
                </div>
            
            </form>
        </>
    )

}


export default LoginForm