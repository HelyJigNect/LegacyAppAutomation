import axios, { AxiosInstance } from 'axios';
import fs from 'fs';
import FormData from 'form-data';

interface TestRailConfig {
  user: string;
  apiKey: string;
  baseUrl: string;
  projectId: number;
  suiteId: number;
  environment: string;
}

export class TestRailHelper {
  private static runIds = new Map<number, number>(); // workerIndex → runId
  private client: AxiosInstance;
  private projectId: number;
  private suiteId: number;
  private environment: string;

  constructor(config: TestRailConfig) {
    this.projectId = config.projectId;
    this.suiteId = config.suiteId;
    this.environment = config.environment;

    this.client = axios.create({
      baseURL: `${config.baseUrl}/index.php?/api/v2`,
      auth: {
        username: config.user,
        password: config.apiKey,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async createTestRun(workerIndex: number): Promise<number> {
    if (TestRailHelper.runIds.has(workerIndex)) {
      return TestRailHelper.runIds.get(workerIndex)!;
    }

    const response = await this.client.post(
      `/add_run/${this.projectId}`,
      {
        suite_id: this.suiteId,
        name: `Legacy Registry Automated Tests Run - State or Env Name : ${this.environment}`, //| ${new Date().toISOString()} -- to add date
        include_all: true, 
      }
    );

    TestRailHelper.runIds.set(workerIndex, response.data.id);
    return response.data.id;
  }

  async addResultForCase(
    runId: number,
    caseId: number,
    statusId: number,
    comment: string
  ): Promise<number> {
    const response = await this.client.post(
      `/add_result_for_case/${runId}/${caseId}`,
      {
        status_id: statusId,
        comment,
      }
    );

    return response.data.id; //result_id
  }

  async addAttachmentToResult(
    resultId: number,
    filePath: string
  ): Promise<void> {
    const form = new FormData();
    form.append('attachment', fs.createReadStream(filePath));

    await this.client.post(
      `/add_attachment_to_result/${resultId}`,
      form,
      {
        headers: form.getHeaders(),
      }
    );
  }
}
