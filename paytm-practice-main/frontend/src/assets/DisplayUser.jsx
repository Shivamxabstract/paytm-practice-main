import { useState } from "react"
import { useRecoilValueLoadable } from "recoil";
import { usersSelector } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";



function PayUser(props) {
    /* eslint-disable react/prop-types */
    const {user} = props;
    const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-between my-3 items-center">
            <div className="flex flex-row">
            <div style={{backgroundImage: 'url(src/assets/pic.jpg)' }} className="rounded-full ml-4 size-6 bg-cover bg-center "></div>
            <p className=" text-md text-black font-bold ml-4">{user.firstName}</p>
            </div>
            <button onClick={()=>navigate("/sendMoney/" + user._id)} className="text-white bg-gray-800 rounded-md px-3 py-2 text-xs">Send Money</button>
        </div>
    )
}

export default  function DisplayUsers() {
    const loadable =  useRecoilValueLoadable(usersSelector);

    // const [users,setUsers] = useState(["User 1", "User 2"])
    const [searchedUser,setSearchedUser] = useState([""]);

    console.log(loadable.state)
    switch (loadable.state) {
        case 'hasValue':
            const users = loadable.contents.data.users;
          return (
                <div className="flex flex-col py-2">
                    <p className="text-black text-xl font-bold">Users</p>
                    <input type="text" onChange={(e)=> setSearchedUser(e.target.value)} placeholder="Search Users" className="bg-transparent border-2 rounded-md py-2 px-3 my-3 border-slate-300"/>
                    {users.map(user=><PayUser user={user} key={user.id}></PayUser>)}
                </div>
            )
        case 'loading':
          return <div>Loading...</div>;
        case 'hasError':
          throw loadable.contents;
      }

    // // console.log(loadable.contents.data)

    // switch (loadable.state){
    //     case "loading": 
    //         // const users = loadable.contents.data;
    //         // return (
    //         //     <div className="flex flex-col py-2">
    //         //         <p className="text-black text-xl font-bold">Users</p>
    //         //         <input type="text" onChange={(e)=> setSearchedUser(e.target.value)} placeholder="Search Users" className="bg-transparent border-2 rounded-md py-2 px-3 my-3 border-slate-300"/>
    //         //         {users.map(user=><PayUser user={user} key={user.id}></PayUser>)}
    //         //     </div>
    //         // )
    //         // break;
    //        return(<div>loading...</div>)

    //     case "hasValue":
    //         return <div>{loadable.contents}</div>;

    // }

}