const data = require('../shared/product-data');

async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      console.log('Client Principal:', clientPrincipal);
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
}

module.exports = async function (context, req) {
  try {
    // Get user info
    const userInfo = await getUserInfo();
    console.log('User Info:', userInfo);
    const products = data.getProducts();
    context.res.status(200).json(products);
  } catch (error) {
    context.res.status(500).send(error);
  }
};