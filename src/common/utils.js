const U = {
  daysAgo: function(days, date = new Date()) {
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    return last;
  }
}

export default U;
