import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();
const randomBytes = promisify(crypto.randomBytes);
const region = 'us-west-2';
const bucketName = 'wow-rosters';
const assignBucket = 'wow-rosters/assignments';
const raidsBucket = 'wow-rosters/raids';
const accessKeyId = process.env.ACCESS_KEY_S3;
const secretAccessKey = process.env.SECRET_KEY_S3;

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4',
});

export const generateUploadURL = async () => {
	const rawBytes = await randomBytes(16);
	const imageName = rawBytes.toString('hex');

	const params = {
		Bucket: bucketName,
		Key: imageName,
		Expires: 400,
	};
	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
};

export const generateUploadURLAssign = async () => {
	const rawBytes = await randomBytes(16);
	const imageName = rawBytes.toString('hex');

	const params = {
		Bucket: assignBucket,
		Key: imageName,
		Expires: 400,
	};
	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
};

export const generateUploadURLRaids = async () => {
	const rawBytes = await randomBytes(16);
	const imageName = rawBytes.toString('hex');

	const params = {
		Bucket: raidsBucket,
		Key: imageName,
		Expires: 400,
	};
	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
};
