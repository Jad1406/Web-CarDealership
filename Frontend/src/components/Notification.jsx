import React from 'react'

const Notification = (props) => {

    // 1 = successfull login
    // 2 = unseccessfull login
    // 3 = Incorrect Credentials
    // 4 = username Already in use
    // 5 = email already in use
    // 6 = invalid email addess
    // 7 = not logged in
    // 8 = passwords do not match
    const cond = props.desc;

    function displayNotif(cond) {
        if (cond == 1) {
            return ("<div>Logged in successfully</div>")
        } else if (cond == 2) {
            return ("<div>Unseccessfull Login</div>")
        } else if (cond == 3) {
            return ("<div>Username or Password is/are incorrect</div>")
        } else if (cond == 4) {
            return ("<div>Username already in use</div>")
        } else if (cond == 5) {
            return ("<div>Email already in use</div>")
        } else if (cond == 6) {
            return ("<div>Invalid email address</div>")
        } else if (cond == 7) {
            return ("<div>Please login to continue</div>")
        } else if(cond == 8){
            return ("<div>Passwords do not match</div>")
        } else {
            alert("Condition had not been considered or notif display was incorrect")
        }
    }
  return (
    <div className='w-10 h-10'>
        Notification
    </div>
  )
}

export default Notification
