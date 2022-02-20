import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer';

const Context = React.createContext();
export default Context;
export const Provider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["oauth", "profile"]);
    const [oauth, setAuth] = useState(cookies.oauth);
    const [profile, setProfile] = useState(cookies.profile)
    const [projects, setProjects] = useState([])
    const [currentProject, setCurrentProject] = useState(null)

    return (
        <Context.Provider
            value={{
                oauth: oauth,
                setAuth: (oauth) => {

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
                        setProfile(null)
                    }
                    setAuth(oauth);

                },
                profile: profile,
                setProfile: (profile) => {
                    if (profile) {
                        setCookie("profile", profile)
                        setProfile(profile)
                    } else {
                        removeCookie("profile");
                    }
                },
                projects: projects,
                setProjects: setProjects,
                currentProject: currentProject,
                setCurrentProject: (id) => {
                    const project = projects.find((project) => project.projectId === id)
                    setCurrentProject(project)
                }
            }}
        >
            {children}
        </Context.Provider >
    )
}
