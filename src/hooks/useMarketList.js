import { useReducer } from 'react'
import { sha256 } from 'react-native-sha256'

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.item]
        case 'CHECK':
            return state.map(item => {
                if(item.id === action.id){
                    return {...item, check: !item.check}
                }else{
                    return item
                }
            })
        case 'REMOVE':
            return state.filter(item => {
                return item.id !== action.id
            }) 
        default:
            return state
    }
}

export default () =>{
    const [state, dispath] = useReducer(reducer, initialState)

    const addItem = async (title) => {
        const hashId = await sha256(title)
        dispath({
            type: 'ADD',
            item: {
                id: hashId,
                title: title,
                check: false
            },
        })
    };
    const checkItem = (id) => {
        dispath({
            type: 'CHECK',
            id: id
        })
    };
    const removeItem = (id) => {
        dispath({
            type:'REMOVE',
            id: id
        })
    };

    return [state, addItem, checkItem, removeItem]
}