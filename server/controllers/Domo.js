const { Domo } = require('../models');

const makerPage = (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    alignment: req.body.alignment,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(200).json({
      name: newDomo.name,
      age: newDomo.age,
      alignment: newDomo.alignment,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};

const deleteDomo = async (req, res) => {
  if (!req.body.domo) {
    return res.status(400).json({ error: 'Domo is required!' });
  }

  try {
    const domo = await Domo.findByIdAndDelete({
      _id: req.body.domo._id,
    }).exec();
    console.log(domo);
    return res.json({ message: 'Deleted domo' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error deleting domo' });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query)
      .select('name age alignment')
      .lean()
      .exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  deleteDomo,
};
