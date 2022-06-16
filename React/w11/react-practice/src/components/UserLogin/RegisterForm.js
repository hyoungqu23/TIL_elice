import React, { useRef } from 'react';

export default function RegisterForm({ onsubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formData = {
      email,
      password,
    };

    onsubmit(formData);
  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            ref={emailRef}
            required
            placeholder="Enter email."
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            ref={passwordRef}
            required
            placeholder="Enter password."
            autoComplete="off"
          />
        </fieldset>
        <button type="submit" onClick={submitForm}>
          Register
        </button>
      </form>
    </div>
  );
}
