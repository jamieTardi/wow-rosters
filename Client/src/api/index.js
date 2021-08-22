import axios from 'axios';

const url = 'http://localhost:5000/raids';

export const fetchRaids = () => axios.get(url);

export const createRaid = (newRaid) => axios.post(url, newRaid);
