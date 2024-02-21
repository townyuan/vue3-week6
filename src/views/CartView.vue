<template>
  <h5 class="my-3 text-center">購物車</h5>
  <div class="container">
    <div class="mt-4">
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button"
        @click="deleteAllCarts">清空購物車</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 200px">數量/單位</th>
            <th class="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(cart.id)"
                :disabled="status.cartQtyLoading === cart.id">
                x
              </button>
            </td>
            <td>
              {{ cart.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <button type="button" class="btn btn-outline-success"
                  :disabled="cart.qty === 1"
                  v-if="cart.qty > 1"
                  @click="cart.qty-- ; changeCartQty(cart, cart.qty)"> - </button>
                  <button type="button" class="btn btn-outline-danger"
                  v-else
                  @click="removeCartItem(cart.id)"
                  :disabled="status.cartQtyLoading === cart.id">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0
                    V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0
                    V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2
                    V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1
                    h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059
                    V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                  </button>
                  <input min="1" type="number" class="form-control" v-model.number="cart.qty"
                  readonly>
                  <button type="button" class="btn btn-outline-success"
                  @click="cart.qty++ ; changeCartQty(cart, cart.qty)"> + </button>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ cart.total}}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ carts.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- 表單 開始-->
    <div class="my-5 row justify-content-center">
      <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VField id="email" name="email" type="email" class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required"
            v-model="form.user.email"></VField>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VField id="name" name="姓名" type="text" class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VField>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VField id="tel" name="電話" type="text" class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></VField>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VField id="address" name="地址" type="text" class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address"></VField>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VForm>
    </div>
    <!-- 表單 結束-->
  </div>
</template>

<script>
// import { VeeValidate, VeeValidateRules, VeeValidateI18n } from 'vee-validate';

// const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
// const { required, email, min, max } = VeeValidateRules;
// const { localize, loadLocaleFromURL } = VeeValidateI18n;

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
// defineRule('max', max);

// loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// configure({
//   generateMessage: localize('zh_TW'),
// });

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
    // VForm: Form,
    // VField: Field,
    // ErrorMessage,
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
