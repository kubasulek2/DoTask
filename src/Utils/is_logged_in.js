import store from 'store';

export default () => !!store.get('auth');
