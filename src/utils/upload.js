const OSS = require('ali-oss')
const moment = require('moment')

const env = process.env.NODE_ENV

let client = null
let expirationTime = null

const bucket = {
	development: '',
	dev: '',
	pre: '',
	beta: '',
	production: ''
}

const OssCredentials = {
	AccessKeyID: '',
	AccessKeySecret: '',
	ExpirationTime: 5 * 60 * 1000,
}

function initOssClient(accessKeyId, accessKeySecret, expiration) {
	console.log(bucket[`${env}`])
	client = new OSS({
		endpoint: 'oss-cn-chengdu.aliyuncs.com',
		//secure: true,
		accessKeyId,
		accessKeySecret,
		region: 'oss-cn-chengdu',
		bucket: bucket[`${env}`]
	});
	expirationTime = expiration
	return client
}

function checkOssClient(){
	const current = moment()
	return moment(expirationTime).diff(current) < 0 ? null : client
}

async function imgUpload(opt){
	if(opt.file.size > 1024 * 1024) {
		return
	}
	const tmp = opt.file.name.split('.')
	const extname = tmp.pop()
	const extList = ['jpg', 'jpeg', 'png', 'gif']
	const isValid = extList.includes(extname)
	if(!isValid){
		return
	}
	
	let client = checkOssClient()
	if(client === null){
		client = initOssClient(
			OssCredentials.AccessKeyID,
			OssCredentials.AccessKeySecret,
			OssCredentials.ExpirationTime
		)
	}
	
	const randomName = moment(new Date()).valueOf()
	const path = `oss/tmpImg/${randomName}.${extname}`
	let url 
	try {
		const res = await client.multipartUpload(path, opt.file, {
			progress: async function(p) {
				let e = {};
				e.percent = p * 100;
				opt.onProgress(e);
			},
		})
		const ossPath = res.res.requestUrls[0].split('?')[0]
		url = ossPath.replace('http://', 'https://')
	}catch(e){
		console.log(e)
	}
	return url
}

function destoryOssClient(){
	client = null
}

export default {
	imgUpload, destoryOssClient
}