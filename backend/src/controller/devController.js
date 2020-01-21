const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const parseLocation = require('../utils/parseLocation');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;
      const techsArrey = parseStringAsArray(techs);

      const location = parseLocation(longitude, latitude);

      dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        techs: techsArrey,
        location
      });
    }

    return res.json(dev);
  },
  async update(req, res) {
    const { github_username } = req.params;
    const { techs, latitude, longitude } = req.body;

    const location = parseLocation(longitude, latitude);
    const techsArrey = parseStringAsArray(techs);

    const filter = { github_username };
    const update = { location, techs: techsArrey };

    const dev = await Dev.findOneAndUpdate(filter, update, { new: true });

    return res.json(dev);
  },
  async destroy(req, res) {
    const { github_username } = req.params;

    await Dev.findOneAndDelete({ github_username });

    return res.json({ github_username });
  }
};
