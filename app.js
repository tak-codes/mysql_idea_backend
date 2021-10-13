const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
app.use(cookieParser()); // 쿠키값을 꺼낼 수 있음
const port = 3000;
const authMiddleware = require('./middlewares/auth-middleware');
const cors = require('cors');

const connect = require('./models'); // models 폴더 참조
connect(); // 모델이랑 연결하기

// const options = {
//   origin: 'http://example.com', // 접근 권한을 부여하는 도메인
//   credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
//   optionsSuccessStatus: 200 // 응답 상태 200으로 설정
// };
// app.use(cors(options));

app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // POST로 메소드 받을 때 req.body로 사용가능하게 함

const postRouter = require('./routers/post');
const userRouter = require('./routers/user');
const wishRouter = require('./routers/wish');
const commRouter = require('./routers/comment');
app.use('/post', [ postRouter ]); // postRouter를 api 하위부분에서 쓰겠다 !
app.use('/', [ userRouter ]);
app.use('/comment', [ commRouter ]);
app.use('/wish', [ wishRouter ]);

app.listen(port, () => {
  console.log(`listening at http://localhost:${ port }`);
});
