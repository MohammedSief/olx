const nodeoutlook = require('nodejs-nodemailer-outlook')

function sendEmail(res, destination, message) {

    try {
        nodeoutlook.sendEmail({
            auth: {
                user: process.env.senderEmail,
                pass: process.env.senderPassword
            },
            from: process.env.senderEmail,
            to: destination,
            subject: 'Welcome New User!',
            html: message,
            text: 'This is text version!',
            /*replyTo: 'receiverXXX@gmail.com',*/

            /*
            attachments: [
                                {
                                    filename: 'text1.txt',
                                    content: 'hello world!'
                                },
                                {   // binary buffer as an attachment
                                    filename: 'text2.txt',
                                    content: new Buffer('hello world!','utf-8')
                                },
                                {   // file on disk as an attachment
                                    filename: 'text3.txt',
                                    path: '/path/to/file.txt' // stream this file
                                },
                                {   // filename and content type is derived from path
                                    path: '/path/to/file.txt'
                                },
                                {   // stream as an attachment
                                    filename: 'text4.txt',
                                    content: fs.createReadStream('file.txt')
                                },
                                {   // define custom content type for the attachment
                                    filename: 'text.bin',
                                    content: 'hello world!',
                                    contentType: 'text/plain'
                                },
                                {   // use URL as an attachment
                                    filename: 'license.txt',
                                    path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                                },
                                {   // encoded string as an attachment
                                    filename: 'text1.txt',
                                    content: 'aGVsbG8gd29ybGQh',
                                    encoding: 'base64'
                                },
                                {   // data uri as an attachment
                                    path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
                                },
                                {
                                    // use pregenerated MIME node
                                    raw: 'Content-Type: text/plain\r\n' +
                                         'Content-Disposition: attachment;\r\n' +
                                         '\r\n' +
                                         'Hello world!'
                                }
                            ],
                            */
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i),
        }
        );

        console.log("confirmation Email >>> Sent");
        

    } catch (error) {
        res.json({ message: 'Error in email confirmation', error });
        console.log(`Error in email confirmation: ${error}`);
    }


}


module.exports = sendEmail