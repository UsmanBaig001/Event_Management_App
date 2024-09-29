export default (path, body, method = 'POST') => {
  let options = {
    method,
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(path, options)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      console.log(
        '-->',
        path,
        method,
        '❌',
        '\nbody:',
        JSON.stringify(body),
        '\n',
        err.message,
      );
      // alert(err.message)

      return {
        success: false,
        message: err.message,
      };
    });
};
