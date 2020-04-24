const User = require('../../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const {
    validationResult
} = require('express-validator');

let transporter = nodemailer.createTransport({
    name: "dcubetechnologies.com",
    host: "mail.dcubetechnologies.com",
    port: 587,
    secure: false, // use TLS
    auth: {
        user: "jagjot@dcubetechnologies.com",
        pass: "Dairymilk@1"
    },
    tls: {
        rejectUnauthorized: false
    }
})

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0]
            error.status = false
            error.param = undefined
            error.location = undefined
            return res.send(error)
        }
        const {
            email,
            password,
            zipCode
        } = req.body;
        if (!zipCode) {
            return res.send({ msg: "Zipcode is required." })
        }
        const isMatch = await User.findOne({
            email
        });
        if (isMatch) {
            return res.send({
                msg: "User already exist. Please login with your email and password.",
                status: false
            })
        }
        // let token = Math.floor(1000 + Math.random() * 9000);
        const hash = await bcrypt.hash(password, 12)
        let newUser = new User({
            email,
            password: hash,
            zipCode
        });
        const user = await newUser.save()

        // await transporter.sendMail({
        //     to: email,
        //     from: "dcubedeveloper123@gmail.com",
        //     subject: "Verification Code",
        //     html: `<!doctype html><html><head> <meta name="viewport" content="width=device-width"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>NudgeAr</title> <style>img{border: none; -ms-interpolation-mode: bicubic; max-width: 100%}body{background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%}table{border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%}table td{font-family: sans-serif; font-size: 14px; vertical-align: top}.body{background-color: #f6f6f6; width: 100%}.container{display: block; margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px}.content{box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px}.main{background: #fff; border-radius: 3px; width: 100%}.wrapper{box-sizing: border-box; padding: 20px}.content-block{padding-bottom: 10px; padding-top: 10px}.footer{clear: both; margin-top: 10px; text-align: center; width: 100%}.footer td, .footer p, .footer span, .footer a{color: #999; font-size: 12px; text-align: center}h1, h2, h3, h4{color: #000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px}h1{font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize}p, ul, ol{font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px}p li, ul li, ol li{list-style-position: inside; margin-left: 5px}a{color: #3498db; text-decoration: underline}.btn{box-sizing: border-box; width: 100%}.btn>tbody>tr>td{padding-bottom: 15px}.btn table{width: auto}.btn table td{background-color: #fff; border-radius: 5px; text-align: center}.btn a{background-color: #fff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize}.btn-primary table td{background-color: #3498db}.btn-primary a{background-color: #3498db; border-color: #3498db; color: #fff}.last{margin-bottom: 0}.first{margin-top: 0}.align-center{text-align: center}.align-right{text-align: right}.align-left{text-align: left}.clear{clear: both}.mt0{margin-top: 0}.mb0{margin-bottom: 0}.preheader{color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0}.powered-by a{text-decoration: none}hr{border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0}@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important}table[class=body] .content{padding: 0 !important}table[class=body] .container{padding: 0 !important; width: 100% !important}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important}table[class=body] .btn table{width: 100% !important}table[class=body] .btn a{width: 100% !important}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important}}@media all{.ExternalClass{width: 100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important}#MessageViewBody a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit}.btn-primary table td:hover{background-color: #34495e !important}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important}}</style></head><body class=""> <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td><td class="container"> <div class="content"> <table role="presentation" class="main"> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>Hi there,</p><p> Please confirm your email address through verification code below.</p><table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <h2> ${token}</h2></tr></tbody> </table> </td></tr></tbody> </table> <p>We may need to send you critical information about our service and it is important that we have an accurate email address.</p></td></tr></table> </td></tr></table> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <b>Proof of price</b> <span class="apple-link">Support Team</span> <br>201 W Main Street Durham, NC 27701</td></tr><tr> <td class="content-block powered-by"> Powered by <a href="https://www.nudge-ar.com/">Proof of price</a>.</td></tr></table> </div></div></td><td>&nbsp;</td></tr></table></body></html>`
        // });

        return res.send({
            data: user,
            status: true
        })
    } catch (err) {
        console.log(err);
        res.json({
            msg: "Internal server error.",
            status: false
        });
    }
}

// exports.confirmEmail = async (req, res) => {
//     const {
//         confirm_token
//     } = req.body;
//     try {
//         const user = await User.findOne({
//             confirm_token
//         }).select('-password');

//         if (!user) {
//             return res.json({
//                 msg: "User verification code is incorrect.",
//                 status: false
//             });
//         }
//         const token = jwt.sign({
//             user: user.email
//         }, 'jhzodiackey')

//         if (user.confirm_token === confirm_token) {
//             user.confirm_token = undefined;
//             user.auth_token = token
//             user.isVerified = true
//             const u = await user.save();
//             return res.json({ data: u, status: true });
//         }

