import { FunctionComponent, useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseAuthConfig = {
    signInFlow: "popup",
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
        }
    ],
    signInSuccessUrl: "/" //where to take user after login
}

const FirebaseAuth: FunctionComponent = () => {

    const [renderAuth, setRenderAuth] = useState(false)   //Nextjs may try to render first on server which doesn't play well with this component from firebase so we do this little trick. (firebase only want to run in browswer)

    useEffect(() => {  //useEffect will only run in the browswer (after initial render). (preventing the render of component on server side)
        setRenderAuth(true)
    }, [])

    return (
        <div className="mt-16">
            { true ?
                <StyledFirebaseAuth
                    uiConfig={firebaseAuthConfig}
                    firebaseAuth={firebase.auth()}
                />
                :
                <div style={{ color: "white" }}><h1>hello</h1></div>
            }
        </div>
    )
}

export default FirebaseAuth