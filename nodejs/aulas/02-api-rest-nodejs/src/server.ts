import fastify from "fastify";

const app = fastify();

app.get("/hello", () => {
  return "Hello Man";
});

app.listen({ port: 3333 })
.then(() => {
  console.log('HTTP Server Running!')
  app.close()
})
