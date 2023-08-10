FROM node:14-alpine

WORKDIR /Imagine_AI

COPY ./package*.json /Imagine_AI

RUN npm install

COPY . /Imagine_AI

CMD ["npm","start"]
