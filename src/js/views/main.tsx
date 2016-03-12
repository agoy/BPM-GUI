import * as React from 'react';

import {
    Actions, store
} from '../stores/main';

import {View as OtherView} from './other';

export interface Props {
}

export interface State {
    a?: number;
}


export class View extends React.Component<Props, State> {

    state: State = store.getState();

    private observer: any;

    private componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState() as State);
        });
    }

    private componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <OtherView {...this.state} />
            </div>
        );
    }
}



