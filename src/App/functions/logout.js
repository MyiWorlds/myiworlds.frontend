import apolloClient from '../../apolloClient';

const logout = () => {
  apolloClient.resetStore();
  fetch('/login/clear', { method: 'POST', credentials: 'include' }).then(
    () => (window.location = '/'),
  );
};

export default logout;
