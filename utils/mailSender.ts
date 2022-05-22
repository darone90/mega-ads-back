import {createTransport} from 'nodemailer';
import {appConfig} from "../app.config";


const transporter = createTransport({
    service: appConfig.mailService,
    auth: {
        user: appConfig.mailCli,
        pass: appConfig.mailPass
    }

})

export const sendActivationLink = (link: string, id: string):void => {
    const mail = {
        from: 'megaADS',
        to: 'developerdariusz@gmail.com',
        subject: 'Activation link for new Advertise i your portal!',
        text: `New Advertise await for your acceptation. Ad id: ${id}, activation link: ${appConfig.linksService}${appConfig.prefix}/activation/${link}
         Aby nie publikować i usunąć ogłoszenie kliknij w link: ${appConfig.linksService}${appConfig.prefix}/delete/${id}`
    };

    transporter.sendMail(mail, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info.response)
        }
    })
}