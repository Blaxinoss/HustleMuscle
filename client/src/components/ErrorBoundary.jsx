import React from 'react';
import { Link } from 'react-router';

const ErrorBoundary = ({ children }) => {

    return (
        <div className="error-message text-white p-10">
            <h2>Something went wrong!</h2>
            <p>You lost in the site get back to <Link className='text-blue-500' to={'/'}>Home</Link></p>

        </div>
    );
}

export default ErrorBoundary;
