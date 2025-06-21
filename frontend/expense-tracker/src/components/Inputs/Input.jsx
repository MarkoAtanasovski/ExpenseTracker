import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Input = ({value, onChange, placeholder, label, type}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () =>{
        setShowPassword(!showPassword)
    }
  return (
    <div className="mb-4">
        <label className="text-sm text-slate-800 mb-1 block">{label}</label>

        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md shadow-sm border border-gray-300">
            <input 
            type ={type =='password' ? showPassword ? 'text':'password': type}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-sm"
            value={value}
            onChange={(e) => onChange(e)}
            />
            {type === "password" && (
                <> {
                    showPassword ? (
                        <FaRegEye
                        size = {22}
                        className="text-primary cursor-pointer"
                        onClick={()=>toggleShowPassword()}
                        />
                    ) :(
                        <FaRegEyeSlash
                        size ={22}
                        className="text-slate-400 cursor-pointer"
                        onClick={() => toggleShowPassword()}
                        />

                    )
                }
                </>
            )}
        </div>
    </div>
  )
}

export default Input