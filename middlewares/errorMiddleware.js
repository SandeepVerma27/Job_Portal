// error middleware || NEXT functiom

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: 500,
    message: err,
  };
  // before
  // res.status(500).send({
  //   success: false,
  //   message: "Something went wrong: ",
  //   err,
  // });
  //code missing filled error
  if (err.name === "validationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(
      err.keyValue
    )}t fields must to be unique `;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.message });
};

export default errorMiddleware;
