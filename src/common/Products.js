function PlantForms(edit, value) {
  console.log("value of form", value);
  return {
    marque: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Marque",
        errormsg: "invalid Marque",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.marque : "",
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },
    codeArticle: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Code Article",
        errormsg: "invalid names",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.codeArticle : "",
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },

    designation: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Designation",
        errormsg: "invalid Designation",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.designation : "",
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },

    Stock: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Stock",
        errormsg: "invalid Stock",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },

      value: edit ? value && value.Stock : "",
      validation: {
        required: false,
      },
      valid: true,
      touched: true,
    },
    isStock: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "isStock",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? { label: value.isStock, value: value.isStock } : "",
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
      options: [
        { label: "En Stock", id: "En Stock" },
        { label: "Hors Stock", id: "Hors Stock" },
      ],
    },
  };
}

export default PlantForms;
