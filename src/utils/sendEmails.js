import emailjs from 'emailjs-com';

const sendEmailsToUsers = async (emails, contestName, link) => {
  for (const email of emails) {
    try {
      console.log("Sending email to:", email);
      await emailjs.send(
        'service_pcm691h',
        'template_mfljpfs',
        {
          to_email: email,
          contestName: contestName,
          link: link
        },
        'GK84fgvxjE-3P31wM'
      );
      console.log("Email sent to:", email);
    } catch (error) {
      console.error("Failed to send email to:", email, error);
    }
  }
};

export default sendEmailsToUsers;
