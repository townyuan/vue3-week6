import{_ as u,r,o as i,c as _,a as c,b as s,w as a,d as e,F as l}from"./index-CRT6yWqx.js";var h={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"townyuan",BASE_URL:"/vue3-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:p}=h,m={methods:{checkAdmin(){const t=`${p}/api/user/check`;this.$http.post(t).then(o=>{console.log("驗證成功：",o.data.success)}).catch(o=>{console.log("驗證失敗：",o.response.data.message),this.$router.push("/login")})}},mounted(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)yuanToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t,this.checkAdmin()}},f=c("h1",{class:"mb-3 text-center"},"你現在位於...[後台頁面]",-1),k={class:"d-flex justify-content-center mb-3"};function $(t,o,V,R,x,v){const n=r("RouterLink"),d=r("RouterView");return i(),_(l,null,[f,c("header",null,[c("nav",k,[s(n,{to:"/admin/products"},{default:a(()=>[e("產品管理")]),_:1}),e("︱ "),s(n,{to:"/admin/order"},{default:a(()=>[e("訂單列表")]),_:1}),e("︱ "),s(n,{to:"/"},{default:a(()=>[e("回前台")]),_:1})])]),s(d)],64)}const E=u(m,[["render",$]]);export{E as default};