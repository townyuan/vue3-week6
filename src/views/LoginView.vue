<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <h3 class="h3 my-3 font-weight-normal">
        請先登入
      </h3>
      <div class="col-6">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
              v-model="user.username"
              placeholder="name@example.com" required autofocus>
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password"
              v-model="user.password"
              placeholder="Password" required>
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = `${VITE_URL}/admin/signin`;

      this.$http.post(api, this.user)
        .then((res) => {
          const { expired, token } = res.data;
          document.cookie = `yuanToken=${token};expires=${new Date(expired)}; path=/`;
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
