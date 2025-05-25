import { EventEmitter } from 'events';

export interface Workflow {
  id: string;
  name: string;
  triggers: Trigger[];
  actions: Action[];
  enabled: boolean;
}

export interface Trigger {
  id: string;
  type: string;
  config: Record<string, any>;
}

export interface Action {
  id: string;
  type: string;
  config: Record<string, any>;
  next?: string[];
}

export class WorkflowEngine extends EventEmitter {
  private workflows: Map<string, Workflow> = new Map();

  async registerWorkflow(workflow: Workflow): Promise<void> {
    this.workflows.set(workflow.id, workflow);
    if (workflow.enabled) {
      await this.startWorkflow(workflow.id);
    }
  }

  async startWorkflow(id: string): Promise<void> {
    const workflow = this.workflows.get(id);
    if (!workflow) throw new Error(`Workflow ${id} not found`);
    
    workflow.enabled = true;
    this.emit('workflow:started', workflow);
  }

  async executeWorkflow(id: string, triggerData: any): Promise<void> {
    const workflow = this.workflows.get(id);
    if (!workflow) throw new Error(`Workflow ${id} not found`);

    try {
      this.emit('workflow:executing', { workflow, triggerData });
      
      for (const action of workflow.actions) {
        await this.executeAction(action, triggerData);
      }

      this.emit('workflow:completed', { workflow, triggerData });
    } catch (error) {
      this.emit('workflow:error', { workflow, error });
      throw error;
    }
  }

  private async executeAction(action: Action, data: any): Promise<any> {
    this.emit('action:executing', { action, data });
    // Action execution logic here
    this.emit('action:completed', { action, data });
  }
}