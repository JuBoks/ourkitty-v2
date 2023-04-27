# 베이스 이미지 선택
FROM node:18.15.0

# 환경 설정 명령어 실행
RUN apt-get update && apt-get install -y curl sudo

# 작업 디렉터리 설정
WORKDIR /app
COPY ./package.json /app
RUN npm install

# 실행
COPY ./ /app
RUN npm run build

# 시작 명령어 설정
CMD ["npm", "start"]
