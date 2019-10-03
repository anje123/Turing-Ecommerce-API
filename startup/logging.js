import winston from "winston";

// logging configuration with winston
export default () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughterror.log" }),
    new winston.transports.Console()
  );

  winston.add(
    new winston.transports.File({
      filename: "combined.log",
      handleExceptions: true
    })
  );

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.simple()
      })
    );
  }
};
