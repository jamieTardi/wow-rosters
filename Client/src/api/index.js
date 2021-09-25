import axios from 'axios';

// const API = axios.create({ baseURL: 'https://wow-rosters.herokuapp.com' });
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}

	return req;
});

export let deleteRes = null;

export const fetchRaids = () => API.get('/raids');

export const createRaid = (newRaid, setRaidCreateRes) =>
	API.post('/raids', newRaid).then((res) => setRaidCreateRes(res));

export const updateRaid = (id, updatedRaid) => {
	API.patch(`/raids/${id}`, updatedRaid)
		.then(() => console.log('Updated raid'))
		.catch((err) => console.log(err));
};

export const deleteRaid = (id, setDeleteRaid) => {
	API.delete(`/raids/${id}`)
		.then((res) => {
			res && setDeleteRaid(false);
		})

		.catch((err) => console.log(err));
};

//Roster routes

export const fetchRoster = () => API.get('/roster');

export const createRoster = (newRoster) => API.post('/roster', newRoster);

export const updateRoster = (newRoster, id, setIsLoading) => {
	API.patch(`/roster/${id}`, newRoster)
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));
};

//Assignments

export const fetchAssignments = () => API.get('/create-assignment');

export const createAssignment = (newAssignment) => {
	API.post('/create-assignment', newAssignment);
};

export const updateAssignments = (assignment, id) => {
	API.patch(`/create-assignment/${id}`, assignment)
		.then(() => console.log('update assingment'))
		.catch((err) => console.log(err));
};

//sign in routes

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//Users

export const fetchUsers = (setUserRes) =>
	API.get('/user/users')
		.then((res) => {
			setUserRes(res.data);
		})
		.catch((err) => {
			console.log(err);
		});

export const createGoogleUser = (googleUser) => {
	API.post('/user/google-sign-up', googleUser)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};
