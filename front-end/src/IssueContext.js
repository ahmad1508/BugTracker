import React, { useState} from 'react'
const IssueContext = React.createContext();
export default IssueContext;
export const Provider = ({ children }) => {
    const [groups, setGroups] = useState([])
    const [issues, setIssues] = useState([])
    const [open, setOpen] = useState(false);

    return (
        <IssueContext.Provider
            value={{
                groups: groups,
                issues: issues,
                setGroups:setGroups,
                setIssues:setIssues,
                open:open,
                setOpen:setOpen
            }}
        >
            {children}
        </IssueContext.Provider >
    )
}