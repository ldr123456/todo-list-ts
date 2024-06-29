import React, { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface MainProps {
    todos: Todo[];
    dispatch: React.Dispatch<any>; // Replace with appropriate action type if available
}

export const Main: React.FC<MainProps> = ({ todos, dispatch }) => {
    const { pathname: route } = useLocation();

    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active") return !todo.completed;
                if (route === "/completed") return todo.completed;
                return todo;
            }),
        [todos, route]
    );

    const toggleAll = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }),
        [dispatch]
    );

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 && (
                <div className="toggle-all-container">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        data-testid="toggle-all"
                        checked={visibleTodos.every((todo) => todo.completed)}
                        onChange={toggleAll}
                    />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            )}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
                ))}
            </ul>
        </main>
    );
};
