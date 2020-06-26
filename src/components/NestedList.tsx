import React, {FC} from 'react';
import {
    Button,
    Form
} from 'react-bootstrap';
import {ITodo, ITodoElement} from "./App";

interface Props {
    data: ITodo,
    removeTodo: (arg0: string) => void,
    checkTodo: (arg0: string) => void,
}

const NestedList: FC<Props> = ({ data, removeTodo, checkTodo }) => (
    <ul>
        {data && data.map(({id, title, children}: ITodoElement ) => {
            return (
                <li key={id}>
                    <Form.Check className='d-inline-flex' aria-label="option 1" onChange={()=> checkTodo(id)} />
                    <span>{title}</span>
                    <Button variant="outline-primary" size='sm' onClick={() => removeTodo(id)}>
                        Удалить
                    </Button>
                    {children && <NestedList data={children} removeTodo={removeTodo} checkTodo={checkTodo} />}
                </li>
            )
        })}
    </ul>
);

export default NestedList;
