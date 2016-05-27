/**
 * Created by user on 2016-05-25.
 */

import React, {
    Component
} from 'react';

export const MainFrame = ({navBar, content, footer}) => (
    <div id="todo-example-container">
        <div className="navbar-container">{navBar}</div>
        <div className="content-container">{content}</div>
        <div className="footer-container">{footer}</div>
    </div>
)