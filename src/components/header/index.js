import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Header = (props) => {
    return (
        <div>
            <Jumbotron>
                <h4 className="display-4">Phone Screen Damage Detection POC</h4>
                <p className="lead">This is a proof of concept for damage detection of phone screens.
                    Labels that can be detected: <b><i>Cracked, Scratched</i></b></p>
                <hr className="my-2" />
                <p>
                    Upload your media file(s), wait for them to get processed and finally see your predicted outputs.</p>
            </Jumbotron>
        </div>
    );
};

export default Header;