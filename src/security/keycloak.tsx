import Keycloak from 'keycloak-js'

const kcConfig = {
  "url":   import.meta.env.VITE_KC_URL,
  "realm": import.meta.env.VITE_KC_REALM,
  "clientId": import.meta.env.VITE_KC_CLIENT,
}
const kc = new Keycloak(kcConfig);


export default kc;