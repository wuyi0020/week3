<template>
    <div class="container">
        <div class="row">
            <div v-if="products.length" class="col">
                <h1>
                    編輯購買硬幣
                </h1>
            </div>
            <div v-else class="d-flex align-items-center justify-content-center">
                <strong>Loading... </strong>
                <div class="spinner-border" role="status" aria-hidden="true"></div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div v-if="products.length" class="col-6 mb-1">
                <div class=" card text-center border-dark">
                    <div class="card-header user-select-none" data-bs-toggle="collapse" data-bs-target="#addItemCollapse"
                        aria-controls="addItemCollapse" role="button" aria-expanded="false">新增商品</div>
                    <div class="card-body collapse" id="addItemCollapse">
                        <div class="input-group mb-3 col">
                            <div class="input-group-prepend">
                                <span class="input-group-text" :id="`add_title`">標題</span>
                            </div>
                            <input type="text" class="form-control" aria-label="標題" :aria-describedby="`add_title`"
                                v-model="addItem.title">
                        </div>
                        <div class="input-group mb-3 col">
                            <div class="input-group-prepend">
                                <span class="input-group-text" :id="`add_imageUrl`">圖片網址</span>
                            </div>
                            <input type="text" class="form-control" aria-label="圖片網址" :aria-describedby="`add_imageUrl`"
                                v-model="addItem.imageUrl">
                        </div>
                        <img :src=addItem.imageUrl alt="">
                        <div class="input-group mb-3 col">
                            <div class="input-group-prepend">
                                <span class="input-group-text" :id="`add_content`">內容</span>
                            </div>
                            <input type="text" class="form-control" aria-label="內容" :aria-describedby="`add_content`"
                                v-model="addItem.content">
                        </div>
                        <div class="row ">
                            <div class="input-group mb-3 col">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" :id="`add_origin_price`">原價</span>
                                </div>
                                <input type="number" class="form-control" aria-label="原價"
                                    :aria-describedby="`add_origin_price`" v-model="addItem.origin_price">
                            </div>
                            <div class="input-group mb-3 col">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" :id="`add_price`">現價</span>
                                </div>
                                <input type="number" class="form-control" aria-label="現價" :aria-describedby="`add_price`"
                                    v-model="addItem.price">
                            </div>
                        </div>
                        <div>
                            <button key="確定" class="btn btn-outline-success" @click="AddItem()">確定新增</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4" v-for="(item) in products" :key="item.id">
                <div class="card text-center border-dark mb-3">
                    <div class="input-group card-header mb-3" v-if="edittingList[item.id]">
                        <div class="input-group-prepend">
                            <span class="input-group-text" :id="`${item.id}_title`">標題</span>
                        </div>
                        <input type="text" class="form-control" :placeholder="item.title" aria-label="標題"
                            :aria-describedby="`${item.id}_title`" v-model="editItem[item.id].title">
                    </div>
                    <h2 v-else class="card-header">{{ item.title }}</h2>
                    <div class="card-body">
                        <div class="input-group mb-3" v-if="edittingList[item.id]">
                            <div class="input-group-prepend">
                                <span class="input-group-text" :id="`${item.id}_imageUrl`">圖片網址</span>
                            </div>
                            <input type="text" class="form-control" :placeholder="item.imageUrl" aria-label="圖片網址"
                                :aria-describedby="`${item.id}_imageUrl`" v-model="editItem[item.id].imageUrl">
                        </div>
                        <img v-if="edittingList[item.id]" :src=editItem[item.id].imageUrl alt="">
                        <img v-else :src=item.imageUrl alt="" class="coin card-img-top">

                        <div class="input-group mb-3" v-if="edittingList[item.id]">
                            <div class="input-group-prepend">
                                <span class="input-group-text" :id="`${item.id}_content`">內容</span>
                            </div>
                            <input type="text" class="form-control" :placeholder="item.content" aria-label="內容"
                                :aria-describedby="`${item.id}_content`" v-model="editItem[item.id].content">
                        </div>
                        <div v-else>{{ item.content }}</div>
                        <div class="row ">
                            <div class="input-group mb-3 col" v-if="edittingList[item.id]">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" :id="`${item.id}_origin_price`">原價</span>
                                </div>
                                <input type="text" class="form-control" :placeholder="item.origin_price" aria-label="原價"
                                    :aria-describedby="`${item.id}_origin_price`" v-model="editItem[item.id].origin_price">
                            </div>
                            <del v-else class="col card-text">原價:{{ item.origin_price }}</del>
                            <div class="input-group mb-3 col" v-if="edittingList[item.id]">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" :id="`${item.id}_price`">現價</span>
                                </div>
                                <input type="text" class="form-control" :placeholder="item.origin_price" aria-label="現價"
                                    :aria-describedby="`${item.id}_price`" v-model="editItem[item.id].price">
                            </div>
                            <div v-else class="col card-text">現價:{{ item.price }}</div>
                        </div>
                        <div>
                            <button v-if="!edittingList[item.id]" key="修改" class="btn btn-outline-success"
                                @click="editProduct(item)">修改</button>
                            <button v-if="edittingList[item.id]" key="取消" class="btn btn-outline-success"
                                @click="editProductCancel(item.id)">取消</button>
                            <button v-if="edittingList[item.id]" key="確定" class="btn btn-outline-success"
                                @click="editProductDone(item.id)">確定</button>
                            <button class="btn btn-outline-danger" @click="delProduct(item.id)">刪除</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<!-- <script src="../buycoin.js" type="module"></script> -->
