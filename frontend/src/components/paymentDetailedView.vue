<template>
    <div>
        <div class="container">

            <li v-if="payments.length>0" v-for="payment in payments">
                <paymentCard class="card-block" :payment="payment"></paymentCard>
            </li>

            <div v-if="errors.length > 0">
                <div class="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong>
                    <div v-for="error in errors">
                        {{error.type}} : {{ error.msg }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    var url = require('./env.js').HostURL;
    import PaymentCard from './paymentCard';

    export default {
        name: 'PaymentPage',
        props:['startP','endP'],
        components: {
            paymentCard: PaymentCard
        },
        data() {
            return {
                payments: [],
                errors: []
            }
        },
        created: function () {
            var context = this;
            this.startP();
            this.$http.get(url + '/businessOperator/payments')
                .then(function (res) {
                    this.endP();
                    if (res.data.errors) {
                        this.errors = res.data.errors;
                    } else {
                        this.payments = res.data.data.payments;
                    }
                }, (err) => {
							context.errors = "Internal Server Error";
						});
        }

    }
</script>