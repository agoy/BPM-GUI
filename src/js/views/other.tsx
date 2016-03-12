import * as React from 'react';

import {
    Actions, store
} from '../stores/main';


export interface Props {
    a?: number;
}

export interface State {
}


export class View extends React.Component<Props, State> {


    private increment = () => {
        store.dispatch({type: Actions.INCREMENT});
    }

    render() {

        var a = this.props.a;

        return (
            <div>
                A is {a}.

                <div className="btn"
                onClick={this.increment}>Increment</div>
                
            </div>
        );
    }
}




