import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import BottomInfo from "../components/bottomInfo";
import Heading from "../components/heading";
import Input from "../components/input";
import { SubHeading } from "../components/subheading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { isAuthorizedSelector, tokenState } from "../atoms/authAtom";

export default function SignIn() {

    const [Username, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const navigate  = useNavigate();
    const isAuthorised = useRecoilValue(isAuthorizedSelector);
    const setToken = useSetRecoilState(tokenState);

    async function onSubmit() {
        if(isAuthorised){
            navigate("/dashboard");
        }
        let res = await axios.post("http://localhost:3000/api/v1/user/signin", {
            userName: Username,
            password: Password,
        },{
            validateStatus:(e)=>true,
        });


        if(res.status == 200){
            alert("Successfully Logged In");
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate("/dashboard")
        }
        else{
            alert(res.data.msg);
        }
    }

    return(
        <div className="flex flex-row justify-center items-center w-full h-[100vh]">
            <div className="flex flex-col items-center content-center py-4 px-4 bg-white w-[320px] rounded-lg">
                <Heading  text={"Sign In"}/>
                <SubHeading text={"C'mon in buddy, Let's manage some Cash"}/>
                <Input setValue={setUserName} dummy={"johndoe@example.com"} heading={"Email"}/>
                <Input setValue={setPassword} dummy={"********"} heading={"Password"}/>
                <Button onClick={onSubmit} text={"Sign In"}></Button>
                <BottomInfo info={"Already have an Account?"} buttonText={"SignUp"} path="/signup"></BottomInfo>
            </div>
          
        </div>
    )
}