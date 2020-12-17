import React, {useContext, useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../db/auth';
import base from "../db/firebase"
import 'firebase/firestore';
import { Spinner } from "react-spinners-css";

const AdminRoute = ({ component: RouteComponent, ...rest}) => {

    const {currentUser} = useContext(AuthContext);
    const [pending, setPending] = useState(true)
    const [request, setRequest] = useState(null)

    const getUserInfo = async () => {

        const data = await base.firestore().collection("users").doc(currentUser.email);

        //console.log(await (await data.get()).data())
        setRequest(await (await data.get()).data())
        
    } 

    useEffect(() => {
        getUserInfo()
        if(!!request){
            setPending(false)
        }
    }, [request])

    if (pending) {
        return <div className="elipsis-padding-box">
            <Spinner color="grey"/>
        </div>;
    }

    return(
        <Route
            {...rest}
            render={routeProps => 
                !!currentUser & request.role === "admin" ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={{
                        pathname: "/errorPage",
                        state: {error: "300"}
                        }}/>
                )
            }
        />
    );
};

export default AdminRoute;