//     } catch (err) {
//         console.log(err);
//         res.json({
//             msg: "Internal server error.",
//             status: false
//         });
//     }
// };

exports.signin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0]
            error.status = false
            error.param = undefined
            error.location = undefined
            return res.send(error)
        }
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.send({
                msg: "The email you entered is incorrect.",
                status: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.send({
                msg: "The password you entered is incorrect.",
                status: false
            })
        }
        const token = jwt.sign({
            user: email
        }, 'jhzodiackey')
        user.auth_token = token
        const us = await user.save()

        return res.send({
            data: us,
            status: true
        })
    } catch (err) {
        console.log(err);
        res.json({
            msg: "Internal server error.",
            status: false
        });
    }
}

exports.resetPassword = async (req, res) => {
    const {
        email
    } = req.body;
    try {
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.json({
                msg: "Incorrect email!",
                status: false
            });
        }

        let token = Math.floor(1000 + Math.random() * 9000);

        await transporter.sendMail({
            to: email,
            from: "kunalkumar@dcubetechnologies.com",
            subject: "Reset Password Code",
            html: `<!doctype html><html><head> <meta name="viewport" content="width=device-width"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>NudgeAr</title> <style>img{border: none; -ms-interpolation-mode: bicubic; max-width: 100%}body{background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%}table{border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%}table td{font-family: sans-serif; font-size: 14px; vertical-align: top}.body{background-color: #f6f6f6; width: 100%}.container{display: block; margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px}.content{box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px}.main{background: #fff; border-radius: 3px; width: 100%}.wrapper{box-sizing: border-box; padding: 20px}.content-block{padding-bottom: 10px; padding-top: 10px}.footer{clear: both; margin-top: 10px; text-align: center; width: 100%}.footer td, .footer p, .footer span, .footer a{color: #999; font-size: 12px; text-align: center}h1, h2, h3, h4{color: #000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px}h1{font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize}p, ul, ol{font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px}p li, ul li, ol li{list-style-position: inside; margin-left: 5px}a{color: #3498db; text-decoration: underline}.btn{box-sizing: border-box; width: 100%}.btn>tbody>tr>td{padding-bottom: 15px}.btn table{width: auto}.btn table td{background-color: #fff; border-radius: 5px; text-align: center}.btn a{background-color: #fff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize}.btn-primary table td{background-color: #3498db}.btn-primary a{background-color: #3498db; border-color: #3498db; color: #fff}.last{margin-bottom: 0}.first{margin-top: 0}.align-center{text-align: center}.align-right{text-align: right}.align-left{text-align: left}.clear{clear: both}.mt0{margin-top: 0}.mb0{margin-bottom: 0}.preheader{color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0}.powered-by a{text-decoration: none}hr{border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0}@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important}table[class=body] .content{padding: 0 !important}table[class=body] .container{padding: 0 !important; width: 100% !important}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important}table[class=body] .btn table{width: 100% !important}table[class=body] .btn a{width: 100% !important}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important}}@media all{.ExternalClass{width: 100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important}#MessageViewBody a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit}.btn-primary table td:hover{background-color: #34495e !important}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important}}</style></head><body class=""> <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td><td class="container"> <div class="content"> <table role="presentation" class="main"> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>Hi there,</p><p> You requested a password reset for your account. Your reset password code is given bilow.</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" class=""> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <h2> ${token}</h2></tr></tbody> </table> </td></tr></tbody> </table> <p>If you did not requested a password, please ignore this email. reply to let us know. this password is only valid for the next 60 minutes.</p><p> Thanks,</p><p>Proof of price Team</p></td></tr></table> </td></tr></table> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <b>Proof of price</b> <span class="apple-link">Support Team</span> <br>Don't like these emails? <a href="#">Unsubscribe</a>.</td></tr><tr> <td class="content-block powered-by"> Powered by <a href="">Proof of price</a>.</td></tr></table> </div></div></td><td>&nbsp;</td></tr></table></body></html>`
        });
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
        return res.send({
            msg: "Please check your email, We will send you reset code!",
            token: token,
            status: true
        })

    } catch (err) {
        console.log(err);
        res.json({
            msg: "Internal server error.",
            status: false
        });
    }
};

exports.addNewPassword = async (req, res) => {
    const {
        resetToken,
        password
    } = req.body;

    if (!resetToken || !password) {
        return res.json({
            msg: "Please fill all the fields.",
            status: false
        });
    }

    try {
        const user = await User.findOne({
            resetToken
        });

        if (!user) {
            return res.json({
                msg: "Incorrect token.",
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        return res.json({
            msg: "Your password is changed.",
            status: true
        });

    } catch (err) {
        console.log(err);
        res.json({
            msg: "Internal server error.",
            status: false
        });
    }

}