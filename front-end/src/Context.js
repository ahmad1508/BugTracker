import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer';

const Context = React.createContext();
export default Context;
export const Provider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["oauth", "profile"]);
    const [oauth, setAuth] = useState(cookies.oauth);
    const [profile, setProfile] = useState(localStorage.getItem('profile') ?
        JSON.parse(localStorage.getItem('profile')) : null)
    const [projects, setProjects] = useState(localStorage.getItem('projects') ?
        JSON.parse(localStorage.getItem('projects')) : null)
    const [currentProject, setCurrentProject] = useState(null)
    const [currentProjectParticipants,setCurrentParticipants]=useState()

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
                        localStorage.removeItem('profile')
                        localStorage.removeItem('projects')
                    }
                    setAuth(oauth);

                },

                profile: profile,
                setProfile: (profile) => {
                    localStorage.setItem('profile', JSON.stringify(profile))
                    setProfile(profile)
                },

                projects: projects,
                setProjects: (projects) => {
                    localStorage.setItem('projects', JSON.stringify(projects))
                    setProjects(projects)
                },
                currentProject: currentProject,
                setCurrentProject: (id) => {
                    const project = projects.find((project) => project.projectId === id)
                    setCurrentProject(project)
                },
                currentProjectParticipants:currentProjectParticipants,
                setCurrentParticipants:setCurrentParticipants
            }}
        >
            {children}
        </Context.Provider >
    )
}
