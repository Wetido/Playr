import React, {useState, useEffect} from 'react';
import base from "../db/firebase"
import 'firebase/firestore';
import { Spinner } from "react-spinners-css";


const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true)

    useEffect(() => {
        
        const fetchData = async () => {
            const db = base.firestore();
            const date = await db.collection("users")
            
            date.onSnapshot((data) => {
                setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
        }

        fetchData();
        if(!!users){
            setPending(false)
        }
    }, []);


    if (pending) {
        return <div className="elipsis-padding-box">
            <Spinner color="grey"/>
        </div>;
    }

    return (
        <div>

            <div>Witaj w panelu administratora</div><br></br>
            <div>
                <div>Lista uzytkowników:</div>
                {users.map(user => (
                    <div>
                        {user.id}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;