import React, {useEffect, useState} from "react";
import TodoCard from '../components/TodoCard';
import TodoCardHeader from '../components/TodoCardHeader';
import TodoCardBody from '../components/TodoCardBody';
import ContainerFluid from '../components/ContainerFluid';
import ContainerCenter from '../components/ContainerCenter';
import TodoList from '../components/TodoList';
import TodoListItem from '../components/TodoListItem';
import {create7day} from '../util/CommonUtil';
import {actionType, useTodoDispatch, useTodoState} from '../store/ContextDispatch';
import TodoFooter from '../components/TodoFooter';
import Button from '../components/Button';
import AddTodoModal from '../components/AddTodoModal';

const Home = () => {

    const [isAddItemModal, setIsAddItemModal] = useState(false);

    const todoState = useTodoState();
    const todoDispatch = useTodoDispatch();

    const onBaseDateChange = (newBaseDate) => {
        todoDispatch({
            type : actionType.CHANGE_BASE_DATE,
            baseDate : newBaseDate
        });
    };

    const toggleItemCheck = (itemId, checked) => {
        todoDispatch({
            type : actionType.CHANGE_DATA,
            data : {
                id : itemId,
                checked
            }
        });
    }

    useEffect(() => {
        todoDispatch({
            type : actionType.CHANGE_DATES,
            dates : create7day(todoState.baseDate)
        });
    }, [todoState.baseDate]);

    useEffect(() => {
        console.log(todoState)
    }, [todoState.store]);

    return (
        <>
        <ContainerFluid>
            <ContainerCenter>
                <TodoCard>
                    <TodoCardHeader
                        baseDate={todoState.baseDate}
                        dates={todoState.dates}
                        onBaseDateChange={onBaseDateChange}/>
                    <hr/>
                    <TodoCardBody>
                        <TodoList>
                        { todoState.store
                            .filter(item => item.date.format("YYMMDD") === todoState.baseDate.format("YYMMDD"))
                            .map(item => <TodoListItem key={item.id} item={item} toggleItemCheck={toggleItemCheck}/>) }
                            {
                                todoState
                                    .store
                                    .filter(item => item.date.format("YYMMDD") === todoState.baseDate.format("YYMMDD"))
                                    .length <= 0 && <li>일정이 없습니다</li>
                            }
                        </TodoList>
                    </TodoCardBody>
                    <TodoFooter>
                        <Button onClick={() => setIsAddItemModal(true)}>add todo</Button>
                    </TodoFooter>
                </TodoCard>
            </ContainerCenter>
        </ContainerFluid>
        {isAddItemModal && <AddTodoModal close={() => setIsAddItemModal(false)}/>}
        </>
    );
};

export default Home;
