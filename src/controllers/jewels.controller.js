import { jewelsModel } from '../models/jewels.model.js';
import { getLinks } from '../util/getLinks.js';

async function createJewel(req, res) {
  const response = {
    data: null,
    error: null,
  };

  const result = await jewelsModel.create(req.body);

  if (result === null) {
    response.error = 'Error creating jewel';
    return res.status(500).send(response);
  }

  // HATOES
  const links = getLinks({
    host: req.headers.host,
    route: 'jewels',
    id: result.id_jewel,
  });
  result.links = links;

  response.data = result;
  return res.status(201).send(response);
}

async function getAllJewels(req, res) {
  const response = {
    data: null,
    error: null,
  };

  const { name, material } = req.query;

  let result;

  if (name || material) {
    result = await jewelsModel.getFiltered({ name, material });
  } else {
    result = await jewelsModel.getAll();
  }

  if (result === null) {
    response.error = 'Error getting jewels';
    return res.status(500).send(response);
  }

  result.forEach((jewel) => {
    // HATOES
    const links = getLinks({
      host: req.headers.host,
      route: 'jewels',
      id: jewel.id_jewel,
    });
    jewel.links = links;
  });

  response.data = result;
  return res.status(200).send(response);
}

async function getJewel(req, res) {
  const response = {
    data: null,
    error: null,
  };

  const { id } = req.params;

  const result = await jewelsModel.get(id);

  if (result === false) {
    response.error = 'Error getting jewel';
    return res.staus(500).send(response);
  }

  // HATOES
  const links = getLinks({
    host: req.headers.host,
    route: 'jewels',
    id: result.id_jewel,
  });
  result.links = links;

  response.data = result;
  return res.status(200).send(response);
}

async function updateJewel(req, res) {
  const response = {
    data: null,
    error: null,
  };

  const { id } = req.params;

  const result = await jewelsModel.update(id, req.body);

  if (result === null) {
    response.error = 'Error updating jewel';
    return res.status(500).send(response);
  }

  // HATOES
  const links = getLinks({
    host: req.headers.host,
    route: 'jewels',
    id: result.id_jewel,
  });
  result.links = links;

  response.data = result;
  return res.status(200).send(response);
}

async function deleteJewel(req, res) {
  const response = {
    data: null,
    error: null,
  };

  const { id } = req.params;

  const result = await jewelsModel.delete(id);

  if (result === null) {
    response.error = 'Error deleting jewel';
    return res.status(500).send(response);
  }

  if (result.affectedRows === 0) {
    response.error = 'Id not found';
    return res.status(400).send(response);
  }

  response.data = result;
  return res.status(200).send(response);
}

function validate(req, res, next) {
  const { name, price, weight, materials } = req.body;
  console.log(req.body);
  if (!name || !price || !weight || !materials.length || !Array.isArray(materials)) {
    return res.status(400).send({
      data: null,
      error: 'Missing required parameters',
    });
  }
  next();
}

export { createJewel, getAllJewels, getJewel, updateJewel, deleteJewel, validate };
