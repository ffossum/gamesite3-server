import registrationValidation from './registrationValidation';

describe('registration validation', () => {
  let ctx;
  const next = async () => {
    ctx.status = 201;
  };
  beforeEach(() => {
    ctx = {
      request: {
        body: {
          username: 'Bob',
          email: 'bob@test.com',
          password: 'bobisthebest',
          repeatPassword: 'bobisthebest',
        },
      },
    };
  });
  test('valid request', async () => {
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(201);
  });

  test('username is required', async () => {
    ctx.request.body.username = '';
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(400);
  });

  test('username must be alphanumeric', async () => {
    ctx.request.body.username = 'billy bob'; //spaces not allowed
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(400);
  });

  test('email is required', async () => {
    ctx.request.body.email = '';
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(400);
  });

  test('email must be valid', async () => {
    ctx.request.body.email = 'not@valid';
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(400);
  });

  test('password is required', async () => {
    ctx.request.body.password = '';
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(400);
  });

  test('passwords must match', async () => {
    ctx.request.body.repeatPassword = 'bobistheworst';
    const middleware = registrationValidation();
    await middleware(ctx, next);
    expect(ctx.status).toBe(400);
  });
});
