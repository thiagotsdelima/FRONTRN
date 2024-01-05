import React from 'react';
import ReactDom from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';

import { AuthProvider } from "./hooks/auth";
import theme from './styles/theme';

import { Routes } from './routes';

ReactDom.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<ThemeProvider theme={theme}>
<GlobalStyles />
<AuthProvider>
<Routes />
</AuthProvider>
</ThemeProvider>
</React.StrictMode>
);