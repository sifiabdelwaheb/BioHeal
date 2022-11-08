
function PlantSearch(UserProfilingForm) {
  this.PlantSearchForm = PlantSearchForm
}

export function PlantSearchForm(value) {
  return {
    values: {
      elementType: 'Select',
      elementConfig: {
        type: 'text',
        label: 'Search Species ',
        name: 'Element',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      options: [
        { label: 'Sentiment', id: 'Sentiment' },
        { label: 'Followers', id: 'Followers' },
        { label: 'Location', id: 'Location' },
        { label: 'Age', id: 'Age' },
        { label: 'Verified', id: 'Verified' },
        { label: 'Gender', id: 'Gender' },
      ],
    },
  }
}
