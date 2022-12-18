import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { User } from "../types";

interface UserLoginProps {
    setCurrentUser: (user: User | null) => void;
}
const UserLogin = (props: UserLoginProps): JSX.Element => {
    const {setCurrentUser} = props;
 
    const { error, data: users } = useFetch<User[]>('/api/v1/users');

    return (
        <div>
            <h2>Click your name to view your Yumi orders!</h2>
            {(users || []).map(user => {
                return <button key={user.id} onClick={() => setCurrentUser(user)}>{user.name}</button>
            })}
            {(!users || !users.length) && <p>No users found</p>}
            <button onClick={() => setCurrentUser(null)}>Clear User</button>
        </div>
    )
}
export default UserLogin;