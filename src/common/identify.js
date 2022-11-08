function IdentifyForms(edit, value) {
  console.log('value of form', value);
  return {
    image: {
      elementType: 'Avatar',
      elementConfig: {
        type: 'file',
        label: 'Plant Image',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit && value.image ? value.image : '',
      validation: {
        required: false,
        isFile: true,
      },
      valid: edit ? true : false,
      touched: false,
    },
  };
}

export default IdentifyForms;
