import CreateCustomer from "../CreateCustomer";
import CreateChef from "./CreateChef";

export default function CreateProfile({currentUser, setCurrentUser}) {

    
    if (currentUser.account_type === "customer"){
        return <CreateCustomer/>
    } else {
        return <CreateChef currentUser={currentUser} setCurrentUser={setCurrentUser} />
    }

}
