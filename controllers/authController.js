import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      /* 
      return res.status(400).send({
        success: false,
        message: "Please Provide the name",
      });
      */
      //  or verify by middleware
      next("Name must to fill");
    }
    if (!email) {
      /*
      return res.status(400).send({
        success: false,
        message: "Please Provide the email",
      });
      */

      next("Email is must ");
    }
    if (!password) {
      /* 
      return res.status(400).send({
        success: false,
        message: "Please Provide the password",
      });
      */
      next("Password is Must and more than 6 character ");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      next("Email Already Register make login please!");
      /* 
      return res.status(200).send({
        success: false,
        message: "Email Already Register make login please! ",
      });
      */
    }

    const user = await userModel.create({ name, email, password });
    res.send({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    // console.log(error);
    // res.status(400).send({
    //   message: "Error is ragister Controller",
    //   success: false,
    //   error,
    // });
    // or middleware
    next(error);
  }
};
