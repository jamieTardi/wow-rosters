export const minutes = [];
for (let i = 0; i < 60; i++) {
	let stringI = i.toString();
	if (i < 10) {
		minutes.push('0' + stringI);
	} else {
		minutes.push(stringI);
	}
}

export const hours = [];
for (let i = 0; i < 24; i++) {
	let stringI = i.toString();
	if (i < 10) {
		hours.push('0' + stringI);
	} else {
		hours.push(stringI);
	}
}
