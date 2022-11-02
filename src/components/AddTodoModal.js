import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from './Button';
import {useTodoDispatch, useTodoState} from '../store/ContextDispatch';
import {useState} from 'react';
import dayjs from 'dayjs';

const backdropStyle = {
    zIndex: 999,
    backgroundColor: "#222222a2",
    position: "fixed",
    width: "100%",
    height: "100vh",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};

const modalDivStyle = {
    height: "100%",
};

const mainModalStyle = {
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    height : '100%',
    width: "100%",

}

const formStyle = {
    width : "100%",
    maxWidth : "500px",
    backgroundColor: "#f7f7f7",
    padding : "30px",
    borderRadius : "5px"
}


const AddTodoModal = ({close}) => {

    const todoState = useTodoState();
    const todoDispatch = useTodoDispatch();

    const [text , setText] = useState("");
    const [date, setDate] = useState(todoState.baseDate.toDate());


    const onTextareaChange = (e) => {
        const {
            target : {value}
        } = e;

        setText(value);
    }

    const onDatePickerChange = (date) => {
        setDate(date);
    }

    const onAddClick = (e) => {
        e.preventDefault();

        const newItem = {
            date : dayjs(date),
            memo : text,
            checked : false
        }

        todoDispatch({
            type : "ADD_DATA",
            data : newItem
        });

        close();
    }

    return (
        <div style={backdropStyle}>
            <div style={modalDivStyle}>
                <div style={mainModalStyle}>
                    <form style={formStyle}>
                        <div className='mt-5'>
                            <label className='form-label'>투두내용</label>
                            <textarea
                                placeholder="todo 내용을 입력해주세요"
                                name="text"
                                className="form-control"
                                onChange={onTextareaChange}
                                value={text}
                            >

                            </textarea>
                        </div>

                        <div className='mt-5'>
                            <label className='form-label'>날짜선택</label>
                            <DatePicker
                                selected={date}
                                className='form-control'
                                onChange={onDatePickerChange}
                            ></DatePicker>
                        </div>
                        <div className='mt-15 d-flex justify-content-between'>
                            <Button color='info' className='me-3' onClick={onAddClick}>추가</Button>
                            <Button color='danger' onClick={close}>닫기</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddTodoModal;
