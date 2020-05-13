import React from 'react';
import { Alert } from 'reactstrap';

export const Footer = (props) => {
    return (
        <div>
            <Alert color="secondary" style={{textAlign: 'center'}}>
                <b> Developed with <a href="https://react.com">React.js</a> in New York</b>
            </Alert>
        </div>
        );
}