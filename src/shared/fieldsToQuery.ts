const manyFields = ['users', 'comments', 'tweets', 'following', 'followedBy'];
const userTypes = ['users', 'user', 'following', 'followedBy'];

export function fieldsToQuery(fieldsObject: any): { select: {} } {
  const queryObject: {
    select: any;
  } = {
    select: {},
  };

  Object.keys(fieldsObject).forEach((field) => {
    if (field !== '__typename') {
      if (Object.keys(fieldsObject[field]).length === 0) {
        queryObject.select[field] = true;
      } else {
        queryObject.select[field] = fieldsToQuery(fieldsObject[field]);
        if (manyFields.includes(field)) {
          queryObject.select[field].where = { deletedAt: null };
        }
        if (userTypes.includes(field)) {
          queryObject.select[field].select.password = false;
        }
      }
    }
  });

  console.log(queryObject);
  return queryObject;
}
