import React, {useContext, useReducer} from 'react';
import dayjs from 'dayjs';

const dummyData = [
    {
        id : 1,
        date : dayjs(),
        memo : "first dummy data!",
        checked : false
    },
    {
        id : 2,
        date : dayjs(),
        memo : "2 dummy data!",
        checked : false
    },
    {
        id : 3,
        date : dayjs(),
        memo : "checked data!",
        checked : true
    }
];

const initData = {
    baseDate : dayjs(Date.now()),
    dates : [],
    store : dummyData || [],
    id : dummyData.length + 1
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.CHANGE_BASE_DATE :
            return {
                ...state,
                baseDate : action.baseDate
            }
        case actionType.CHANGE_DATES :
            return {
                ...state,
                dates : action.dates
            }
        case actionType.ADD_DATA :

            const d = {
                ...action.data,
                id : state.id
            };

            return {
                ...state,
                store : [...state.store, d],
                id : state.id+1
            }
        case actionType.CHANGE_DATA :
            return {
                ...state,
                store : state.store.map(s => s.id === action.data.id ? {
                    ...s,
                    ...action.data
                } : s)
            }
        case actionType.REMOVE_DATA :
            return {
                ...state,
                store : state.store.filter(s => s.id !== action.data.id)
            }
        default :
            throw new Error();
    }
}

const TodoStateContext = React.createContext({});
const TodoDispatchContext = React.createContext({});

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initData);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export const useTodoState = () => useContext(TodoStateContext);
export const useTodoDispatch = () => useContext(TodoDispatchContext);

export const actionType = {
    CHANGE_BASE_DATE : "CHANGE_BASE_DATE",
    CHANGE_DATES : "CHANGE_DATES",
    ADD_DATA : "ADD_DATA",
    CHANGE_DATA : "CHANGE_DATA",
    REMOVE_DATA : "REMOVE_DATA"
}
