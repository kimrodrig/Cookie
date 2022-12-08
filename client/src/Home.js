import About from './About';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';

export default function Home({currentUser}){
    console.log("Current User:", currentUser);
    return(
        <div>
            LOGO HERE
            <About />
        </div>
    )
}