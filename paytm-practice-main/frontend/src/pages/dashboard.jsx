import Balance from "../components/Balance";
import DisplayUsers from "../assets/DisplayUser";
import AppBar from "../components/AppBar";
import { useRecoilValue } from "recoil";
import { isAuthorizedSelector } from "../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
    const isAuthorised = useRecoilValue(isAuthorizedSelector);
    const navigate = useNavigate();
    console.log(isAuthorised)
   
    useEffect(()=>{  
        if(!isAuthorised){
            alert("You're Not authorized, Please Sign In")
            navigate("/signIn");
        }
    },[isAuthorised]);


    return (
        isAuthorised?
        <div className="w-full h-screen bg-white p-5">
            <AppBar></AppBar>
            <Balance></Balance>
            <DisplayUsers></DisplayUsers>
        </div>:<></>
    )
}