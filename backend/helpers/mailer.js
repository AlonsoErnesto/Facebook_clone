const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const {OAuth2} = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground"
const {EMAIL,MAILING_ID,MAILING_SECRET,MAILING_REFRESH} = process.env;

const auth = new OAuth2(
  MAILING_ID, 
  MAILING_SECRET,
  MAILING_REFRESH, 
  oauth_link
  );


exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Verificacion de Facebook",
    html: `
    <div 
      style="
        max-width:700px;
        margin-bottom:1rem;
        display:flex;
        align-items:center;
        gap: 10px;
        font-family:Roboto;
        font-weight:600;
        color:#3b5998;
      ">
    <img style="width:30px" src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png"/>
    <span>Accion requerida : Activa tu cuenta de Facebook</span>
    </div>
    <div style="
        padding:1rem 0;
        border-top:1px solid #e5e5e5;
        border-bottom:1px solid #e5e5e5;
        color:#141823;
        font-size:17px;
        font-family:Roboto;
      ">
      <span>Hola ${name}</span>
      <div style="padding:20px;">
        <span style="padding:1.5rem 0">
          Recientemente creaste una cuenta en Facebook. Para completar el registro, confirma la cuenta en tu correo electronico.
        </span>
      </div>
      <a 
          style="
            width:200px;
            padding:10px 15px;
            background:#4c649b;
            color:#fff;
            text-decoration:none;
            font-weight:600;
          "
          href=${url}>Confirma tu cuenta.</a>
      <br/>
      <div style="padding-top:20px;">
        <span style="margin:1.5rem 0 ; color : #898f9c">
          Facebook es una red social para la comunicacion con tus amigos y familiares, como la publicacion de histirias y acontecimientos
          Quedate en Facebook y habra muchas cosas mas para descubrir.
        </span>
      </div>
    </div>
    `,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  })
};


