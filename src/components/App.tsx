import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import ModalWindow from './ModalWindow';
import List from './List';
import generateID from '../utils/generateID';
import styles from './App.module.scss';

export type ITodo = Array<ITodoElement>;

export interface ITodoElement {
    title: string,
    checked: boolean,
    parent: string,
    id: string,
    children?: Array<ITodoElement>;
}

export interface IMoldTodo {
    value: string,
    title: string,
}

interface Props {}

interface State {
    todo: ITodoElement[],
    show: boolean;
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            todo: [
                {title: 'Тайтл_один', checked: false, parent: "0", id: "1",},
                {title: 'Тайтл_два', checked: false, parent: "0", id: "2",},
                {title: 'Тайтл_один_два', checked: false, parent: "1", id: "3",},
                {title: 'Тайтл_два_два', checked: false, parent: "1", id: "4",},
                {title: 'Тайтл_один_два_три', checked: false, parent: "3", id: "5",},
                {title: 'Тайтл_два_два_три', checked: false, parent: "3", id: "6",},
                {title: 'Тайтл_три_два_три', checked: false, parent: "3", id: "7",},
            ],
            show: false,
        }
    }

    createTree = (data: ITodo, parent: string = "0") => {
        let node: ITodo  = [];

        data.filter((el: ITodoElement) => {
            return el.parent === parent
        })
            .forEach((el: ITodoElement) => {
                el = {...el, children: this.createTree(data, el.id)};
                node = [...node, el]

            });

        return node;
    };

    showModal = () => this.setState({show: !this.state.show});

    setTodoState = (newTodo: ITodo, callback?: () => void) => this.setState({todo: newTodo}, callback);

    addTodo = (task: IMoldTodo) => {
        const {value, title} = task;
        const newTask = {title, checked: false, parent: value, id: generateID()};

        this.setTodoState([...this.state.todo, newTask]);
        this.showModal();
    };

    removeTodo = (id: string) => {
        const newTodo = this.state.todo.filter((item: ITodoElement) => (item.id !== id && item.parent !== id));
        this.setTodoState(newTodo);
    };

    checkTodo = (id: string) => {
        const newTodo = this.state.todo.map((obj: ITodoElement) =>
            obj.id === id ? {...obj, checked: !obj.checked} : obj
        );

        this.setTodoState(newTodo, this.sortTodo);
    };

    sortTodo = () => {
        const sortTodo = this.state.todo.sort((a: ITodoElement, b: ITodoElement) => {
            return Number(a.checked) - Number(b.checked);
        });

        this.setTodoState(sortTodo);
    };


    render() {
        const {
            show,
            todo,
        } = this.state;

        return (
            <main className={styles.app}>
                <section>
                    <h1>TodoLIST</h1>
                    <List
                        data={todo}
                        createTree={this.createTree}
                        removeTodo={this.removeTodo}
                        checkTodo={this.checkTodo}
                    />
                    <Button variant="primary" onClick={this.showModal}>
                        Добавить задачу
                    </Button>
                </section>
                <ModalWindow show={show} handleClose={this.showModal} addTodo={this.addTodo} todo={todo} />
            </main>
        );
    }
}

export default App;
