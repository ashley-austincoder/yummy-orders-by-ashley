import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { User } from "../types";

interface UserLoginProps {
    setCurrentUser: (user: User | null) => void;
    setErrorMessage: (message: string | null) => void;
}
const ChooseUser = (props: UserLoginProps): JSX.Element => {
    const { setCurrentUser, setErrorMessage } = props;
    const { loading, error, data: users } = useFetch<User[]>('/api/v1/users');
    useEffect(() => {
        setErrorMessage(error ? 'We could not retrieve users.' : null);
    }, [error])
    return (
        <div className="container">
            <h2>Click name to view Yumi orders</h2>
            {(users || []).map(user => {
                return <button key={user.id} onClick={() => setCurrentUser(user)}>{user.name}</button>
            })}
            {!loading && !error && (!users || !users.length) && <p>No users found</p>}
            {!loading && !error && <button onClick={() => setCurrentUser(null)}>Clear User</button>}
        </div>
    )
}
export default ChooseUser;