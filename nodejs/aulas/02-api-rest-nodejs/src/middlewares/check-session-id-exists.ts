import { FastifyReply, FastifyRequest } from 'fastify'

export function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
  done,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
  done()
}
