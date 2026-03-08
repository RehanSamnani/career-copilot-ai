import React from 'react'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <div class="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"  name="email" placeholder="Enter your email"/>
                </div>
                <div class="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password"/>
                </div>

                <button class='button primary button' type="submit">Login</button>


            </form>
        </div>
    </main>
  )
}

export default Login