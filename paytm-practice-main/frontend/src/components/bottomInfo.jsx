import { Link } from "react-router-dom";

export default function BottomInfo({info, buttonText, path}){

    return <div className="text-center text-sm font-semibold text-black">
        {info+" "}
        <Link to={path} className="underline">{buttonText}</Link>
    </div>
}