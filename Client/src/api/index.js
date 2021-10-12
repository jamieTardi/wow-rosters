import axios from 'axios';
import { imageURL, imageURLLive } from '../constants/general';

const API = axios.create({ baseURL: 'https://wow-rosters.herokuapp.com' });
// const API = axios.create({ baseURL: 'http://localhost:5000' });

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

export const createRaid = (newRaid, isLoading) =>
	API.post('/raids', newRaid).then(() => isLoading(false));

export const updateRaid = (id, updatedRaid, dispatch) => {
	API.patch(`/raids/${id}`, updatedRaid).then((res) =>
		dispatch({ type: 'UPDATE_RAID', payload: res.data }),
	);
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

export const updateAssignments = (assignment, id, isLoading) => {
	API.patch(`/create-assignment/${id}`, assignment)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => console.log(err));
};

export const deleteAssignment = (id, isLoading) => {
	API.delete(`/create-assignment/${id}`)
		.then(() => {
			isLoading(false);
		})
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

export const updateUser = (id, userData, setServerMsg) => {
	API.patch(`/user/users/${id}`, userData)
		.then((res) => {
			setServerMsg(res);
		})
		.catch((err) => setServerMsg(err.response));
};

export const getAllUsers = (setAllUsers) => {
	API.get('/user/users')
		.then((res) => {
			const { data } = res;
			setAllUsers(data);
		})
		.catch((err) => console.log(err));
};

//Image handling

export const deleteImage = (img) => {
	API.delete(`/uploads`, { data: { image: img } })
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

export const createImage = (data, setRaidForm, raidForm) => {
	API.post(`/uploads`, data)
		.then((res) =>
			setRaidForm({
				...raidForm,
				selectedFile: `${imageURLLive}/images/${res.data}`,
			}),
		)
		.catch((err) => console.log(err));
};

export const createImageAssign = (data, setNewTactics, newTactics) => {
	API.post(`/uploads`, data)
		.then((res) =>
			setNewTactics({
				...newTactics,
				image: `${imageURLLive}/images/${res.data}`,
			}),
		)
		.catch((err) => console.log(err));
};
