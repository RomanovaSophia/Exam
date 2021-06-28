//БД
const host = "http://127.0.0.1:8000/api";

const app = new Vue({
    el: "#app",
    data: {
        services: [],
        reviews: [],
        errors: [],
        form: {
            name: null,
            number: null,
            email: null,
            service: null,
            date: null,
            time: null,
        },
        success: false,
    },
    mounted() {
        this.getAllPosts();
        this.getAllReviews();
    },
    methods: {
        async fetchAll(apikey) {
            const response = await fetch(host + apikey);
            return await response.json();
        },
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            return array;
        },
        async getAllPosts() {
            this.services = await this.fetchAll("/services");
            console.log(this.services);
        },
        async getAllReviews() {
            this.reviews = await this.fetchAll("/reviews");
            this.reviews = this.shuffle(this.reviews);
            console.log(this.reviews);
        },
        checkForm: function(e) {
            if (this.name && this.age) return true;
            this.errors = [];
            if (!this.form.name) this.errors.push("Имя обязательно");
            if (!this.form.number) this.errors.push("Номер обязателен");
            if (!this.form.email) this.errors.push("Почта обязателен");
            if (!this.form.service) this.errors.push("Услуга обязательна");
            if (!this.form.date) this.errors.push("Дата обязательна");
            if (!this.form.time) this.errors.push("Время обязательно");
            if (!this.errors.length > 0) this.createRequest();
        },
        createRequest() {
            let formData = new FormData();
            let daterecord = this.form.date + " " + this.form.time;
            formData.append("name", this.form.name);
            formData.append("phone_number", this.form.number);
            formData.append("email", this.form.email);
            formData.append("service", this.form.service);
            formData.append("date_record", daterecord);
            fetch(host + "/record", {
                method: "POST",
                body: formData,
            }).then((res) => {
                if (res.status === 201) {
                    this.success = true;
                }
            });
            console.log(FormData);
            document.body.style.overflow = "visible";
            document.querySelector("#openModal4").style.marginLeft = "0px";
        },
        succesclose() {
            this.success = false;
        },
    },
});