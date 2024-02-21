<template>
  <h1 class="mb-3 text-center">你現在位於...[後台頁面]</h1>
    <header>
      <nav class="d-flex justify-content-center mb-3">
        <RouterLink to="/admin/products">產品管理</RouterLink>︱
        <RouterLink to="/admin/order">訂單列表</RouterLink>︱
        <RouterLink to="/">回前台</RouterLink>
      </nav>
    </header>
  <RouterView></RouterView>
</template>

<script>
  //驗證是否為管理員
  const { VITE_URL } = import.meta.env;
  export default {
    methods: {
      checkAdmin() {
        const url = `${VITE_URL}/api/user/check`;
        this.$http.post(url)
          .then((res) => {
            console.log('驗證成功：',res.data.success);
          })
          .catch((err) => {
            console.log('驗證失敗：',err.response.data.message);
            this.$router.push('/login');
          })
      },
    },
    mounted(){
      //取出 token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)yuanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      this.checkAdmin()
    }
  }
</script>