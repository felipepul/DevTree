import bcrypt from 'bcryptjs';

//?como hashear la contraseña
export const hashPassword = async(password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export const comparePassword = async (enteredPassword: string, hash: string) => {
  const result = await bcrypt.compare(enteredPassword, hash);
 // console.log(result);
  return result;
}
