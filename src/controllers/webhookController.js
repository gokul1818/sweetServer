const WebHook = require('../models/webhook'); // Ensure path and file name are correct

exports.webhook = async (req, res) => {
  const { event, payload, source } = req.body;

  try {
    const webhook = new WebHook({ event, payload, source });
    await webhook.save();

    res.status(200).json({ message: ' successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.webhookData = async (req, res) => {

  try {
    const data = await WebHook.find({});

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

