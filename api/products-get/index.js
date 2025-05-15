const data = require('../shared/product-data');

async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      console.log('User Info:', clientPrincipal);
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
}

module.exports = async function (context, req) {
  try {
    // simple check user info, can be replaced with a more complex check, like checking roles
    // Get user info
    // const userInfo = await getUserInfo();
    
    // if (!userInfo || userInfo.userDetails == 'main-it-sol') {
    //   context.res.status(401).send('Unauthorized');
    //   return;
    // }

    const products = data.getProducts();
    context.res.status(200).json(products);
  } catch (error) {
    context.res.status(500).send(error);
  }
};