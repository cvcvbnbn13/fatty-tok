import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (res: any, addUser: any) => {
  //sub for identifier
  const decoded: { name: string; sub: string; picture: string } = jwt_decode(
    res.credential
  );

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    userName: name,
    image: picture,
    _type: 'user',
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
