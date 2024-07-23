import { useParams } from "react-router-dom";
import Input from "../components/input";

import { useRecoilValueLoadable } from "recoil";
import { userQuery } from "../atoms/userAtom";
import axios from "axios";
import { useState } from "react";

export default function sendMoney(){
    const {id} = useParams();
    const [amount,setAmount] = useState(0);
    const loadable = useRecoilValueLoadable(userQuery(id));
    async function onClick() {
        await axios.post("http://localhost:3000/api/v1/account/transfer",{_id: id, amount:amount},{headers: {
            'Authorization': 'Bearer '+ localStorage.getItem("token"),
            'Content-Type': 'application/json',
            
          },validateStatus:(e)=>true,});

    }
    switch (loadable.state){
        case "hasValue": 
            const user = loadable.contents;
            return (
                <div className="flex items-center justify-center w-full h-screen bg-stone-200">
                <div className="bg-white rounded-lg p-5 flex flex-col">
                    <p className="text-black text-lg font-bold self-center mb-6">Send Money</p>
                    <div>
                    <div className="flex flex-row my-2">
                        <div style={{backgroundImage: 'url(src/assets/pic.jpg)' }} className="rounded-full size-6 bg-cover bg-center "></div>
                        <p className=" text-md text-black font-bold ml-4">{user.firstName}</p>
                    </div>
                        
                    </div>
                    <Input setValue={setAmount} dummy={"Enter Amount"} heading={"Amount (in Rs)"}></Input>
                    <button onClick={onclick} className="text-white bg-green-500 rounded-md px-3 py-2 mt-3 text-xs">Send Money</button>
                </div>
                </div>
            )
            break;
        default: <div>loading...</div>
    }
}