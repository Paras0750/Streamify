const subscribedModel = require("../models/subscribedModel");
const subscriberModel = require("../models/subscriberModel");

module.exports.createCollections = async (req, res) => {

  const {  username } = req.user;


  let isSubscriberModel = await subscriberModel.findOne({ username });
  let isSubscribedModel = await subscribedModel.findOne({ username });

  console.log(isSubscriberModel);
  if (isSubscriberModel || isSubscribedModel) {
    res.status(500).json({ status: false, msg: "Username Already Exists" });
  }

  const createSubscriber = await subscriberModel.create({
    username,
    subscribers: [],
  });

  if (!createSubscriber)
    res.status(500).json({ status: false, msg: "Error creating collections" });

  const createSubscribed = await subscribedModel.create({
    username,
    subscribed: [],
  });

  createSubscribed
    ? res.status(200).json({ status: true })
    : res
        .status(500)
        .json({ status: false, msg: "Error creating collections" });
};

module.exports.mySubscriptions = async (req, res) => {
  const subscribed = await subscribedModel.findOne({
    username: req.user.username,
  });
  subscribed
    ? res.status(200).json({ status: true, subscribed })
    : res
        .status(500)
        .json({ status: false, msg: "Error getting subscribed channels" });
};

module.exports.subscribe = async (req, res) => {
  const { subscribe } = req.body;

  try {
    let subscribedUser = await subscribedModel.findOne({
      username: req.user.username,
    });
    let subscribed = subscribedUser ? subscribedUser.subscribed : [];

    const isAlreadySubscribed = subscribed.includes(subscribe);

    if (isAlreadySubscribed) {
      return res.status(400).json({ status: false, msg: `Already subscribed` });
    }

    subscribed.push(subscribe);
    await subscribedModel.findOneAndUpdate(
      { username: req.user.username },
      { subscribed }
    );

    let subscriber = await subscriberModel.findOne({ username: subscribe });
    if (subscriber) {
      let subscribers = subscriber.subscriber;
      subscribers.push(req.user.username);
      await subscriberModel.findOneAndUpdate(
        { username: subscribe },
        { subscribers }
      );
    } else {
      res
        .status(500)
        .json({ status: false, msg: "Subscriber record does not exist" });
    }

    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, msg: "Failed to update subscribed list" });
  }
};

module.exports.unsubscribe = async (req, res) => {
  const { unsubscribe } = req.body;

  try {
    let subscribedUser = await subscribedModel.findOne({
      username: req.user.username,
    });
    let subscribed = subscribedUser ? subscribedUser.subscribed : [];

    const indexOfUnsubscribe = subscribed.indexOf(unsubscribe);
    if (indexOfUnsubscribe !== -1) {
      subscribed.splice(indexOfUnsubscribe, 1);

      await subscribedModel.findOneAndUpdate(
        { username: req.user.username },
        { subscribed }
      );

      let subscribedListOfUnsubscribe = await subscriberModel.findOne({
        username: unsubscribe,
      });
      if (subscribedListOfUnsubscribe) {
        let subscribers = subscribedListOfUnsubscribe.subscribers || [];
        const index = subscribers.indexOf(req.user.username);
        if (index !== -1) {
          subscribers.splice(index, 1);
          await subscriberModel.findOneAndUpdate(
            { username: unsubscribe },
            { subscribers }
          );
        }
      }

      res.status(200).json({ status: true });
    } else {
      res
        .status(400)
        .json({
          status: false,
          msg: `You are not subscribed to ${unsubscribe}`,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: "Failed to update contact" });
  }
};

module.exports.isSubscribed = async (req, res) => {
  const { username } = req.body;

  const isSubscribed = await subscribedModel.findOne({
    username: req.user.username,
    subscribed: username,
  });

  isSubscribed
    ? res.status(200).json({ status: true })
    : res.status(200).json({ status: false });
};
 