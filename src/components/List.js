import React from 'react';
import NestedList from './NestedList';

const List = ({ data, createTree, removeTodo }) => {
    const prependTodo = JSON.parse(JSON.stringify(data));

    return createTree(prependTodo).map((item) => {
        const { id, children } = item;
        return (
            <li key={id}>
                <NestedList node={item} children={children} removeTodo={removeTodo} />
            </li>
        );
    })
};

export default List;
