import { https } from 'firebase-functions';
import { initializeApp, auth as _auth } from 'firebase-admin';

initializeApp();

export const deleteUserAccount = https.onCall(async (data, context) => {
  // Check if the caller is authenticated
  if (!context.auth) {
    throw new https.HttpsError(
      'unauthenticated',
      'Only authenticated users can delete accounts.'
    );
  }

  // Check if the caller has the necessary role or permission to delete accounts
  // You can implement your own logic to check permissions
//   if (!userHasPermissionToDelete(context.auth)) {
//     throw new https.HttpsError(
//       'permission-denied',
//       'You do not have permission to delete accounts.'
//     );
//   }

  try {
    const userIdToDelete = data.userId; // Get the user ID to delete
    await _auth().deleteUser(userIdToDelete); // Delete the user
    return { success: true, message: 'User account deleted successfully.' };
  } catch (error) {
    throw new https.HttpsError(
      'internal',
      'Error deleting user account: ' + error.message
    );
  }
});

// Implement userHasPermissionToDelete function as required
function userHasPermissionToDelete(auth) {
  // Implement your permission logic here
  return true; // For demonstration purposes
}
