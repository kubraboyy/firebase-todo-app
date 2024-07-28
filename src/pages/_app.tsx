"use client";
import { AppProps } from 'next/app';
import PrivateRoute from '../components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PrivateRoute>
            <Component {...pageProps} />
        </PrivateRoute>
    );
}

export default MyApp;