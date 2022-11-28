export default function Logout({currentUser}){

    console.log(currentUser)
    function handleLogout(e){
        e.preventDefault();
        fetch('/logout', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res=> console.log(res))
    }

    return (
        <div>
            <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    )
}