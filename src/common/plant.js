function Plants(plant) {
  this.plant = plant;
}

function plantsForm() {
  return new Plants({
    names: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "names",
        name: "names",
        errormsg: "invalid names",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
        minLength: true,
      },
      valid: false,
      touched: false,
    },
    organism: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "organism",
        name: "organism",
        errormsg: "invalid organism",

        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",

      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    species: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "species",
        name: "species",
        errormsg: "invalid organism",

        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    isVascular: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "isVascular:",
        name: "isVascular",

        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      selectedValue: "True",

      validation: {
        required: false,
      },
      valid: false,
      touched: false,
      options: [
        { label: "True", id: "True" },
        { label: "False", id: "False" },
      ],
      defaultValue: "",
    },
    hasSpores: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "hasSpores:",
        name: "hasSpores",

        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      selectedValue: "True",

      validation: {
        required: false,
      },
      valid: false,
      touched: false,
      options: [
        { label: "True", id: "True" },
        { label: "False", id: "False" },
      ],
      defaultValue: "",
    },

    hasFlower: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "hasFlower:",
        name: "hasSpores",
        placeholder: "True",

        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      selectedValue: "True",

      validation: {
        required: false,
      },
      valid: false,
      touched: false,
      options: [
        { label: "True", id: "True" },
        { label: "False", id: "False" },
      ],
      defaultValue: "",
    },

    Description: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Description",
        name: "Description",
        errormsg: "invalid Description",
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: edit ? false : false,
      },
      valid: true,
      touched: false,
    },
  });
}

export default plantsForm;
