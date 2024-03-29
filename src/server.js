import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import rootRouter from "./routers/rootRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views",process.cwd()+"/src/views");

//FGmpeg
  // app.use((req, res, next) => {
  //   res.header("Cross-Origin-Embedder-Policy", "require-corp");
  //   res.header("Cross-Origin-Opener-Policy", "same-origin");
  //   next();
  //   });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    });

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
)

app.use(flash());
app.use(localsMiddleware)
//static("uploads") -> 노출시키고 싶은 폴더 이름 작성
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"))
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.use("/api", apiRouter);

export default app;