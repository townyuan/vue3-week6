<template>
  <h5 class="my-3 text-center">產品列表</h5>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <UserProductModal ref="userProductModal"
      :temp-product="tempProduct"
      :add-to-cart="addToCart">
      </UserProductModal>
      <!-- 產品Modal -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.key">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
              :style="{
                backgroundImage: `url(${product.imageUrl})`
              }"
              ></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <div class="h5"
              v-if="product.origin_price === product.price">{{ product.price }} 元</div>
              <del class="h6" v-else>原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                  @click="openModal(product)">
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                  :disabled="product.id === status.addCartLoading"
                  @click="addToCart(product.id)">
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"
                  v-if="product.id === status.addCartLoading"></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserProductModal from '@/components/UserProductModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      status: {
        addCartLoading: '',
        cartQtyLoading: '',
      },
      userProductModal: null,
      qty: 1,
      carts: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  components: {
    UserProductModal,
  },
  methods: {
    // 取得產品們
    getProducts() {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/products/all`).then((res) => {
        this.products = res.data.products;
      })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userProductModal.open();
    },
    // 加入購物車
    addToCart(product_id, qty = 1) {
      const order = {
        product_id,
        qty,
      };
      this.status.addCartLoading = product_id;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: order })
        .then(() => {
          this.status.addCartLoading = '';
          this.getCart();
          this.$refs.userProductModal.close();
          alert('已加入購物車');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 取得購物車
    getCart() {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/cart`).then((res) => {
        this.carts = res.data.data;
      })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 變更購物車數量
    changeCartQty(item, qty = 1) {
      const order = {
        product_id: item.product_id,
        qty,
      };
      this.status.cartQtyLoading = item.id;
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`, { data: order })
        .then(() => {
          this.status.cartQtyLoading = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 移除購物車項目
    removeCartItem(id) {
      this.status.cartQtyLoading = id;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then(() => {
          this.status.cartQtyLoading = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 清空購物車
    deleteAllCarts() {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then(() => {
          this.getCart();
        })
        .catch((err) => {
          alert.log(err.response.message);
        });
    },
    // 建立訂單
    createOrder() {
      const order = this.form;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: order })
        .then((response) => {
          alert(response.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        }).catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
};
</script>
