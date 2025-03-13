import { Request, Response } from "express";
import UserSignupSchema from "../schemas/UserSignupSchema.schema";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/UserModel.model";
import bcrypt from "bcrypt";
import generateToken from "../helpers/generateToken";
import setCookies from "../helpers/setCookies";
import ResponseHandler from "../utils/ResponseHandler";
import UserDTO from "../dto/UserDTO.dto";
import UserLoginSchema from "../schemas/UserLoginSchema.schema";
import sendEmail from "../services/sendEmail";
import { welcomeEmail } from "../templates/emails/welcomeEmail";
import ForgotEmailSchema from "../schemas/ForgotEmailSchema.schema";
import forgotPasswordEmail from "../templates/emails/forgotPasswordEmail";
import generateResetToken from "../helpers/generateResetToken";
import ResetPasswordSchema from "../schemas/ResetPasswordSchema.schema";

export const signup = async (req: Request, res: Response) => {
  const { error } = UserSignupSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.message);
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      ErrorHandler.send(res, 409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(res, newUser);
    setCookies(res, token);

    const userDTO = new UserDTO(newUser);

    try {
      const emailTemplate = welcomeEmail(newUser.name);
      await sendEmail(newUser.email, emailTemplate.subject, emailTemplate.text);
    } catch (error: any) {
      console.error(`Failed to send welcome email: ${error.message}`);
    }

    ResponseHandler.send(
      res,
      201,
      "Account created successfully",
      userDTO,
      token
    );
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = UserLoginSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.message);
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      ErrorHandler.send(res, 404, "User not found");
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user!.password);
    if (!isPasswordCorrect) {
      ErrorHandler.send(res, 400, "Invalid email or password");
      return;
    } else {
      const token = generateToken(res, user);

      setCookies(res, token);

      const userDTO = new UserDTO(user!);

      ResponseHandler.send(res, 200, "Login successful", userDTO, token);
    }
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { error } = ForgotEmailSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.message);
    return;
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      ErrorHandler.send(res, 404, "User not found");
      return;
    }

    const resetToken = generateResetToken(user);
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const emailTemplate = forgotPasswordEmail(user.name, resetUrl);
    await sendEmail(user.email, emailTemplate.subject, emailTemplate.body);

    user.resetPasswordToken = resetToken;

    ResponseHandler.send(res, 200, "Password reset email sent successfully");
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  // Validate request body
  const { error } = ResetPasswordSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.message);
    return;
  }

  const { password } = req.body;
  const { token } = req.params;

  try {
    // Find user by reset token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      ErrorHandler.send(res, 400, "Invalid or expired reset token");
      return;
    }

    // Hash new password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    ResponseHandler.send(res, 200, "Password has been reset successfully");
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    ResponseHandler.send(res, 200, "Logout successfully");
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};
