import React, {useCallback} from 'react';
import {useTodoDispatch, useTodoState} from '../store/ContextDispatch';
import dayjs from 'dayjs';


const TodoCardHeader = () => {

    const todoState = useTodoState();
    const todoDispatch = useTodoDispatch();

    const onBaseDateChange = (date) => {
        todoDispatch({
            type : "CHANGE_BASE_DATE",
            baseDate : date
        });
    }

    const todayTodoItems = useCallback(() => {
        return todoState
            .store
            .filter(item => item.date.format("YYMMDD") === todoState.baseDate.format("YYMMDD"))
    }, [todoState.store, todoState.baseDate])


    return (
        <div className="card-header flex-column align-items-center pb-0 position-relative">

            {
                todoState.baseDate.format("YYMMDD") !== dayjs(Date.now()).format("YYMMDD") &&
                <span onClick={() => onBaseDateChange(dayjs(Date.now()))}
                      className='btn btn-info rounded-circle position-absolute w-60px h-60px d-flex align-items-center justify-content-center' style={{top : "-15px", right : "-15px", whiteSpace:"nowrap"}}>
                    오늘
                </span>
            }

            <div className="card-title fs-1 fw-bold mb-15">
                {todoState.baseDate.format("YYYY년 MM월")}
            </div>

            <div className="d-flex justify-content-between align-items-end w-100">
                {
                    todoState.dates.map((date, index, array) => {
                        const condA = () => index > 0 &&
                            !(array[index - 1].format("MM") === date.format("MM")) &&
                            !(todoState.baseDate.format("MM") === date.format("MM"));
                        const condB = () => index < todoState.dates.length - 1 &&
                            !(array[index + 1].format("MM") === date.format("MM")) &&
                            !(todoState.baseDate.format("MM") === date.format("MM"));

                        return (
                            <div key={'main-day-' + index} onClick={() => onBaseDateChange(date)}
                                 className="link-primary cursor-pointer d-flex flex-column align-items-center ">
                                {(condA() || condB()) &&
                                    <span className="mb-2 text-gray-800 fw-bold">
                                        {date.format("MM월")}
                                    </span>}
                                <span>
                                    {date.format("ddd")}
                                </span>
                                <span className={"py-3 " + (todoState.baseDate.isSame(date) && "text-decoration-underline fw-bold") }>
                                    {date.format("DD일")}
                                </span>
                            </div>
                        );
                    })
                }
            </div>

            <div className='mt-10 d-flex flex-colum w-100 justify-content-end pt-15'>
                <div className='w-100 text-start'>
                    <div>
                        <span className='me-1'>전체 할 일</span>
                        <span className='text-decoration-underline me-1 text-info fw-bold'>
                            {todoState.store.filter(s => !s.checked).length}개
                        </span>
                        <span>남음</span>
                    </div>
                </div>
                <div className='w-100 text-end'>
                    <div>오늘 할 일 ({todayTodoItems().filter(s => !s.checked).length} / {todayTodoItems().length})</div>
                    <div>{todayTodoItems().filter(s => s.checked).length}개 진행함</div>
                </div>
            </div>
        </div>
    )
}

export default TodoCardHeader;
