import React, { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

import { REMOVE_COMPLETED_ITEMS } from "../constants";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface FooterProps {
    todos: Todo[];
    dispatch: React.Dispatch<any>; // Replace with appropriate action type if available
}

export const Footer: React.FC<FooterProps> = ({ todos, dispatch }) => {
    const { pathname: route } = useLocation();

    const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);

    const removeCompleted = useCallback(() => dispatch({ type: REMOVE_COMPLETED_ITEMS }), [dispatch]);

    // prettier-ignore
    if (todos.length === 0)
        return null;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <a className={classnames({ selected: route === "/" })} href="#/">
                        All
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: route === "/active" })} href="#/active">
                        Active
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: route === "/completed" })} href="#/completed">
                        Completed
                    </a>
                </li>
            </ul>
            <button className="clear-completed" disabled={activeTodos.length === todos.length} onClick={removeCompleted}>
                Clear completed
            </button>
        </footer>
    );
};