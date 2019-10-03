import jwt from "jsonwebtoken";

export default function(req, res, next) {
  const header = req.header("USER-KEY");

  if (!header)
    return res.status(403).send({
      error: {
        status: 401,
        code: "AUT_02",
        message: "Access Unauthorized",
        field: "NoAuth"
      }
    });

  if (!header.startsWith("Bearer "))
    return res.status(401).send({
      code: "AUT_02",
      message: "The apikey is invalid.",
      field: "API-KEY"
    });

  const bearer = header.split(" ");
  const token = bearer[1];

  try {
    const decoded = jwt.verify(token, "123");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      code: "AUT_02",
      message: "The apikey is invalid.",
      field: "API-KEY"
    });
  }
}
