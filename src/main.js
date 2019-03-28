import Vue from 'vue'
import App from './App.vue'
import {router} from './router/index'
import store from './store/index'
import {
    Avatar,
    Button,
    Badge,
    Card,
    Circle,
    Col,
    DatePicker,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Form,
    FormItem,
    Header,
    Icon,
    Input,
    Layout,
    Menu,
    MenuGroup,
    MenuItem,
    Message,
    Modal,
    Notice,
    Page,
    Poptip,
    Radio,
    RadioGroup,
    Row,
    Sider,
    Submenu,
    Table,
    Tag,
    Upload
} from 'iview'
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false

Vue.component('Header', Header);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Avatar', Avatar);
Vue.component('Badge', Badge);
Vue.component('Button', Button);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout);
Vue.component('Sider', Sider);
Vue.component('Submenu', Submenu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('Input', Input);
Vue.component('DatePicker', DatePicker);
Vue.component('Card', Card);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
Vue.component('Tag', Tag);
Vue.component('Table', Table);
Vue.component('Page', Page);
Vue.component('Modal', Modal);
Vue.component('i-circle', Circle);
Vue.component('Poptip', Poptip);
Vue.component('Upload', Upload);
Vue.prototype.$Notice = Notice;
Vue.prototype.$Message = Message;
Vue.prototype.$baseUrl = process.env.BASE_URL;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
