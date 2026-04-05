export const adminRoles = [
  "super_user",
  "whatsapp_campaigns",
  "receptionist",
  "management",
] as const;

export type AdminRole = (typeof adminRoles)[number];

export const adminStatuses = ["active", "inactive"] as const;

export type AdminStatus = (typeof adminStatuses)[number];

export const adminPermissions = [
  "dashboard:view",
  "clients:view",
  "clients:manage",
  "campaigns:view",
  "campaigns:manage",
  "campaigns:dispatch",
  "media:view",
  "media:manage",
  "delivery:view",
  "admins:view",
  "admins:manage",
] as const;

export type AdminPermission = (typeof adminPermissions)[number];

type RoleDefinition = {
  label: string;
  description: string;
  permissions: AdminPermission[];
};

export const roleDefinitions: Record<AdminRole, RoleDefinition> = {
  super_user: {
    label: "Super User",
    description:
      "Full operational control, including creating other admins and managing every workflow.",
    permissions: [...adminPermissions],
  },
  whatsapp_campaigns: {
    label: "WhatsApp Campaigns",
    description:
      "Focused on campaign drafting, media handling, audience review, and message dispatch.",
    permissions: [
      "dashboard:view",
      "clients:view",
      "campaigns:view",
      "campaigns:manage",
      "campaigns:dispatch",
      "media:view",
      "media:manage",
      "delivery:view",
    ],
  },
  receptionist: {
    label: "Receptionist",
    description:
      "Front-desk workflow with client registration, follow-up notes, and appointment intake support.",
    permissions: [
      "dashboard:view",
      "clients:view",
      "clients:manage",
    ],
  },
  management: {
    label: "Management",
    description:
      "Read-only visibility into operational stats, clients, campaigns, media, and delivery activity.",
    permissions: [
      "dashboard:view",
      "clients:view",
      "campaigns:view",
      "media:view",
      "delivery:view",
      "admins:view",
    ],
  },
};

export function getPermissionsForRole(role: AdminRole): AdminPermission[] {
  return roleDefinitions[role].permissions;
}

export function hasPermission(
  permissions: readonly AdminPermission[],
  permission: AdminPermission,
) {
  return permissions.includes(permission);
}

