import About from './About';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';

export default function Home({setCurrentUser}){
    return(
        <div>
            Home
            <About />
        </div>
    )
}