function getLinks({ host, route, id }) {
  const baseUrl = `http://${host}/${route}/`;
  return {
    self: baseUrl + id,
    getAll: baseUrl,
    update: baseUrl + id,
    delete: baseUrl + id,
  };
}

export { getLinks };
