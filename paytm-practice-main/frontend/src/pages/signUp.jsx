import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import BottomInfo from "../components/bottomInfo";
import Heading from "../components/heading";
import Input from "../components/input";
import { SubHeading } from "../components/subheading";
import { isAuthorizedSelector } from "../atoms/authAtom";
import { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUp() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Username, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const navigate  = useNavigate();
    const isAuthorised = useRecoilValue(isAuthorizedSelector);

    useEffect(()=>{
        if(isAuthorised){
            navigate("/dashboard")
        }
    },[isAuthorised])
    async function onSubmit() {

        let res = await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstName: FirstName,
            lastName: LastName,
            userName: Username,
            password: Password,
        },{
            validateStatus:(e)=>true,
        });

        if(res.status == 200){
            alert("Successfully Logged In");
            localStorage.setItem('token', res.data.token);
            navigate("/dashboard")
        }
        else{
            alert(res.data.msg);
        }
    }

    return(
        <div className="flex flex-row justify-center items-center w-full h-screen">
            <div className="flex flex-col items-center content-center p-3 bg-white w-[320px] h-[570px] rounded-lg">
                <Heading  text={"SignUp"}/>
                <SubHeading text={"Enter Your Information to create an account"}/>
                <Input setValue = {(newName)=>setFirstName(newName)} dummy={"John"} heading={"First Name"}/>
                <Input setValue = {(newName)=>setLastName(newName)} dummy={"Doe"} heading={"Last Name"}/>
                <Input setValue = {(newUserName)=>setUserName(newUserName)} dummy={"johndoe@example.com"} heading={"Email"}/>
                <Input setValue = {(password)=>setPassword(password)} dummy={"********"} heading={"Password"}/>
                <Button onClick={onSubmit} text={"Sign Up"}></Button>
                <BottomInfo info={"Already have an Account?"} buttonText={"SignIn"} path="/signIn"></BottomInfo>
            </div>
          
        </div>
    )
}
