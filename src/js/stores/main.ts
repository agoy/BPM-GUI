import * as Redux from 'redux';

export enum Actions {
    INCREMENT
}

var reducer = function (state: any = {}, action: any): any {

    switch(action.type) {
        case Actions.INCREMENT:
            return {
            a: state.a + 1
        };
        default:
            return state;
    }
}

export var store = Redux.createStore(reducer, {a: 0});

