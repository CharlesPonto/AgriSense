export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

const defaultMessage = 'FirestoreError: Missing or insufficient permissions.';

export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;
  constructor(context: SecurityRuleContext) {
    const message = `${defaultMessage} The following request was denied by Firestore Security Rules:\n${JSON.stringify(context, null, 2)}`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    // This is necessary for 'instanceof' to work correctly.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
