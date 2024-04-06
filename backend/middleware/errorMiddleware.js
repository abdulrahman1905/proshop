//Handles not found error if no other middleware have flagged the error
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

//throw new Error(message)

//Overwrites the default express errorHandler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? 'symbol' : err.stack,
  })
}

export { notFound, errorHandler }