<script>
import axios from "axios";



export default {
    name: "WokerView",
    components: {},
    data() {
        return {
            apiUrl: "https://vue3-course-api.hexschool.io/v2",
            apiPath: "wuyi0020",
            products: [],
            edittingList: {},
            editItem: {},
            addItem: {
                title: "",
                category: "coin",
                content: "",
                description: "",
                imageUrl: "",
                imagesUrl: [],
                is_enabled: 1,
                origin_price: 0,
                price: 0,
                unit: "TWD"
            }
        };
    },
    methods: {
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios
                .post(url)
                .then(() => {
                    this.getcoinData();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    this.$router.push("/login");
                });
        },
        getcoinData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?category=coin`;
            axios
                .get(url)
                .then((response) => {
                    this.products = response.data.products;
                    console.log(this.products);
                    this.products.sort((a, b) => {
                        return a.description > b.description ? 1 : -1;
                    })
                    this.products.forEach(element => {
                        let id = element.id;
                        this.edittingList[id] = false;
                    });
                    console.log(this.edittingList);
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
        openProduct(item) {
            this.tempProduct = item;
        },
        editProduct(item) {
            this.edittingList[item.id] = !this.edittingList[item.id];
            this.editItem[item.id] = { ...item };
        },
        editProductCancel(id) {
            this.edittingList[id] = !this.edittingList[id];
            this.editItem[id] = "";
        },
        editProductDone(id) {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
            this.edittingList[id] = !this.edittingList[id];
            let putItem ;
            console.log(this.editItem[id]);
            putItem = {...this.editItem[id]};
            delete putItem.id;
            console.log(putItem);
            axios.put(url,{data : putItem} )
                .then((response) =>{
                    console.log(response);
                    this.getcoinData();
                })
                .catch((err)=>{
                    console.log(err);
                    alert(err.response);
                })
            console.log(this.editItem[id]);
        },
        AddItem() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            this.addItem.description = `${this.products.length + 1}`
            let data = {};
            data["data"] = { ...this.addItem };
            console.log(this.addItem);
            console.log(data["data"]);
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    this.getcoinData();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
        delProduct(id) {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
            axios.delete(url)
                .then((res) => {
                    console.log(res);
                    this.getcoinData();
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
                });
        }
    },
    mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
    },
};
</script>
