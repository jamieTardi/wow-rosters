import aws from 'aws-sdk';

const region = 'us-west-2';
const bucketName = 'wow-rosters';
const accessKeyId = '';
const secretAccessKey = '';

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: '4',
});
