import Vue from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { connect } from 'redux-vuex';

import { ClientStoreType, ServerContext } from 'Global/constants';

import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import createReduxStore from './redux-store';
import { Actions } from './redux-store/actions';

Vue.config.productionTip = false;

declare global {
    interface Window {
        _SERVER_CONTEXT_: ServerContext;
    }
}

const context: ServerContext = window._SERVER_CONTEXT_ || {};

const vueApp = new Vue({
    router: createRouter(context),
    render: (h) => h(App),
});

if (context.store === ClientStoreType.REDUX) {
    connect({
        Vue,
        store: createReduxStore(context),
        actions: Actions,
    });
} else {
    vueApp.$store = createStore(context);
}

vueApp.$mount('#app');
