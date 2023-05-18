import {
	createStore
} from "vuex";
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
const store = createStore({
	modules: {
		'm_cart': moduleCart,
		'm_user': moduleUser
	},
});
export default store;