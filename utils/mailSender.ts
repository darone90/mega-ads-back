import {createTransport} from 'nodemailer';

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'developerdariusz@gmail.com',
        pass: 'megakurs'
    }

})

export const sendActivationLink = (link: string, id: string):void => {
    const mail = {
        from: 'megaADS',
        to: 'developerdariusz@gmail.com',
        subject: 'Activation link for new Advertise i your portal!',
        text: `New Advertise await for your acceptation. Ad id: ${id}, activation link: http://localhost:3030/ad/activation/${link}
         Aby nie publikować i usunąć ogłoszenie kliknij w link: http://localhost:3030/ad/delete/${id}`
    };

    transporter.sendMail(mail, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info.response)
        }
    })
}