import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  // try {

  const { name, email, password } = req.body;
  if (!name) {
    /* 
      return res.status(400).send({
        success: false,
        message: "Please Provide the name",
      });
      */
    //  or verify by middleware
    // next("Name must to fill");
  }
  if (!email) {
    /*
      return res.status(400).send({
        success: false,
        message: "Please Provide the email",
      });
      */
    // next("Email is must ");
  }
  if (!password) {
    /* 
      return res.status(400).send({
        success: false,
        message: "Please Provide the password",
      });
      */
    // next("Password is Must and more than 6 character ");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    // next("Email Already Register make login please!");
    /* 
      return res.status(200).send({
        success: false,
        message: "Email Already Register make login please! ",
      });
      */
  }

  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
  // } catch (error) {
  //   // console.log(error);
  //   // res.status(400).send({
  //   //   message: "Error is ragister Controller",
  //   //   success: false,
  //   //   error,
  //   // });
  //   // or middleware
  //   next(error);
  // }
  // alter of the trycatch block
};

// login function
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    next("please provide detail");
  }

  // find user by email
  // const user = await userModel.findOne({ email });
  // if (!user) {
  //   next("invalid user name or password");
  // }

  //*compare password

  // try {
  //   const isMatch = await user.comparePassword(password);
  //   if (!isMatch) {
  //     next("invalid user name or password");
  //   }
  // } catch (error) {
  //   // Handle any errors that occur during the password comparison
  //   next(error);
  // }

  const user = await userModel.findOne({ email: email });

  if (!user) {
    next("invalid user name or password");
    return; // Exit the function early
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    next("invalid user name or password");
    return; // Exit the function early
  }

  // const isMatch = await user.comparePassword(password).select("+password");
  // if (!isMatch) {
  //   next("invalid user name or password: ");
  // }

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login successfully",
    user,
    //  {
    //   name: user.name,
    //   lastName: user.lastName,
    //   email: user.email,
    //   location: user.location,
    // },
    token,
  });
};
