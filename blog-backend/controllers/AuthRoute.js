import { sendResponse } from "../helpers/sendResponse.js";
import userSchema from "../models/UserAuth.js";
import bcrypt from "bcrypt";

export const signUp = async (request, response) => {
  console.log(request.body);
  console.log(request.body, "sfbisdbsdbgbds");

  try {
    /**
     * Check If User Alread Exist
     */
    var userExist = await userSchema.findOne({ email: request.body.email });
    if (userExist != null)
      return response
        .status(406)
        .json(sendResponse(0, "User with this email already exist."));

    /**
     * Excrypt password
     */
    let hashedPassword = await bcrypt.hash(request.body.password, 10);

    /**
     * Create New User
     */
    let user = new userSchema({
      full_name: request.body.full_name,
      email: request.body.email,
      password: hashedPassword,
    });

    /**
     * Save New User
     */
    var userCreated = await user.save();

    return response
      .status(200)
      .json(
        sendResponse(1, "Account Created Successfully", { user: {full_name : userCreated.full_name, _id : userCreated._id }})
      );
  } catch (e) {
    console.log(e);
    return response
      .status(501)
      .json(sendResponse(0, "Error has Occured", { error: e }));
  }
};
export const signin = async (request, response) => {
  try {
    /**
     * Check If User Exist
     */
    var userExist = await userSchema.findOne({ email: request.body.email });
    if (userExist == null)
      return response
        .status(406)
        .json(sendResponse(0, "Invalid Crediantials. Please Try Again!"));

    /**
     * Check Password Hash
     */
    const checkPasswordMatch = await bcrypt.compare(
      request.body.password,
      userExist.password
    );

    /**
     * Check If Password Matches
     */
    if (checkPasswordMatch) {
      return response
        .status(200)
        .json(sendResponse(1, "Login Successful.", { user: {full_name : userExist.full_name,_id:userExist._id} }));
    } else {
      return response
        .status(406)
        .json(sendResponse(0, "Invalid Crediantials. Please Try Again!"));
    }
  } catch (e) {
    console.log(e);
    return response
      .status(501)
      .json(sendResponse(0, "Error has Occured", { error: e }));
  }
};
