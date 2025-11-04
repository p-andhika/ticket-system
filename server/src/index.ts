import createApp from "@/lib/create-app";
import generateAuthRoute from "@/routes/auth.route";

const app = createApp();

const authRoute = generateAuthRoute(app);
// const userRoute = generateUserRoute(app);

app.route("/api/v1/auth", authRoute);

export default app;
