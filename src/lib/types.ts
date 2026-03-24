export interface NodeDef {
  id: string; label: string; icon: string; description: string
  parentId: string | null; level: 'main' | 'sub' | 'ssub'
  maturityLevel: number; status: 'active' | 'planned' | 'blocked' | 'done'
  criticality: 'critical' | 'high' | 'medium' | 'low'; owner: string
  children?: NodeDef[]
}
export interface Task {
  id: string; nodeId: string; title: string; description: string; progress: number
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked'
  owner: string; dueDate: string; createdAt: string; updatedAt: string
  tags: string[]; blockedBy: string; impact: string
}
export interface Comment {
  id: string; entityType: 'node' | 'task' | 'incident' | 'pilot'
  entityId: string; author: string; text: string; createdAt: string
}
export interface ChatMessage {
  role: 'user' | 'ai'; text: string; thinking?: string; via?: 'openclaw' | 'cloud'
  files?: ChatFile[]; mutations?: Mutation[]
}
export interface ChatFile { name: string; url: string; type: string }
export interface Mutation {
  type: string; entity_type: string; entity_id: string
  payload: Record<string, any>; status: 'pending' | 'approved' | 'rejected'
  agent: string; at: string
}
export interface AgentDef {
  id: string; name: string; icon: string; color: string
  category: 'strategy' | 'implementation' | 'quality' | 'operations'
  description: string; soulPrompt: string; skills: string[]
  toolPolicy: 'ask' | 'record' | 'ignore'; allowedTools: string[]; deniedTools: string[]
  computerAccess: { shell: boolean; fileRead: boolean; fileWrite: boolean; browser: boolean; canvas: boolean; cron: boolean; network: boolean }
}
export interface UserInfo { name: string; role: 'admin' | 'operator' | 'viewer'; loaded: boolean }
export interface GatewayStatus { connected: boolean; version: string; model: string }
export interface SettingsConfig {
  approvalMode: 'advisory' | 'execute'
  agentEditPolicy: 'direct' | 'approval' | 'readonly'
  notifications: boolean; theme: 'dark'
}
