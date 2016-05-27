/**
 * Created by user on 2016-05-25.
 */

import React, {
    Component
} from 'react';
import TodoItem from './todoItem';
import { createContainer } from 'meteor/react-meteor-data';

export default class TodoList extends Component {
    constructor(props){
        super(props);

        [
            'clickOkButton'
        ].forEach((method) => this[method] = this[method].bind(this));

        this.state = {
            hideCompleted: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('submit');
        this.callSaveTodo();
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted
        });
    }

    clickOkButton() {
        console.log('clickOkButton');
        this.callSaveTodo();
    }

    callSaveTodo() {
        Meteor.call('saveTodo', {
            text : this.refs.textInput.value,
            createdAt: new Date()
        }, (error, result) => {
            console.log('Meteor.call saveTodo');
            if(!error) {
                console.log('result', result);
            }
            else {
                console.log('error', error);
            }

            this.refs.textInput.value = '';
        });
    }

    renderTodoItems() {
        let todoItems = this.props.todoItems;
        if (this.state.hideCompleted) {
            todoItems = todoItems.filter(todoItem => !todoItem.checked);
        }

        console.log('renderTodoItems');
        return todoItems.map((todoItem) => (
            <TodoItem key={todoItem._id} todoItem={todoItem} />
        ));
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        return (
            <div id="todoList">
                <header>
                    <h1>Todo List</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <form className="todo-item" onSubmit={this.handleSubmit.bind(this)} >
                        <input type="text" ref="textInput" />&nbsp;&nbsp;
                        <input type="button" value="ok" onClick={this.clickOkButton} />
                    </form>
                </header>
                <ul>
                    {this.renderTodoItems()}
                </ul>
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('todoItems');

    return {
        todoItems: DBS['todoItems'].find({}, { sort: { createdAt: -1 } }).fetch()
    };
}, TodoList);