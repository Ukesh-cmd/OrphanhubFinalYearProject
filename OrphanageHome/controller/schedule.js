const cron = require('node-cron');
const allocateDon = require('./allocationControler')
const { sendMail } = require('../helpers/sendMail')
const sponsor = require('./paymentController')




const scheduleMail=()=>{
  try{
    cron.schedule('*,*,*,*,*,*', async() => {
      try{
          await sponsor.reminderSponsor();

      }catch(err){
        console.log(err)
      }
    }, {
      scheduled: true,
      timezone: 'Asia/Kathmandu'
    });
  }catch(err){
    console.log(err)
  }
}

const allocate = () => {
  try {
   
   
      cron.schedule('30 50 7 * * *', async() => {
        try{
        await allocateDon.allocateDonation();
        await allocateDon.updateCat();
        console.log("called")
      }catch(err){
        console.log(err);
      }
      }, {
        scheduled: true,
        timezone: 'Asia/Kathmandu'
      });
    
    console.log('After cron.schedule');
  } catch (err) {
    console.log(err);
  }
};

const allocated = () => {
  try {
    console.log('Before cron.schedule');
   
      cron.schedule('30 25 23 * * *', async() => {
        try{
        await allocateDon.updateCat();
        console.log("called")
      }catch(err){
        console.log(err);
      }
      }, {
        scheduled: true,
        timezone: 'Asia/Kathmandu'
      });
  } catch (err) {
    console.log(err);
  }
};
  
  module.exports = {allocate, scheduleMail, allocated};