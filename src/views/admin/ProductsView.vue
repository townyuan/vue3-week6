<template>
  <div class="text-center">後台產品列表</div>
  <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary" @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁 -->
      <PaginationComponent
        :pages="pages"
        :get-data="getData"
      ></PaginationComponent>

    </div>
    <!-- Modal 新增&編輯 -->
    <ProductModal
    :temp-product="tempProduct"
    :update-product="updateProduct"
    :create-images="createImages"
    ref="pModal"
    ></ProductModal>
    <!-- Modal 刪除 -->
    <DelModal
    :temp-product="tempProduct"
    :del-product="delProduct"
    ref="delModal"
    >
    </DelModal>
</template>

<script>
  const { VITE_URL, VITE_PATH } = import.meta.env;
  import PaginationComponent from '@/components/PaginationComponent.vue';
  import ProductModal from '@/components/ProductModal.vue';
  import DelModal from '@/components/DelModal.vue';

  export default {
    data() {
      return {
        products: [],
        isNew: false,
        tempProduct: {
          imagesUrl: [],
        },
        modalProduct: null,
        modalDel: null,
        pages: {},
      }
    },
    methods: {
      //取得產品
      getData(page) {
        const api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;

        this.$http.get(api)
          .then((res) => {
            this.products = res.data.products;
            this.pages = res.data.pagination;
          })
          .catch((err) => {
            alert(err.response.data.message)
          })
      },
      //更新產品
      updateProduct() {
        let api = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
        let http = 'post';

        //判斷切換 api 模式
        if(!this.isNew) {
          api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
          http = 'put'
        }

        this.$http[http](api, { data: this.tempProduct })
          .then((res) => {
            alert(res.data.message);
            this.getData();
            this.$refs.pModal.closeModal();
            this.tempProduct = {};
          })
          .catch((err) => {
            alert(err.response.data.message);
          })
      },
      //彈出視窗z
      openModal(status, item) {
        if(status === 'new'){
          this.tempProduct = {
            imagesUrl: [],
          };
          this.isNew = true;
          this.$refs.pModal.openModal();
        } else if (status === 'edit'){
          this.tempProduct = {...item};
          if(!Array.isArray(this.tempProduct.imagesUrl)){
            this.tempProduct.imagesUrl = [];
          }
          this.isNew = false;
          this.$refs.pModal.openModal();
        } else if (status === 'delete') {
          this.tempProduct = {...item};
          this.$refs.delModal.openModal();
        }
      },
      //刪除產品
      delProduct() {
        const api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;

        this.$http.delete(api)
          .then((res) => {
            alert(res.data.message);
            this.$refs.delModal.closeModal();
            this.getData();
          })
          .catch((err) => {
            alert(err.response.data.message)
          })
      },
      createImages() {
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push('');
      }
    },
    mounted() {
      //取出 token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)yuanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      this.getData();
    },
    components: { //註冊區域元件
      PaginationComponent,
      ProductModal,
      DelModal,
    }
  }
</script>