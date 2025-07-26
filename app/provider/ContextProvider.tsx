"use client";
import { getUserDetails } from "@/data/allQueryRequest";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react"
import Loader from "../components/Loading";
import { UserData } from "@/types/allTypes";
import Error from "next/error";

type AppContextType = {
    user: UserData | null;
    authenticated?: boolean;
};


const Context = createContext<AppContextType>({
    user: null,
    authenticated: false

});


export const useAppContext = () => useContext(Context);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["me"],
        queryFn: getUserDetails,
    })

    return (
        <Context.Provider value={{ user: data?.data }}>
            {isLoading && <Loader />}
            {isError && <Error statusCode={data?.data.status} title="error while fetching user data" />}
            {children}
        </Context.Provider>
    )
}



export default ContextProvider
