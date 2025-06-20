import { motion } from "framer-motion";
interface Prop{
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>,input:string)=>void;
    title: string;
    placeholder: string;
    btnValue: React.ReactNode|string;
    btnType: "button" | "reset" | "submit" | undefined;
}
const SendForm = ({value,type,onChange,title,placeholder,btnValue,btnType,handleSubmit}:Prop) => {
    return ( 
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>handleSubmit(e,value)} className="rounded-b-[20px] w-full border-t border-t-gray-200 p-3 flex items-center justify-between gap-2 bg-transparent ">
            <input 
            title={title} 
            type={type} 
            className="flex-1 flex w-full h-full px-5 py-4 bg-gray-200 focus:outline-none rounded-full  " 
            placeholder={placeholder} 
            value={value} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e)} 
            />
           <motion.button
            whileTap={{ y: -1, x: 1 }}
            className="text-white bg-blue-700 hover:-translate-y-[1px] hover:translate-x-[1px] transition-all hover:shadow-md hover:bg-[blue] rounded-full px-3 py-2 cursor-pointer"
            type={btnType}
            >
                {btnValue}
            </motion.button>
        </form>
     );
}
 
export default SendForm;