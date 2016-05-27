/**
 * Created by user on 2016-05-26.
 */

import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value

        Meteor.call('editTodo', {
            todoItem_id : this.props.todoItem._id,
            checked : !this.props.todoItem.checked
        }, (error, result) => {
            console.log('editTodo Meteor.call Done');

            if(!error) {
                console.log('result', result);
            }
            else {
                console.log('error', error);
            }
        });
    }

    deleteItem() {
        Meteor.call('removeTodo', {
            todoItem_id : this.props.todoItem._id
        }, (error, result) => {
            console.log('removeTodo Meteor.call Done');

            if(!error) {
                console.log('result', result);
            }
            else {
                console.log('error', error);
            }
        });
    }
    render() {
        const taskClassName = this.props.todoItem.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>
                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.todoItem.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
                <span className="text">{this.props.todoItem.text}</span>&nbsp;&nbsp;
                <button className="delete" onClick={this.deleteItem.bind(this)}>
                    &times;
                </button>
            </li>
        );
    }
}