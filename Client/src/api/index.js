import axios from 'axios';

const url = 'http://localhost:5000/raids';
const rosterUrl = 'http://localhost:5000/roster';

export const fetchRaids = () => axios.get(url);

export const createRaid = (newRaid) =>
	axios.post(url, newRaid).then((res) => console.log(res));

export const fetchRoster = () => axios.get(rosterUrl);

export const createRoster = (newRoster) => axios.post(rosterUrl, newRoster);
