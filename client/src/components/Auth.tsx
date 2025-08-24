import axios from "axios";
import { useState, type ChangeEvent, type ChangeEventHandler} from "react";
import { Link, useNavigate } from "react-router-dom";
import { backend_url } from "../config";
export const Auth= ({type} : {type:"signup" | "signin"})=>{
    const Navigate= useNavigate();
    const [userName,setusername]= useState("");
    const [email,setemail]= useState("");
    const [password,setpassword]= useState("");

   async function tryLogin(){
    try{
        if(userName==null || password==null|| email==null){
            alert("no field can be empty");
            return;
        }
        const response = await axios.post(
            `${backend_url}api/v1/user/${type=="signup"? "signup":"signin"}`,
            {
                username: userName,
                email: email,
                password: password
            }
        );
        const jwt = response.data;
        localStorage.setItem("token",jwt);
        Navigate("/blogs");

    }catch(e){
         alert("Request failed")
    }

   }

     
    return <>
    <div className="h-screen flex justify-center flex-col ">
    
            <div className="text-3xl font-extrabold">
                Create an account
            </div>
           
            <div className="text-slate-400">
                {type=="signup"? "Already have an account?": "Dont have a account"}
            {type=="signup"?<Link className="pl-2 underline" to={"/signin"}>Login</Link>: <Link className="pl-2 underline" to={"/signup"}>signup</Link>}

            </div>

             <LabelledInput label="Name" placeholder="eg. amit@gmail.com..." onChange={(e)=>{
                setusername(e.target.value)
            }}></LabelledInput> 
            <LabelledInput label="Email" placeholder="eg. handsomerocky" onChange={(e)=>{
                setemail(e.target.value)
            }}></LabelledInput>
             <LabelledInput label="Password" typee={"password"} placeholder="eg. alsdfhoq" onChange={(e)=>{
                setpassword(e.target.value) 
            }}></LabelledInput>
            <div>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={tryLogin}>Submit</button>
        </div>


    </div>
    </>
}

interface LabelledInputType{
    label: string;
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    typee?: string;
}
function LabelledInput({label, placeholder, onChange,typee}: LabelledInputType){
    return <div>
        <div className="mb-5">
    <label className="block mb-2 text-extrabold text-slate-800 text-xl">{label}</label>
    <input type={typee||"text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} onChange={onChange}required />
  </div>
    
    </div>
}