
import { useRecoilValueLoadable } from "recoil";
import { balanceDetails } from "../atoms/userAtom";

export default function Balance() {
    const loadable = useRecoilValueLoadable(balanceDetails);
    switch (loadable.state){
        case "hasValue":
            const balance = loadable.contents.data.balance;    
           
            return (
                    <div className="text-black font-bold mb-2 py-2">
                        {"Your Balance  $" + balance}
                    </div>
                )  
        default: <div>loading...</div>
    }
     
}