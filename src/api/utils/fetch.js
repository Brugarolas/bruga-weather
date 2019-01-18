import unfetch from 'unfetch';

const fetch = window.fetch || unfetch;

export default fetch;
