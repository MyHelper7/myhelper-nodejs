import * as firebaseAdmin from 'firebase-admin';

import { config, logger } from '../config';
import { FirebaseError } from '../utils';

(function() {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(JSON.parse(JSON.stringify({
        'type': config.FIREBASE.ADMIN.TYPE,
        'project_id': config.FIREBASE.ADMIN.PROJECT_ID,
        'private_key_id': config.FIREBASE.ADMIN.PRIVATE_KEY_ID,
        'private_key': config.FIREBASE.ADMIN.PRIVATE_KEY,
        'client_email': config.FIREBASE.ADMIN.CLIENT_EMAIL,
        'client_id': config.FIREBASE.ADMIN.CLIENT_ID,
        'auth_uri': config.FIREBASE.ADMIN.AUTH_URI,
        'token_uri': config.FIREBASE.ADMIN.TOKEN_URI,
        'auth_provider_x509_cert_url': config.FIREBASE.ADMIN.AUTH_CERT_URL,
        'client_x509_cert_url': config.FIREBASE.ADMIN.CLIENT_CERT_URL,
        'universe_domain': config.FIREBASE.ADMIN.UNIVERSAL_DOMAIN,
      }))),
      databaseURL: config.FIREBASE.ADMIN.DATABASE_URL,
    });
    logger.info('Firebase Admin Initialized');
  } catch(error: any) {
    throw new FirebaseError('Unable to connect', error);
  }
})();

export { firebaseAdmin };