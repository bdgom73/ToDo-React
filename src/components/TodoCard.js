import React from "react";

const TodoCard = ({children}) => {
    return (
        <div className="card mw-650px rounded mt-30 w-100">
            {children}
        </div>
    )
}

export default TodoCard;
