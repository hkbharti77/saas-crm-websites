/**
 * auditLogger.js
 * In the unified architecture, audit logs are generated and recorded natively
 * on the backend (Node.js/Express) within audit.service.js and stored in MongoDB Atlas.
 */

export async function logActivity(_blogId, _action, _details = {}) {
  // Audit logging is handled server-side by backend
}
