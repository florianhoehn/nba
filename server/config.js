module.exports = {
  port: 50000,
	mongo_url: 'mongodb://127.0.0.1:27017/nba',
  xmlstats: {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 86cc421c-5fe8-45ab-93b2-8160acdfa75f',
			'User-Agent': 'elparask@gmail.com'
		},
		events: function(date) {
			return 'https://erikberg.com/events.json?date=' + date + '&sport=nba';
		}
	}
};