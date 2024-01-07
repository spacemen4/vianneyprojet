import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider, Button } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from './supabaseClient';

const App = () => {
    const [session, setSession] = useState(null);
    useEffect(() => {
        const updateSessionState = (session) => {
            setSession(session);
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            updateSessionState(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            updateSessionState(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        }
        setSession(null); // Resets the session state on logout
    };

    return (
        <ChakraProvider theme={theme}>
            <React.StrictMode>
                <ThemeEditorProvider>
                    <HashRouter>
                        {!session ? (
                            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
                        ) : (
                            <>
                                <Button colorScheme="blue" onClick={handleLogout}>Logout</Button>
                                <Switch>
                                    <Route path={`/auth`} component={AuthLayout} />
                                    <Route path={`/admin`} component={AdminLayout} />
                                    <Route path={`/rtl`} component={RtlLayout} />
                                    <Redirect from='/' to='/admin' />
                                </Switch>
                            </>
                        )}
                    </HashRouter>
                </ThemeEditorProvider>
            </React.StrictMode>
        </ChakraProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
