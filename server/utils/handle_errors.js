function handleErrors(res, err) {
  console.error(
    `\nError: ${err.message}\nDetail: ${err.detail}\nTable: ${err.table}`
  );
  res.status(500).send('Server Error');
}

module.exports = handleErrors;
