<template>
  <h1 class="mb-3 text-center">你現在位於...[前台頁面]</h1>
    <header>
      <nav class="d-flex justify-content-center mb-3">
        <RouterLink to="/">首頁</RouterLink>︱
        <RouterLink to="/products">產品列表</RouterLink>︱
        <RouterLink to="/cart">購物車</RouterLink>︱
        <RouterLink to="/login">登入</RouterLink>︱
        <RouterLink to="/admin/products">管理後台</RouterLink>
      </nav>
    </header>
  <RouterView></RouterView>
</template>