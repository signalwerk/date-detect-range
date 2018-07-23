import moment from 'moment';

export default class detectRange {

  constructor(dates) {
    this._and = " and ";
    this._to = " to ";
    this._format = "YYYY-MM-DD";
    this.dates = [];
    dates.forEach(item => this.dates.push(new Date(item)));
  }

  printDate(date) {
    return moment(date).format(this._format);
  }

  isFollowingDay(date1, date2) {
    var msBetween = date2.getTime() - date1.getTime();
    return (msBetween / 86400000 === 1);
  }

  isSameDay(date1, date2) {
    var msBetween = date2.getTime() - date1.getTime();
    return msBetween === 0;
  }

  format(config) {

    this._and = config.and || this._and;
    this._to = config.to || this._to;
    this._format = config.format || this._format;

    // no dates
    if (this.dates.length === 0) {
      return "";
    }

    // no ranges only one date
    if (this.dates.length === 1) {
      return this.printDate(this.dates[0]);
    }

    // if there are only two
    if (this.dates.length === 2) {
      return this.printDate(this.dates[0])  + this._and + this.printDate(this.dates[1]);
    }


    let dateRanges = [];
    let lastRange = {
      start: null,
      end: null,
    };

    this.dates.sort((a, b) => a - b)


    this.dates.forEach(item => {

      // set a start/end if its not set yet
      if(!lastRange.start) {
        lastRange.start = item;
        lastRange.end = item;
        return;
      }

      // if it's on the following day set the new enddate
      if(this.isFollowingDay(lastRange.end, item)) {
        lastRange.end = item;
        return;
      }

      // set new range if not following day!
      if(!this.isFollowingDay(lastRange.end, item)) {
        dateRanges.push(lastRange)
        lastRange = {
          start: item,
          end: item,
        };
        return;
      }


    })

    dateRanges.push(lastRange)

    // render ranges

    let output = [];

    dateRanges.forEach(item => {

      if (this.isSameDay(item.start, item.end)) {
        output.push(this.printDate(item.start))
        return
      }
      if (this.isFollowingDay(item.start, item.end)) {
        output.push(this.printDate(item.start));
        output.push(this.printDate(item.end));
        return
      }

      output.push(this.printDate(item.start) +  this._to  + this.printDate(item.end))
    })

    return output.join(", ");

  }

}
