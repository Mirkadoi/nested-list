import React, { useState } from 'react';
import {
    Button,
    Modal,
    Form
} from 'react-bootstrap';

const ModalWindow = ({ show, handleClose, todo, addTodo }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        value: '0',
    });

    const changeBaseElement = (event) => setNewTask({...newTask, value: event.target.value});
    const changeTitle = (event) => setNewTask({...newTask, title: event.target.value});

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить элемент</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control type="text" placeholder="Название задачи" onChange={changeTitle}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Выберете базовый элемент</Form.Label>
                        <Form.Control as="select" onChange={changeBaseElement}>
                            <option defaultValue="0">Новая задача</option>
                            {
                                todo.map(({ checked, title, id }) => {
                                    if (checked === false) {
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
