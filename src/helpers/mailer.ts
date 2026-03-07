import nodemailer from 'nodemailer'
import { User } from '@/models/user.model'
import bcrypt from 'bcryptjs'
import { Html } from 'next/document'

export const sendEmail = async({email,emailType,userId} : any)=>{
    try {
        const hashedToken=await bcrypt.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,{
             verifyToken:hashedToken,
             verifyTokenExpiry: Date.now() + 360000,
        },{
          new: true,
          runValidators:true  
        })
    } else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 360000,
        },{
          new: true,
          runValidators:true  
        })
    }
    const trasporter=nodemailer.createTransport({
        // Looking to send emails in production? Check out our Email API/SMTP product!
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "f76629f4e4693f",
       pass: "2cc5c5542ac559"
      }
    });
    const mailoptions={
        from: "rajpalvineet164@gmail.com",
        to : email,
        subject : emailType === "VERIFY" ? "verify your email" : "reset your password",
        html : `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link in your browser . <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}}</p>`
    }
   const mailresponse=  await  trasporter.sendMail(mailoptions);
   return mailoptions;
    } catch ( error : any) {
        throw new Error(error.message)
    }
}