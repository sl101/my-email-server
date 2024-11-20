const express = require("express");
const server = express();
const cors = require('cors');
const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
	res.status(200).json("E-mail server started");
});

server.post("/email/feedback", async (req, res) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "google",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: EMAIL,
				pass: PASSWORD,
			},
		});

		const { name, phone, email, message } = req.body;

		await transporter.sendMail({
			from: email,
			to: EMAIL,
			subject: "E-mail from Porfolio form",
			html: `
			<p style="padding-bottom: 15px;
			border-bottom: 2px dashed #e1d6d6;"><strong>message: </strong> ${message}</p>
		
			<p><strong>from: </strong>  ${name}</p>
			<p style={{color: "black"}}><strong>e-mail: </strong> ${email}</p>
			<p><strong>phone: </strong> ${phone}</p>
			`,
		});

		return res.status(200).send({
			status: 200,
			message: "Success request",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: 500,
			message: "Error request",
		});
	}
});

server.listen(3000, () => {
	console.log("listening on port 3000");
});
