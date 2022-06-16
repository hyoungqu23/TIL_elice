import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const nav = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // DetailPage로 이동
    nav('/detail/?email=' + email + '&password=' + password);
  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter email."
            required
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            required
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="Enter password."
          />
        </fieldset>

        <button type="submit" onClick={submitForm}>
          Login
        </button>
      </form>
    </div>
  );
}
