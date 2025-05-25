import { Workflow, Action } from '@repo/core';
import { Worker } from 'worker_threads';

export class WorkflowRunner {
  async runAction(action: Action, data: any): Promise<any> {
    switch (action.type) {
      case 'code':
        return this.runCodeAction(action, data);
      case 'http':
        return this.runHttpAction(action, data);
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  private async runCodeAction(action: Action, data: any): Promise<any> {
    const worker = new Worker(`
      const vm = require('vm');
      const context = { data: ${JSON.stringify(data)} };
      vm.createContext(context);
      vm.runInContext(${action.config.code}, context);
    `);

    return new Promise((resolve, reject) => {
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }

  private async runHttpAction(action: Action, data: any): Promise<any> {
    const response = await fetch(action.config.url, {
      method: action.config.method,
      headers: action.config.headers,
      body: action.config.body ? JSON.stringify(action.config.body) : undefined
    });
    return response.json();
  }
}