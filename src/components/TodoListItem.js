import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose, faPencil} from '@fortawesome/free-solid-svg-icons';
import {actionType, useTodoDispatch} from '../store/ContextDispatch';
import Button from './Button';

const closeBtnStyle = {
    display : "flex"
}

const TodoListItem = ({item, toggleItemCheck}) => {

    const [newItem, setNewItem] = useState({});
    const [isUpdateItem, setIsUpdateItem] = useState(false);
    const todoDispatch = useTodoDispatch();

    useEffect(() => {
        setNewItem(item);
    }, [item])

    const onChange = (e) => {
        const {
            target : {checked, value}
        } = e;

        toggleItemCheck(Number(value), checked);

    }

    const onRemoveClick = (itemId) => {
        const confirm = window.confirm("정말로 삭제하시겠습니까?");

        if (confirm) {
            todoDispatch({
                type : actionType.REMOVE_DATA,
                data : {
                    id : itemId
                }
            })
        }
    }

    const onUpdateClick = () => {
        todoDispatch({
            type : actionType.CHANGE_DATA,
            data : newItem
        });

        toggleUpdate();
    }

    const toggleUpdate = () => {
        setIsUpdateItem(b => !b);
    }

    const updateChange = (e) => {
        const { target : {value} } = e;
        setNewItem({
            ...newItem,
            memo : value
        });
    }

    return (
        <li key={newItem.id} className='d-flex list-group-item align-content-start py-10 justify-content-between'>

            <div className='d-flex w-100'>
                <input
                    type='checkbox'
                    name='checked'
                    value={newItem.id}
                    id={'todo-check' + newItem.id}
                    className='me-5'
                    onChange={onChange}
                    checked={newItem.checked}
                />
                {isUpdateItem ? (
                    <div className='d-flex w-100 flex-md-row flex-column me-5'>
                        <textarea className='form-control' value={newItem.memo} onChange={updateChange}></textarea>

                        <Button className='flex-shrink-0' onClick={onUpdateClick}>수정</Button>
                    </div>
                ) :
                    <label htmlFor={'todo-check' + item.id} className='fs-3 '>{newItem.memo}</label>
                }
            </div>

            <span style={closeBtnStyle}>
                <FontAwesomeIcon icon={faPencil} className='text-hover-danger cursor-pointer me-3' onClick={toggleUpdate}/>
                <FontAwesomeIcon icon={faClose} className='text-hover-danger cursor-pointer'  onClick={() => onRemoveClick(item.id)}/>
            </span>
        </li>
    )
}
export default TodoListItem;
