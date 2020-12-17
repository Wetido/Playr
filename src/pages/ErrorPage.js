import React, {useState, useEffect} from 'react';


const ErrorPage = (props) => {

    if(props.location.state.error === "300"){
        return(
            <div>Nie masz uprawnienia administratora</div>
        )

    }

}

export default ErrorPage;