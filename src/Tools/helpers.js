
const helpers = {
    //source: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
    groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    },

    //source: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
    sort(arr) {
        return arr.sort((a, b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0));
    },

    groupAndSortHistoryData(data, sortBy){
        // sort by endDate desc (for time entries to be in order inside groups)
        let sortedData = data.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0)); 
        // group by endDate
        let groupedData = this.groupBy(sortedData, (sd) => new Date(sd.endDate).toLocaleDateString()); 
        // sort groupings by endDate desc
        return Object.entries(groupedData).sort((a, b) => (a[0] < b[0]) ? 1 : ((b[0] < a[0]) ? -1 : 0)); 
    },
      
    padTo2Digits(num){
        return num.toString().padStart(2, '0');
    },

    convertMs(milliseconds){
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        return {seconds: seconds, minutes: minutes, hours:hours}
    },

    convertDateToTime(date) {
        let result = this.convertMs(new Date(date).getTime());
        let pm = false;

        if(result.hours > 12){
            result.hours = result.hours%12
            pm = true;
        }
        
        return `${this.padTo2Digits(result.hours)}:${this.padTo2Digits(result.minutes)} ${pm ? "pm" : "am"}`;
    },

    getDuration(startDate, endDate){
        if(endDate >= startDate){
            let duration = this.convertMs(Math.abs(new Date(endDate) - new Date(startDate)));
            return `${this.padTo2Digits(duration.hours)}:${this.padTo2Digits(duration.minutes)}:${this.padTo2Digits(duration.seconds)}`;
        }

        return `date data issue`;
    }
}

export default helpers;