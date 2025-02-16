import { ONE_DAY } from '../constants/constants.js';
import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  console.log("test");

  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in',
    data: {
      accessToken: session.accessToken,
    }
  });
};
