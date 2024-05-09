export const validateBody = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (!error) return { value };

  return {
    error: error.details.map(err => err.message),
  };
};
