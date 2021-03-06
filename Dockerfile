FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn global add react-scripts@1.1.1 --silent
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "3000", "-s", "."] 