import nodemailer from "nodemailer";
import User from "./user.model";
import bcrypjs from 'bcryptjs';

export const sendEmail = async ({email,emailType, userId}:any)=>{
    try {

//create hash token
        const hashedToken = await bcrypjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{ 
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "11fc4cd2b08269",
              pass: "4289ac27fb430e"
            
            }
          });

          const mailOptions = {
            from :"learncode973@gmail.com",
            to:email,
            subject:email ==="VERIFY"?"Verify Your email":'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}