/**
 * Created by user on 2016-05-25.
 */

import React from 'react';
import { mount } from 'react-mounter';
import { MainFrame } from '../../components/mainframe';
import { NavBar } from '../../components/nav-bar';
import { TodoList } from '../../components/todo-list';
import { Footer } from '../../components/footer';

FlowRouter.route('/', {
    name : 'mainframe',
    action(params, queryParams) {
        mount(MainFrame, {
            content : (<TodoList />)
        });
    }
});