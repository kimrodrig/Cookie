import {useState, useEffect} from 'react'
import Rating from 'react-rating'

export default function ProfileContentCustomer({currentUser}){

const [customer, setCustomer] = useState({})

    useEffect(() => {
        fetch(`/customers/${currentUser.customer_id}`)
        .then(res=>res.json()).then(customer => setCustomer(customer))
    },[])

    return (
        <div>
             <div>
                <div>
                    <div>
                        {customer.name}
                    </div>
                    <Rating 
                        initialRating={currentUser.avg_rating}
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        readonly="true"
                    />
                    <div> {customer.avg_rating ? (customer.avg_rating, " stars") : "No reviews yet."}
                    </div>
                    <p>{customer.bio}</p>
                    <p>Location: {customer.location}</p>
                    <p>{customer.reviews?.size ? ("Reviews: ", customer.reviews) : "This is where the reviews go. No reviews -- delete later"}</p>
                </div>
            </div>
        </div>
    )
}