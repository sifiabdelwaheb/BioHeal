function loginForm() {
  return {
    useremail: {
      elementType: "Input",
      elementConfig: {
        type: "email",
        label: "email"
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid:false,
      touched: false,
    },
    password: {
      elementType: "Input",
      elementConfig: {
        type: "password",
        label: "user.password"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  };
}

export default loginForm;
