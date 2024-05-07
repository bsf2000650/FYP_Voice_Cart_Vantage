import React from 'react';
import Cors from '../../components/images/cors.PNG';


const Note = () => {
  return (
    <div>
        1. The current react web app will work using cors extension.<br></br>
        2. The product will show when the user login's<br></br>
            Use Gmail : asadmehsud100@gmail.com<br></br>
            Password : password<br></br>
        3. Else create your new account and access the app product and other details using that new account.
        4. Because the react app is deployed on vercel which is free host so to access both frontend and backend, cors extension is used.
        <img src={Cors} alt='Cors' />
    </div>
  )
}

export default Note
