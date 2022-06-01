const preprocess = require('svelte-preprocess');

module.exports = {
  preprocess: preprocess({
    postcss: true,
  }),
};

// import preprocess from 'svelte-preprocess';

// const config = {
//   preprocess: preprocess({ postcss: true }),
// };

// export default config;
