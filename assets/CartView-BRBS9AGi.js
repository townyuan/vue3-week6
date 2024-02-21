import{_ as x,r as g,o as c,c as m,a as t,F as v,f as k,t as f,b as n,w,e as y,h as C,i as b}from"./index-CRT6yWqx.js";var L={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"townyuan",BASE_URL:"/vue3-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:r,VITE_PATH:i}=L,q={data(){return{products:[],tempProduct:{},status:{addCartLoading:"",cartQtyLoading:""},userProductModal:null,qty:1,carts:{},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},components:{},methods:{getProducts(){this.$http.get(`${r}/api/${i}/products/all`).then(e=>{this.products=e.data.products}).catch(e=>{alert(e.response.data.message)})},openModal(e){this.tempProduct=e,this.$refs.userProductModal.open()},addToCart(e,a=1){const u={product_id:e,qty:a};this.status.addCartLoading=e,this.$http.post(`${r}/api/${i}/cart`,{data:u}).then(()=>{this.status.addCartLoading="",this.getCart(),this.$refs.userProductModal.close()}).catch(h=>{alert(h.response.data.message)})},getCart(){this.$http.get(`${r}/api/${i}/cart`).then(e=>{this.carts=e.data.data}).catch(e=>{alert(e.response.data.message)})},changeCartQty(e,a=1){const u={product_id:e.product_id,qty:a};this.status.cartQtyLoading=e.id,this.$http.put(`${r}/api/${i}/cart/${e.id}`,{data:u}).then(()=>{this.status.cartQtyLoading="",this.getCart()}).catch(h=>{alert(h.response.data.message)})},removeCartItem(e){this.status.cartQtyLoading=e,this.$http.delete(`${r}/api/${i}/cart/${e}`).then(()=>{this.status.cartQtyLoading="",this.getCart()}).catch(a=>{alert(a.response.data.message)})},deleteAllCarts(){this.$http.delete(`${r}/api/${i}/carts`).then(()=>{this.getCart()}).catch(e=>{alert.log(e.response.message)})},createOrder(){const e=this.form;this.$http.post(`${r}/api/${i}/order`,{data:e}).then(a=>{alert(a.data.message),this.$refs.form.resetForm(),this.getCart()}).catch(a=>{alert(a.response.data.message)})}},mounted(){this.getProducts(),this.getCart()}},$=t("h5",{class:"my-3 text-center"},"購物車",-1),E={class:"container"},M={class:"mt-4"},P={class:"text-end"},Q={class:"table align-middle"},U=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"200px"}},"數量/單位"),t("th",{class:"text-end"},"單價")])],-1),T=["onClick","disabled"],A={class:"input-group input-group-sm"},F={class:"input-group mb-3"},I=["disabled","onClick"],S=["onClick","disabled"],z=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[t("path",{d:`M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0
                    V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0
                    V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z`}),t("path",{d:`M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2
                    V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1
                    h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059
                    V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z`})],-1),B=[z],D=["onUpdate:modelValue"],H=["onClick"],R={class:"text-end"},O=t("td",{colspan:"3",class:"text-end"},"總計",-1),N={class:"text-end"},j={class:"my-5 row justify-content-center"},G={class:"mb-3"},J=t("label",{for:"email",class:"form-label"},"Email",-1),K={class:"mb-3"},W=t("label",{for:"name",class:"form-label"},"收件人姓名",-1),X={class:"mb-3"},Y=t("label",{for:"tel",class:"form-label"},"收件人電話",-1),Z={class:"mb-3"},tt=t("label",{for:"address",class:"form-label"},"收件人地址",-1),et={class:"mb-3"},st=t("label",{for:"message",class:"form-label"},"留言",-1),at=t("div",{class:"text-end"},[t("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function ot(e,a,u,h,l,d){const p=g("VField"),_=g("ErrorMessage"),V=g("VForm");return c(),m(v,null,[$,t("div",E,[t("div",M,[t("div",P,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:a[0]||(a[0]=(...s)=>d.deleteAllCarts&&d.deleteAllCarts(...s))},"清空購物車")]),t("table",Q,[U,t("tbody",null,[(c(!0),m(v,null,k(l.carts.carts,s=>(c(),m("tr",{key:s.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:o=>d.removeCartItem(s.id),disabled:l.status.cartQtyLoading===s.id}," x ",8,T)]),t("td",null,f(s.product.title),1),t("td",null,[t("div",A,[t("div",F,[s.qty>1?(c(),m("button",{key:0,type:"button",class:"btn btn-outline-success",disabled:s.qty===1,onClick:o=>{s.qty--,d.changeCartQty(s,s.qty)}}," - ",8,I)):(c(),m("button",{key:1,type:"button",class:"btn btn-outline-danger",onClick:o=>d.removeCartItem(s.id),disabled:l.status.cartQtyLoading===s.id},B,8,S)),y(t("input",{min:"1",type:"number",class:"form-control","onUpdate:modelValue":o=>s.qty=o,readonly:""},null,8,D),[[C,s.qty,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-outline-success",onClick:o=>{s.qty++,d.changeCartQty(s,s.qty)}}," + ",8,H)])])]),t("td",R,f(s.total),1)]))),128))]),t("tfoot",null,[t("tr",null,[O,t("td",N,f(l.carts.total),1)])])])]),t("div",j,[n(V,{ref:"form",class:"col-md-6",onSubmit:d.createOrder},{default:w(({errors:s})=>[t("div",G,[J,n(p,{id:"email",name:"email",type:"email",class:b(["form-control",{"is-invalid":s.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:l.form.user.email,"onUpdate:modelValue":a[1]||(a[1]=o=>l.form.user.email=o)},null,8,["class","modelValue"]),n(_,{name:"email",class:"invalid-feedback"})]),t("div",K,[W,n(p,{id:"name",name:"姓名",type:"text",class:b(["form-control",{"is-invalid":s.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:l.form.user.name,"onUpdate:modelValue":a[2]||(a[2]=o=>l.form.user.name=o)},null,8,["class","modelValue"]),n(_,{name:"姓名",class:"invalid-feedback"})]),t("div",X,[Y,n(p,{id:"tel",name:"電話",type:"text",class:b(["form-control",{"is-invalid":s.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:l.form.user.tel,"onUpdate:modelValue":a[3]||(a[3]=o=>l.form.user.tel=o)},null,8,["class","modelValue"]),n(_,{name:"電話",class:"invalid-feedback"})]),t("div",Z,[tt,n(p,{id:"address",name:"地址",type:"text",class:b(["form-control",{"is-invalid":s.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:l.form.user.address,"onUpdate:modelValue":a[4]||(a[4]=o=>l.form.user.address=o)},null,8,["class","modelValue"]),n(_,{name:"地址",class:"invalid-feedback"})]),t("div",et,[st,y(t("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":a[5]||(a[5]=o=>l.form.message=o)},null,512),[[C,l.form.message]])]),at]),_:1},8,["onSubmit"])])])],64)}const nt=x(q,[["render",ot]]);export{nt as default};