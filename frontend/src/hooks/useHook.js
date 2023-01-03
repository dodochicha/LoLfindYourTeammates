import { createContext, useContext, useState, useEffect } from "react";


const HookContext = createContext({
    username: "",
    password: "",
    rememberMe: false,
    setUsername: () => {},
    setPassword: () => {},
    setRememberMe: () => {},
});

const HookProvider = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    return (
        <HookContext.Provider
            value={{
                username,
                password,
                rememberMe,
                setUsername,
                setPassword,
                setRememberMe,
            }}
            {...props}
        />
    );
};

const useHook = () => useContext(HookContext);
export { HookProvider, useHook };