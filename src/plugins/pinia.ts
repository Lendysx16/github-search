import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

// для лайков в localStorage
pinia.use(piniaPluginPersistedstate);

export default pinia;
