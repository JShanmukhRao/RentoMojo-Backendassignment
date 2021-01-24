import React, { useContext } from 'react'
import { UserContext } from "../../App";

const Card = props => {
    const contactContext = useContext(UserContext);
    const { user } = contactContext;
    
    return (
        <div className="card blue-grey darken-1" key={props.item._id}>
            <div className="card-content white-text">
                <span className="card-title"><i className="material-icons">person</i>{props.item.name}</span>
                <span><i className="material-icons">email</i>{props.item.email}  </span>
                <div>
                    {props.item.phone && <i className="material-icons">local_phone</i>}  {props.item.phone}
                </div>
            </div>
            <div className="card-action">
                {user._id=== props.item.postedBy ?


                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '15px' }}>
                            <button className='btn btn-light btn-block' onClick={() => props.EditContact(props.item)}>
                                Edit
                                           </button>
                        </div>
                        <div>
                            <button className='btn btn-light btn-block' onClick={() => props.DeleteContact(props.item._id)}>
                                Delete
                                           </button>
                        </div>
                    </div>

                    :
                    <button
                        className='btn btn-light btn-block'
                        style={{ marginRight: '15px' }}
                    >
                        Only Creater can manipulate the contact
                    </button>

                }
            </div>
        </div>
    )
}

export default Card;