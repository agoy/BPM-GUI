import * as React from 'react';

import {
    State,
    SomeData,
    sharedController as C
} from '../controllers/main';


export interface Props {
    foo?: SomeData;
}

export interface State {
}


export class View extends React.Component<Props, State> {


    private increment = () => {
        C.incrementFoo();
    }

    render() {

        var a = this.props.foo.a;

        return (
            <div>
                A is {a}.

                <div className="btn"
                onClick={this.increment}>Increment</div>
                
            </div>
        );
    }
}




