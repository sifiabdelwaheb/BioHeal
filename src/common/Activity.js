function ActivityForms(edit, value) {
  console.log("value of form", value);
  return {
    image: {
      elementType: "Avatar",
      elementConfig: {
        type: "file",
        label: "Plant Image",
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit && value.image ? value.image : "",
      validation: {
        required: false,
        isFile: true,
      },
      valid: edit ? true : false,
      touched: false,
    },

    name: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Name",
        errormsg: "invalid names",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.organism : "",
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },

    description: {
      elementType: "Description",
      elementConfig: {
        type: "text",
        label: "description",
        errormsg: "invalid description",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },

      value: edit ? value && value.description : "",
      validation: {
        required: false,
      },
      valid: true,
      touched: true,
    },
  };
}

export default ActivityForms;
