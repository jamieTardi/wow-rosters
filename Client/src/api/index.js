import axios from 'axios';
import { imageURL } from '../constants/general';
import {
	IS_NOT_LOADING,
	AUTH,
	CURRENT_USER,
	LOGOUT,
} from '../constants/actionTypes';

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

export const createRaid = (newRaid, isLoading, dispatch) =>
	API.post('/raids', newRaid);

export const updateRaid = (id, updatedRaid, dispatch) => {
	API.patch(`/raids/${id}`, updatedRaid)
		.then((res) => dispatch({ type: 'UPDATE_RAID', payload: res.data }))
		.then(() => dispatch({ type: IS_NOT_LOADING }))
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

export const createAssignment = (newAssignment) =>
	API.post('/create-assignment', newAssignment);

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

export const updateUser = (id, userData, setServerMsg, dispatch, history) => {
	API.patch(`/user/users/${id}`, userData)
		.then((res) => dispatch({ type: CURRENT_USER, payload: res.data }))
		.then((res) => console.log(res.data))
		.then((res) => {
			setServerMsg(res);
		})
		.then(() => dispatch({ type: LOGOUT }))
		.then(() => history.push('/'))
		.then(() => history.go(0))

		.catch((err) => setServerMsg(err.response));
};

export const updateMember = (id, member, setServerRes, userData) => {
	API.patch(`/user/users/${id}`, member)
		.then((res) => setServerRes(null))
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
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
				selectedFile: `${imageURL}/images/${res.data}`,
			}),
		)
		.catch((err) => console.log(err));
};

//Guilds

export const createGuild = (guild, setError, setResponse) =>
	API.post('/guilds', guild)
		.then((res) => console.log(res))
		.then(() => setResponse(true))
		.catch((err) => setError(err.response.data.message));

export const fetchGuilds = () => API.get('/guilds');

export const updateGuild = (id, guild, setGuidRes) => {
	API.patch(`/guilds/${id}`, guild)
		.then((res) => console.log(res))
		.catch((res) => console.log(res));
};
