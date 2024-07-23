import { useRecoilValueLoadable } from "recoil"
import {  userInfoSelector } from "../atoms/userAtom"

export default function AppBar() {
    const loadable = useRecoilValueLoadable(userInfoSelector);

    switch(loadable.state){
        case "hasValue":
            const user = loadable.contents;   
            console.log(user);
            return (
                    
                    <div className="flex flex-row justify-between bg-transparent my-3">
                        <p className="text-2xl text-black font-bold">Payments App</p>
                        <div className="flex items-center">
                            
                        <p className=" text-md text-black font-bold">Hello, {user.firstName}</p>
                        <div style={{backgroundImage: 'url(src/assets/pic.jpg)' }} className="rounded-full ml-4 size-8 bg-cover bg-center"></div>
                        </div>
            
                    </div>
                )
        case "loading": <div></div>
    }
}