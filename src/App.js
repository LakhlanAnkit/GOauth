import { useState, useEffect } from 'react';
import './App.css';
import { InvalidTokenError, jwtDecode } from 'jwt-decode';


const google = window.google;

function App() {
  const [user,setUser] = useState({})

  let handleCallbackResponse = (response) => {
    console.log(response.credential)
    let userObject = jwtDecode(response.credential)

    setUser(userObject);

    //hiding signin button after user has signed in
    document.getElementById('signIn').hidden = true;

  }

  useEffect(()=> {
    google.accounts.id.initialize({

      // client id is specific
      client_id:"534611758752-sov3cklbbues3l5jdogn5m06c6q8mdbg.apps.googleusercontent.com",
      callback:handleCallbackResponse
    })

    // button properties
    google.accounts.id.renderButton(document.getElementById('signIn'),{
      theme:'outline',
      size:'large'
    });

    // to show prompt when this page is opened
    google.accounts.id.prompt();

  },[])

  let handleLogout = () => {
    setUser({})
    // hide sign in button when user is already signed in
    document.getElementById('signIn').hidden = false;

  }

  return (
    <div className="App">
      
      {/* Buttons are difend here for signin and signout*/}
    <div id="signIn"></div>

    {/* logout button */}
    {
      Object.keys(user).length !== 0 &&
      <button onClick = {handleLogout}></button>
    }

    {/* / if user exists then display these properties */}
      {
      user && <div>
        <h1>{user.name}</h1>
        <img src={user.picture}/>
        </div>
    }
    </div>
  );
}

export default App;
