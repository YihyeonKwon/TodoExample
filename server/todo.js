/**
 * Created by user on 2016-05-26.
 */

// if (Meteor.isServer) {
//     // This code only runs on the server
//     // Only publish tasks that are public or belong to the current user
//     Meteor.publish('todoItems', function tasksPublication() {
//         return DBS['todoItems'].find({});
//     });
// }

Meteor.methods({
    saveTodo(params) {
        console.log('saveTodo methods');
        var text = params.text;
        var createdAt = params.createdAt;

        DBS['todoItems'].insert({
            text: text,
            checked : '',
            createdAt: createdAt
        }, (error, result) => {
            if(!error) {
                console.log('result', result);
                return result;
            }
            else {
                console.log('error', error);
                return error;
            }
        });
    },
    editTodo(params) {
        console.log('editTodo methods');
        var todo_id = params.todoItem_id;
        var checked = params.checked;
        var asdf;

        try {
            asdf = DBS['todoItems'].update({
                _id: todo_id
            }, {
                $set: {
                    checked : checked
                }
            });
        } catch (err) {
            console.log('err');
            throw new Meteor.Error("DB", err);
        }
        return asdf;
    },
    removeTodo(params) {
        console.log('removeTodo methods');
        var todo_id = params.todoItem_id;

        DBS['todoItems'].remove({
            _id: todo_id
        }, (error, result) => {
            if(!error) {
                console.log('result', result);
                return result;
            }
            else {
                console.log('error', error);
                return error;
            }
        });
    }
});