import {StateController, Ajax} from 'yua';
import * as _ from 'lodash';

export interface SomeData {
    a?: number;
    b?: number;
}

export interface State {
    foo?: SomeData;
}

export class Controller extends StateController<State> {

    static defaultState: State = {
        foo: {a: 10, b: 5}
    }

    loadData() {
        // do something to load/prepare data
    }

    incrementFoo() {
        var newFoo = _.merge(this.state.foo, {a: this.state.foo.a + 1});
        this.setState({foo: newFoo});
    }
}

export var sharedController = new Controller();

