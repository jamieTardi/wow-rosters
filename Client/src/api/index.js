import axios from 'axios';

const url = 'http://localhost:5000/raids';
const rosterUrl = 'http://localhost:5000/roster';

export let deleteRes = null;

export const fetchRaids = () => axios.get(url);

export const createRaid = (newRaid) =>
	axios.post(url, newRaid).then((res) => console.log(res));

export const updateRaid = (id, updatedRaid) => {
	axios.patch(`${url}/${id}`, updatedRaid);
};

export const deleteRaid = (id) => {
	axios
		.delete(`${url}/${id}`)
		.then((res) => {
			const { data } = res;
			return (deleteRes = data);
		})

		.catch((err) => console.log(err));
};

export const fetchRoster = () => axios.get(rosterUrl);

export const createRoster = (newRoster) => axios.post(rosterUrl, newRoster);
