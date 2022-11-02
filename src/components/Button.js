import React from "react";

const Button = (props) => {

    const {
        id,
        color,
        onClick,
        className,
        children
    } = props;

    const addClassName = () => {
        let cn = "btn";

        switch (color) {
            case 'secondary' :
                cn += " btn-secondary"
                break;
            case 'success' :
                cn += " btn-success"
                break;
            case 'danger' :
                cn += " btn-danger"
                break;
            case 'warning' :
                cn += " btn-warning"
                break;
            case 'info' :
                cn += " btn-info"
                break;
            case 'light' :
                cn += " btn-light"
                break;
            case 'dark' :
                cn += " btn-dark"
                break;
            default :
                cn += " btn-primary"
                break;
        }

        return cn + " " + className;
    }

    return <button
        id={id}
        className={addClassName()}
        onClick={onClick && onClick}
    >{children}</button>
}

export default Button;
