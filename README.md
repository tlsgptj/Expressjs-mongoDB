## Express 뼈대 코드 정리
import express from 'express';
const app = express();
//라우트 정의
app.listen (3000, () => console.log('Server Started'));
app.method(path, handler)
1. method : HTTP 메소드 이름
2. path : 엔드포인트 경로
3. handler : 리퀘스트 로직을 처리, 리스폰스 돌려주는 핸들러 함수
## 리퀘스트 객체 
req.query 
쿼리스트링 파라미터를 프로퍼티로 담고있는 객체 
req.params
URL 파라미터를 프로퍼티로 담고 있는 객체, 파라미터는 항상 문자열
req.body
리퀘스트 바디 내용을 담고 있는 객체
리스폰스 객체 
res.send()
-> 리스폰스를 보냄 
res.status()
-> 리스폰스 상태코드 설정
res.sendStatus()
-> 리스폰스 바디없이 상태코드만 보냄
