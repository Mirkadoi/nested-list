import React from 'react';
import { Button } from 'react-bootstrap';

const NestedList = ({ children, node, removeTodo }) => {
    let childnodes = null;
    const {title} = node;

    if (children) {
        childnodes = children.map((item) => {
            return (
                <li key={item.id}>
                    <NestedList node={item} children={item.children} removeTodo={removeTodo}/>
                </li>
            );
        });
    }

    return (
        <>
            <span>{title}</span>
            <Button variant="outline-primary" size='sm' onClick={() => removeTodo(node.id)}>
                Удалить
            </Button>
            {childnodes
                ? <ul>{childnodes}</ul>
                : null}
        </>
    );
};

export default NestedList;
