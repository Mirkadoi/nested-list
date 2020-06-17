import React from 'react';
import { Button, Form } from 'react-bootstrap';

const NestedList = ({ children, node, removeTodo, checkTodo }) => {
    let childnodes = null;
    const {title} = node;

    if (children) {
        childnodes = children.map((item) => {
            return (
                <li key={item.id}>
                    <NestedList node={item} children={item.children} removeTodo={removeTodo} checkTodo={checkTodo}/>
                </li>
            );
        });
    }

    return (
        <>
                <Form.Check className='d-inline-flex' aria-label="option 1" onChange={()=> checkTodo(node.id)} />
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
