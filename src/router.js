import { createRouter, createWebHistory } from 'vue-router';
import AppLogin from './components/AppLogin.vue';
import SaleForm from './components//SaleForm.vue';
import SaleHistory from './components/SaleHistory.vue';
import UploadSPPhoto from './components/UploadSPPhoto.vue';


const routes = [
    { path: '/', name: 'login', component: AppLogin },
    { path: '/sales', name: 'SaleForm', component: SaleForm },
    { path: '/history', component: SaleHistory },
    { path: '/upload', component: UploadSPPhoto }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
