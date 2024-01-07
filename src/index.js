import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider, Button, Box } from '@chakra-ui/react';
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
							<Box
							width="90%"  // Set the width to 90%
							margin="auto" // Center horizontally
							height="90vh" // Set the height to 90% of the viewport height
							display="flex" // Use flexbox for centering vertically
							justifyContent="center" // Center horizontally
							alignItems="center" // Center vertically
						  >
							<Auth
								supabaseClient={supabase}
								theme="default"
								appearance={{
									theme: ThemeSupa,
									variables: {
										default: {
											colors: {
												brand: 'rgb(0, 128, 255)',
												brandAccent: 'rgb(0, 128, 255)',
											},
										},
									},
								}}
								providers={['google']}								
								localization={{
									variables: {
										sign_in: {
											email_label: 'Adresse e-mail', // French translation for 'Email address'
											password_label: 'Votre mot de passe', // French translation for 'Your Password'
											email_input_placeholder: 'Saisissez votre adresse e-mail', // French translation for 'Your email address'
											password_input_placeholder: 'Saisissez votre mot de passe', // French translation for 'Your password'
											button_label: 'Se connecter', // French translation for 'Sign in'
											loading_button_label: 'Connexion en cours ...', // French translation for 'Signing in ...'
											social_provider_text: 'Se connecter avec {{provider}}', // Use the provided label
											link_text: 'Vous avez déjà un compte? Connectez-vous', // French translation for 'Already have an account? Sign in'
											confirmation_text: 'Vérifiez votre e-mail pour le lien de confirmation', // Use the provided label
										},
										sign_up: {
											email_label: 'Votre adresse e-mail', // French translation for 'Email address'
											password_label: 'Votre mot de passe', // French translation for 'Create a Password'
											email_input_placeholder: 'Saisissez votre adresse e-mail', // French translation for 'Your email address'
											password_input_placeholder: 'Saisissez votre mot de passe', // French translation for 'Your password'
											button_label: "S'inscrire", // French translation for 'Sign up'
											loading_button_label: 'Inscription en cours...', // French translation for 'Signing up ...'
											social_provider_text: 'Se connecter avec {{provider}}', // Use the provided label
											link_text: "Vous n'avez pas de compte? Inscrivez-vous", // French translation for 'Don't have an account? Sign up'
											confirmation_text: 'Vérifiez votre e-mail pour le lien de confirmation', // French translation for 'Check your email for the confirmation link'
										},
										magic_link: {
											email_label: 'Votre adresse e-mail',
											password_label: 'Votre mot de passe',
											email_input_placeholder: 'Saisissez votre adresse e-mail',
											button_label: 'Envoyer des instructions de réinitialisation de mot de passe',
											loading_button_label: 'Envoi des instructions de réinitialisation en cours...',
											link_text: 'Mot de passe oublié?',
											confirmation_text: 'Vérifiez votre e-mail pour le lien de réinitialisation du mot de passe',
										},
										forgotten_password: {
											password_label: 'Nouveau mot de passe',
											password_input_placeholder: 'Saisissez votre nouveau mot de passe',
											button_label: 'Mettre à jour le mot de passe',											
											email_label: 'Adresse e-mail', // French translation for 'Email address'
											loading_button_label: 'Envoi des instructions de réinitialisation en cours...', // French translation for 'Sending reset instructions ...'
											link_text: 'Mot de passe oublié?', // French translation for 'Forgot your password?'
											confirmation_text: 'Vérifiez votre e-mail pour le lien de réinitialisation du mot de passe', // French translation for 'Check your email for the password reset link'
										},

										update_password: {
											email_input_label: 'Adresse e-mail',
											email_input_placeholder: 'Saisissez votre adresse e-mail',
											phone_input_label: 'Numéro de téléphone',
											phone_input_placeholder: 'Saisissez votre numéro de téléphone',
											token_input_label: 'Jeton',
											token_input_placeholder: 'Saisissez votre jeton OTP',
											button_label: 'Vérifier le jeton',
											loading_button_label: 'Vérification en cours...',
										},
									},
								}}
							/>
							</Box>
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
