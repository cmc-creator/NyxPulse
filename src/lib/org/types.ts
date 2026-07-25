export type OrgMember = {
  email: string;
  name: string;
  courses: string[];
  completedCourses: string[];
  workforceRoleId?: string;
  invitedAt?: string;
  status?: "invited" | "active";
};

export type OrgInvite = {
  token: string;
  orgAdminUserId: string;
  orgName: string;
  email: string;
  name: string;
  courseSlugs: string[];
  workforceRoleId?: string;
  createdAt: string;
  expiresAt: string;
};
