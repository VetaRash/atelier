import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
export const useRoutes = (isAuthenticated) => {

    if (isAuthenticated) {

        return (
            <Switch>
                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                <Route path="" exact>
                    <MainPage />
                </Route>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/admin" exact>
                <AuthPage />
            </Route>
            <Route path="" exact>
                <MainPage />
            </Route>
        </Switch>
    );

}