/**
 * Created by paul on 2017/7/3.
 */
import generateReqwestPromise from '../../utils/interceptor';

export function Verified() {
  return generateReqwestPromise({
    "Action": "Verified",
    "Token": window.localStorage.getItem('token') || "",
  })
}

export function Login(username, password) {
  return generateReqwestPromise({
    "Action": "Login",
    "Username": username,
    "Password": require("crypto").createHash('md5').update(password).digest('hex')
  })

}

export function VerifiedUums(UusmToken){
	return generateReqwestPromise({
		"Action":"VerifiedUums",
		UusmToken,
	})		
}