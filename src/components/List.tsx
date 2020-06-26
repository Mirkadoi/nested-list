import React, {FC} from 'react';
import NestedList from './NestedList';
import {ITodo} from "./App";

interface Props {
    data: ITodo,
    createTree: (arg0: ITodo, arg1?: string) => ITodo,
    removeTodo: (arg0: string) => void,
    checkTodo: (arg0: string) => void,
}

const List: FC<Props> = (props: Props) => {
    const {data, createTree, removeTodo, checkTodo} = props;
    const treeFormTodo = createTree(data);

    return <NestedList data={treeFormTodo} removeTodo={removeTodo} checkTodo={checkTodo}/>
};

export default List;
