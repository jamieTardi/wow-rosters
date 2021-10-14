import aws from 'aws-sdk';

const region = 'us-west-2';
const bucketName = 'wow-rosters';
const accessKeyId = process.env.ACCESS_KEY_S3;
const secretAccessKey = process.env.SECRET_KEY_S3;

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: '4',
});
