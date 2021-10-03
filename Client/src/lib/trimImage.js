export const imageTrim = (image) => {
	let img = image?.substring(image.lastIndexOf('/') + 1, image.length);
	return img;
};
