import * as React from 'react';

import {
    State,
    sharedController as C
} from '../controllers/main';

import {View as OtherView} from './other';

export interface Props {
}


export class View extends React.Component<Props, State> {

    state = C.state;

    private observer: any;

    private componentDidMount() {
        this.observer = C.createStateObserver(this.handleStateUpdate);
        C.loadData();
    }

    private componentWillUnmount() {
        C.removeStateObserver(this.observer);
        this.observer = null;
    }

    private handleStateUpdate = () => {
        this.setState(C.state);
    }

    render() {
        return (
            <div>
                <OtherView {...this.state} />
            </div>
        );
    }
}



