### Express 뼈대 코드 정리
import express from 'express';
const app = express();

### 라우트 정의
app.listen (3000, () => console.log('Server Started'));
app.method(path, handler)
1. method : HTTP 메소드 이름
2. path : 엔드포인트 경로
3. handler : 리퀘스트 로직을 처리, 리스폰스 돌려주는 핸들러 함수

### 리퀘스트 객체 
1. req.query 
쿼리스트링 파라미터를 프로퍼티로 담고있는 객체 
2. req.params
URL 파라미터를 프로퍼티로 담고 있는 객체, 파라미터는 항상 문자열
3. req.body
리퀘스트 바디 내용을 담고 있는 객체
### 리스폰스 객체 
1. res.send()
-> 리스폰스를 보냄 
2. res.status()
-> 리스폰스 상태코드 설정
3. res.sendStatus()
-> 리스폰스 바디없이 상태코드만 보냄
### 쿼리 필터
1. 일치 : Person.find({ name : 'James' });
2. 비교 연산자 : Person.find({ age : { $gt: 35 }}); -> 특정 값을 초과한다. 미만이면 $lt라고 표현함
3. Regex 연산자 : 문자열 필드가 특정 패턴을 가지고 있는지 확인 $regex
4. AND 연산자 : 여러 조건을 만족하는 결과만 필터, 하나의 객체에 여러 조건을 작성 Person.find({ age: { $lt: 32 }, email: { $regex: 'gmail\.com$' } });
5. OR 연산자 : Person.find({ $or: [{ age: { $lt: 32 } }, { email: { $regex: 'gmail\.com$' } }] });
6. .findOne() 메소드 : Person.findOne({ name: 'James' });
