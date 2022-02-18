import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer';

const Context = React.createContext();
export default Context;
export const Provider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["oauth"]);
    const [oauth, setAuth] = useState(cookies.oauth);
    const [profile, setProfile] = useState(cookies.profile)
    
    console.log(cookies.profile)
    return (
        <Context.Provider
            value={{
                oauth: oauth,
                setAuth: (oauth) => {
                    console.log(profile)
                    console.log(oauth)

                    if (oauth) {
                        const payload = JSON.parse(
                            Buffer.from(oauth.id_token.split(".")[1], "base64").toString(
                                "utf-8"
                            )
                        );
                        oauth.email = payload.email;
                        setCookie("oauth", oauth);

                    } else {
                        removeCookie("oauth")
                        removeCookie("profile");


                    }
                    setAuth(oauth);
                },
                profile: profile,
                setProfile: (profile) => {
                    setCookie("profile", profile)
                    
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}
