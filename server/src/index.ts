import createApp from "@/lib/create-app";
import { authRoute } from "@/routes/auth.route";

const app = createApp();

app.route("/api/v1/auth", authRoute);

export default app;
