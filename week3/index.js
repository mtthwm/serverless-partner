const { BlobServiceClient } = require("@azure/storage-blob");
var multipart = require("parse-multipart")


async function upload(req) {
    try {
        
        var boundary = multipart.getBoundary(req.headers['content-type']);
        var body = req.body;

        var parsedBody = multipart.Parse(body, boundary);
        console.log(parsedBody);

        var fileName = parsedBody[0].filename;

        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        // Create a unique name for the container
        const containerName = "serverlesspartner";

        console.log('\nCreating container...');
        console.log('\t', containerName);

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Create the container
        const blobName = fileName

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log('\nUploading to Azure storage as blob:\n\t', blobName);

        // Upload data to the blob
        const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
        const responseMessage = 'uploaded'
        return responseMessage;
    } catch (err) {
        console.log(err)
        console.log("Undefined body image")
        const responseMessage = 'Sorry! No image attached.'
        return responseMessage;
    }
}

async function download(req) {
    const filename = req.headers.filename;
    var responseMessage = '';
    if (!filename) {
        responseMessage = 'No filename'
        return responseMessage
    }
    const password = req.headers.password;
    if (password != 'password') {
        responseMessage = 'Wrong password'
        return responseMessage
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient("serverlesspartner");
    
    const file = containerClient.getBlockBlobClient(filename);
    const fileExists = await file.exists();
    if (fileExists) {
        return file.url
    } else {
        return "The file doesn't exist"
    }
}


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let output;
    if (req.method == 'POST') {
        output = await upload(req);
    }
    else {
        output = await download(req);
    }


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: output
    };
}