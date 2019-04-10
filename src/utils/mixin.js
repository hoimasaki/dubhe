import CONFIG from '../../config';

export const refreshMixin = {
    mounted: function () {

        if (this.refresh) {
            this.refresh();
            this.intervalID = setInterval(this.refresh, CONFIG.INTERVAL_TIME);
        }
    },

    destroyed: function () {
        // console.log('销毁')
        // console.log(this.intervalID);
        if (this.intervalID) {
            window.clearInterval(this.intervalID);
        }
    }

};

export function createIntervalMixin(t, method) {
    return {
        created:function () {
            this.intervals = [];
        },
        mounted: function () {

            if (this[method]) {
                this[method]();
                this.intervals.push(setInterval(this[method], t));
            }
        },

        destroyed: function () {
            // console.log('销毁')
            // console.log(this.intervalID);
            this.intervals.map(clearInterval);
        }

    };

}