import nodemailer from "nodemailer";

type Params = {
  hashed_token: string;
  origin: string;
  recipient: string;
};

export const sendMail = async ({ hashed_token, origin, recipient }: Params) => {
  const constructedLink = new URL(
    `/verify-otp?hashed_token=${hashed_token}`,
    origin,
  );

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 54325,
  });

  await transporter.sendMail({
    from: "Your Company <your@mail.whatever>",
    to: recipient,
    subject: "Magic Link",
    html: `<h1>Hi there, this is a custom magic link email!</h1>
    <p>Click <a href="${constructedLink.toString()}">here</a> to log in.</p>

    Excerpt From
    Building Production-Grade Web Applications with Supabase
    David Lorenz
    This material may be protected by copyright.`,
  });
};
