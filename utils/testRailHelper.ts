import axios from 'axios';

interface TestRailConfig {
  user: string;
  apiKey: string;
  baseUrl: string;      
  projectId: number;   
  suiteId: number;   
  environment: string; 
}

export class TestRailHelper {
  private runId: number | null = null; 

  constructor(private readonly config: TestRailConfig) {}

  // Basic Auth header
  private get headers() {
    const token = Buffer.from(`${this.config.user}:${this.config.apiKey}`).toString('base64');
    return { Authorization: `Basic ${token}` };
  }

  // Create test run once per environment
  async createRunOnce(): Promise<number> {
    if (this.runId !== null) return this.runId;

   const response = await axios.post(
      `${this.config.baseUrl}/index.php?/api/v2/add_run/${this.config.projectId}`,
      {
        suite_id: this.config.suiteId, 
        include_all: true,
        name: `Automated Run - ${this.config.environment}`
      },
      { headers: this.headers }
    );

    const id = response.data?.id;
    if (typeof id !== 'number') throw new Error('Failed to create TestRail run');
    this.runId = id;

    return this.runId;
  }

  // Add test result for a case
  async addResult(caseId: number, statusId: number, comment: string = ''): Promise<void> {
    const runId = await this.createRunOnce();

    await axios.post(
      `${this.config.baseUrl}/index.php?/api/v2/add_result_for_case/${runId}/${caseId}`,
      { status_id: statusId, comment },
      { headers: this.headers }
    );
  }

  // Close the run (optional)
  async closeRun(): Promise<void> {
    if (!this.runId) return;

    await axios.post(
      `${this.config.baseUrl}/index.php?/api/v2/close_run/${this.runId}`,
      {},
      { headers: this.headers }
    );
  }
}
