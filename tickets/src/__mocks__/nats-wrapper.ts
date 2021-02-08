export const natsWrapper = {
  client: {
    // jest.fn will track the times the function was invoked
    // mockImplementation will be the function that will actually be invoked
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
