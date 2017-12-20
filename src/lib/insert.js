const insert = fields => {
  const document = {};
  for (const field of fields) {
    switch (field.type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'link':
      document[field.field] = field.value;
      break;
    default:
      document[field.field] = field.value;
      break;
    }
  }
  return document;
};

export default insert;
