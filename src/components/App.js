import React, { Component } from 'react';
import {
    Button,
} from 'react-bootstrap';
import ModalWindow from './ModalWindow';
import NestedList from './NestedList';
import generateID from '../utils/generateID';
import styles from './App.module.scss';

export function List({ data, createTree }) {
    const prependTodo = JSON.parse(JSON.stringify(data));

    return createTree(prependTodo).map((item) => {
        const { id, children } = item;
        return (
            <li key={id}>
                <NestedList node={item} children={children} />
            </li>
        );
    })
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [
                { title: 'Тайтл_один', checked: false, parent: "0", id: "1", },
                { title: 'Тайтл_два', checked: false, parent: "0", id: "2", },
                { title: 'Тайтл_один_два', checked: false, parent: "1", id: "3", },
                { title: 'Тайтл_два_два', checked: false, parent: "1", id: "4", },
                { title: 'Тайтл_один_два_три', checked: false, parent: "3", id: "5", },
                { title: 'Тайтл_два_два_три', checked: true, parent: "3", id: "6", },
                { title: 'Тайтл_три_два_три', checked: false, parent: "3", id: "7", },
            ],
            show: false,
        }
    }

    createTree = (data, parent = "0") => {
        let node = [];

        data
            .filter((d) => {
                return d.parent === parent
            })
            .map((d) => {
                const cd = d;
                cd.children = this.createTree(data, d.id);
                return node.push(cd);
            });

        return node;
    };

    switchShow = () => this.setState({ show: !this.state.show });

    changeTodo = (task) => {
        const { value, title } = task;
        const newTask = { title, checked: false, parent: value, id: generateID() };

        this.setState({ todo: [...this.state.todo, newTask] });
        // handleClose();
    };

    // sortt = () => {
    //     const kek = this.state.todo.sort((a, b) => {
    //                 return a.checked - b.checked;
    //             });
    //     this.changeTodo(kek);
    // };


    render() {
        const {
            show,
            todo,
        } = this.state;

        return (
            <main className={styles.app}>
                <section>
                    <h1>TodoLIST</h1>
                    <ul>
                        <List data={todo} createTree={this.createTree} />
                    </ul>
                    <Button variant="primary" onClick={this.switchShow}>
                        Добавить задачу
                    </Button>
                    <Button variant="primary" onClick={this.sortt}>
                        Сорт
                    </Button>
                </section>
                <ModalWindow show={show} handleClose={this.switchShow} changeTodo={this.changeTodo} todo={todo} />
            </main>
        );
    }
}

export default App;
