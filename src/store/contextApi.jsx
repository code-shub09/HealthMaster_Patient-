import { createContext ,useState} from "react";

export const Wrapper= createContext();


function DataProvider({children}){
    console.log('data pr:')
    const [isAuthenticated,SetAuthenticated]=useState(false);
    const [Depart,setDepart]=useState({});
    console.log('data pr:',isAuthenticated)
    const [User,setUser]=useState({})
    return(
        <Wrapper.Provider value={{isAuthenticated,SetAuthenticated,User,setUser,Depart,setDepart}} >
            {children}
        </Wrapper.Provider>
    )
}

export default DataProvider