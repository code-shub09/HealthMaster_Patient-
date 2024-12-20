import { useContext } from "react";
import { Wrapper } from "../store/contextApi";

import axios from "axios";


export function NavLogic(){
    const { setUser, User, isAuthenticated, SetAuthenticated } =
    useContext(Wrapper);
  
     async function GetAutheticated(){
        try {
            const res=await axios.get('https://healthmaster-4r73.onrender.com/api/v1/user/patient/auth',{withCredentials:true,headers:{"Content-Type":"application/json"}});
             console.log('okkkkk')
            if (res.data.success) {
                SetAuthenticated(true);
                console.log('okkkkk')
                
            }
            
         
        } catch (error) {
        //  console.log(error);
         SetAuthenticated(false)
 
         
        }

     }

    return {
        GetAutheticated

    }
}