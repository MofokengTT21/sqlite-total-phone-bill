document.addEventListener('alpine:init', () => {
    Alpine.data('phoneBillCalculator', () => ({
        pricePlans: [],
        pricePlan: '',
        smsCount: 0,
        callDurationSeconds: 0,
        callInProgress: false,
        callTimerInterval: null,
        totalBill: null,
        pricePlanName: '',
        smsPrice: '',
        callPrice: '',
        editingPlanId: null,
        totalCallDurationSeconds: 0,
        isAdmin: false,
        apiUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
                ? 'http://localhost:3000' 
                : 'https://phone-bill-calc.vercel.app',

        init() {
            this.fetchPricePlans();
        },

        async fetchPricePlans() {
            const response = await axios.get(`${this.apiUrl}/price_plans`);
            this.pricePlans = response.data.pricePlans;
        },

        selectPricePlan(plan) {
            if (this.callInProgress) {
                this.stopCallTimer();
            }
            this.pricePlan = plan.plan_name;
            this.pricePlanName = plan.plan_name;
            this.smsPrice = plan.sms_price;
            this.callPrice = plan.call_price;
            this.editingPlanId = plan.id;
            this.totalBill = null;
            this.smsCount = 0;
            this.totalCallDurationSeconds = 0;
        },

        startCallTimer() {
            this.callInProgress = true;
            this.callDurationSeconds = 0;
            this.callTimerInterval = setInterval(() => {
                this.callDurationSeconds++;
                this.totalCallDurationSeconds++;
            }, 1000);
        },

        stopCallTimer() {
            clearInterval(this.callTimerInterval);
            this.callInProgress = false;
            this.callDurationSeconds = 0;
        },

        incrementSmsCount() {
            this.smsCount++;
        },

        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        },

        async calculateBill() {
            if (!this.pricePlan) {
                alert('Please select a price plan.');
                return;
            }
            try {
                const response = await axios.post(`${this.apiUrl}/api/phonebill/`, {
                    price_plan: this.pricePlan,
                    smsCount: this.smsCount,
                    callDurationSeconds: this.totalCallDurationSeconds
                });
                this.totalBill = response.data.total;
            } catch (error) {
                console.error('Error calculating bill:', error);
                alert('An error occurred. Please try again.');
            }
        },

        async savePricePlan() {
            try {
                if (this.editingPlanId) {
                    await axios.patch(`${this.apiUrl}/price_plans/${this.editingPlanId}`, {
                        plan_name: this.pricePlanName,
                        sms_price: this.smsPrice,
                        call_price: this.callPrice
                    });
                } else {
                    await axios.post(`${this.apiUrl}/price_plans`, {
                        plan_name: this.pricePlanName,
                        sms_price: this.smsPrice,
                        call_price: this.callPrice
                    });
                }
                this.fetchPricePlans();
                this.resetForm();
            } catch (error) {
                console.error('Error saving price plan:', error);
                alert('An error occurred. Please try again.');
            }
        },

        async deletePricePlan(id) {
            try {
                await axios.delete(`${this.apiUrl}/price_plans/${id}`);
                this.fetchPricePlans();
            } catch (error) {
                console.error('Error deleting price plan:', error);
                alert('An error occurred. Please try again.');
            }
        },

        resetForm() {
            this.pricePlanName = '';
            this.smsPrice = 0;
            this.callPrice = 0;
            this.editingPlanId = null;
        }
    }));
});
