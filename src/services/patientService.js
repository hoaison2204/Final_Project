import db from "../models/index";
require('dotenv').config();
import emailService from './emailService'
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Patient Hoai Son',
                    time: '8:00 Sunday',
                    doctorName: 'Doctor Hoai Son',
                    redirectLink: 'https://www.google.com'
                });
                //upset patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                })

                console.log('check user: ', user[0]);
                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save successfully!'
                })
            }
        } catch (e) {
            // console.log(e.message);
            // window.location.href = "https://stackoverflow.com/search?q=[Js]+" + e.message;
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}