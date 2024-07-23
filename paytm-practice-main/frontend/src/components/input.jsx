export default function Input({heading, dummy, setValue = (e)=>{}}){

    return (
        <div className="flex flex-col justify-start w-full text-black text-sm font-bold mt-4">
            <label htmlFor="inputField">{heading}</label>
            <input onChange={(e)=>{
                setValue(e.target.value);
                }} type="text" placeholder={dummy} className="bg-transparent border-2 rounded-md py-2 px-3 mt-3 border-slate-300" />
        </div>
    )
}