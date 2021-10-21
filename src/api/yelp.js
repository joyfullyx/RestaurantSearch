import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer wJ3eY80FEtpqNYhNSFNNz9XZq01OxmvEgxYQ_3zQWQN0d7X8RyhEkWZCvYiQHaT07tJvVpiDHWSv1rEYre3I4hRa6nFz_sbB7tKp0e2lGUjS6p_Sy5_BI-bgy9lxYXYx",
  },
});
