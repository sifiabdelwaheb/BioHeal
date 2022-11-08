function Foods_form() {
  return {
    age: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Age",
     
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
    allergies: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Allergies",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    food: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: " Food preferences",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: "Food1", id: "food1" },
        { label: "Food2", id: "food2" },
      ],
    },
    gender: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "Gender",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: "Male", id: "Male" },
        { label: "Female", id: "Female" },
      ],
    },
    life: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: " Stage of life,",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: "stage1", id: "stage1" },
        { label: "stage2", id: "stage2" },
      ],
    },
    body_mass: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "Body mass ",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    medication: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: " Medications",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: "medication1", id: "medication1" },
        { label: "medication2", id: "medication2" },
      ],
    },
    diseases: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: " Diseases",
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: "diseases1", id: "diseases1" },
        { label: "diseases2", id: "diseases2" },
      ],
    },
  };
}

export default Foods_form;
