import crypto from "crypto";

const generateResetToken = (user: any): string => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  user.save();
  return resetToken;
};

export default generateResetToken;
