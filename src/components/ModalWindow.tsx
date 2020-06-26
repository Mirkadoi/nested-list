import React, { useState, FC, ChangeEvent } from 'react';
import {
    Button,
    Modal,
    Form
} from 'react-bootstrap';
import { ITodo, IMoldTodo } from './App'

interface Props {
    show: boolean,
    handleClose: () => void,
    todo: ITodo,
    addTodo: (arg0: IMoldTodo) => void,
}

const ModalWindow: FC<Props> = ({show, handleClose, todo, addTodo}) => {
    const [newTask, setNewTask] = useState<IMoldTodo>({
        title: '',
        value: '0',
    });

    const changeBaseElement = (event: ChangeEvent<HTMLInputElement>) => setNewTask({...newTask, value: event.target.value});
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => setNewTask({...newTask, title: event.target.value});

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить элемент</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control type="text" placeholder="Название задачи" onChange={changeTitle} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Выберете базовый элемент</Form.Label>
                        <Form.Control as="select" onChange={changeBaseElement}>
                            <option defaultValue="0">Новая задача</option>
                            {
                                todo.map(({checked, title, id})=> {
                                    if (!checked) {
                                        return <option value={id} key={id}>{title}</option>
                                    }
                                    return null;
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отменить
                </Button>
                <Button variant="primary" onClick={() => addTodo(newTask)} disabled={!newTask.title}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalWindow;
