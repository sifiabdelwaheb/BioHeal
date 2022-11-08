function ContactUs(contactUs) {
  this.contactUs = contactUs;
}

function contactUsForm() {
  return new ContactUs({
    username: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'user.fullname',
        name: 'username',
        errormsg: 'invalid username',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
        minLength: true,
      },
      valid: false,
      touched: false,
    },
    adresse: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'user.adress',
        name: 'adresse',
        errormsg: 'invalid adresse',

        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    useremail: {
      elementType: 'Input',
      elementConfig: {
        type: 'email',
        label: 'user.email',
        errormsg: 'invalid email',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'Input',
      elementConfig: {
        type: 'password',
        label: 'user.password',
        name: 'password',
        errormsg: 'invalid password',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    Role: {
      elementType: 'Select',
      elementConfig: {
        type: 'text',
        label: 'Role',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',

      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: 'developer', id: 'developer' },
        { label: 'client', id: 'client' },
      ],
    },
  });
}

export default contactUsForm;
