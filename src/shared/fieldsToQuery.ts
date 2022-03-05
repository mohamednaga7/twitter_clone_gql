const manyFields = ['users', 'comments', 'tweets', 'following', 'followedBy'];

export function fieldsToQuery(fieldsObject: any): {} {
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
      }
    }
  });

  return queryObject;
}
