import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  // the ? tells typescript that the property might be undefined for some period of time
  private _client?: Stan;

  // we use a getter because we need to expose the _client,
  // but if it is not yet defined, we want to throw an error
  get client() {
    if (!this._client) {
      throw new Error('Cannot acess NATS client before connection');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    // we want to use the async await syntax in the index.ts,
    // that's why we return a promise
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

// we export AN INSTANCE of the NatsWrapper to be shared across the app
export const natsWrapper = new NatsWrapper();
