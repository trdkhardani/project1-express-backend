import restApp from "../../../app.ts";
import request from "supertest";
import { PrismaClient, UserStatus } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
import { Status } from "../../../models/response.ts";
import type { App } from "supertest/types.js";
import { UserRole } from "../../../models/user.ts";
import { type UserLoginInterface } from "../../../models/auth.ts";

beforeAll(async () => {
    await prisma.user.createMany({
        data: [
            {
                user_id: 'user-test-1',
                user_email: 'user.test.1@mail.com',
                user_username: 'usertest1',
                user_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
                user_name: 'User Test 1',
                user_status: UserStatus.VERIFIED,
            },
            {
                user_id: 'user-test-2',
                user_email: 'user.test.2@mail.com',
                user_username: 'usertest2',
                user_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
                user_name: 'User Test 2',
                user_status: UserStatus.VERIFIED,
            },
            {
                user_id: 'user-test-3',
                user_email: 'user.test.3@mail.com',
                user_username: 'usertest3',
                user_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
                user_name: 'User Test 3',
                user_status: UserStatus.UNVERIFIED,
            }
        ] 
    });

    await prisma.admin.createMany({
        data: [
            {
                admin_id: 'admin-test-1',
                cinema_chain_id: '07ccd992-19e4-4057-9f7c-64ee39fe3874',
                admin_email: 'admin.test.1@mail.com',
                admin_username: 'admintest1',
                admin_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
            },
            {
                admin_id: 'admin-test-2',
                cinema_chain_id: '07ccd992-19e4-4057-9f7c-64ee39fe3874',
                admin_email: 'admin.test.2@mail.com',
                admin_username: 'admintest2',
                admin_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
            }
        ]
    });

    await prisma.superadmin.createMany({
        data: [
            {
                admin_id: 'superadmin-test-1',
                admin_email: 'superadmin.test.1@mail.com',
                admin_username: 'superadmintest1',
                admin_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
            },
            {
                admin_id: 'superadmin-test-2',
                admin_email: 'superadmin.test.2@mail.com',
                admin_username: 'superadmintest2',
                admin_password: '$2a$12$QSuErK96PB8scJfCd2wi8eHLnjRn37OkFwJEJ8NpBDSc9gFPH80Xe', // test1234
            }
        ]
    })
});

afterAll(async () => {
    await prisma.user.deleteMany({
        where: {
            user_id: {
                contains: 'user-test'
            }
        }
    });

    await prisma.admin.deleteMany({
        where: {
            admin_id: {
                contains: 'admin-test'
            }
        }
    });

    await prisma.superadmin.deleteMany({
        where: {
            admin_id: {
                contains: 'superadmin-test'
            }
        }
    });
});



async function sendLogin(app: App, payload: object) {
    const res = await request(app)
        .post('/api/v1/auth/login')
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload);
    
    return res;
};

describe('POST /api/v1/auth/login', () => {
    describe('Login Test for Role: User', () => {
        it('should return unauthorized because valid email, wrong password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'user.test.1@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong email, valid password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'user.test.wrong@mail.com',
                user_password: 'test1234',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because valid username, wrong password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'user.test.1@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong username, valid password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'wrongusername',
                user_password: 'test1234',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong email and password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'user.test.wrong@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong username and password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'wrongusername',
                user_password: 'wrongpass',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return email format validation error', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'wrongemailformat',
                user_password: 'wrongpass',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(400);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Email must in a valid format');
        });
    
        it('should return unauthorized despite valid creds because user email is not verified', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'usertest3',
                user_password: 'test1234',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('User email has not been verified yet');
        });
    
        it('should return successful login using email', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'user.test.2@mail.com',
                user_password: 'test1234',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('success');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.user.user_id).toBe('user-test-2');
            expect(res.body.data.token).toContain('ey');
            expect(res.body.message).toBe('Logged in as user usertest2');
        });
    
        it('should return successful login using username', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'usertest1',
                user_password: 'test1234',
                user_role: UserRole.USER
            })
    
            expect(res.body.status).toBe('success');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.user.user_id).toBe('user-test-1');
            expect(res.body.data.token).toContain('ey');
            expect(res.body.message).toBe('Logged in as user usertest1');
        });
    });
    
    describe('Login Test for Role: Admin', () => {
        it('should return unauthorized because valid email, wrong password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'admin.test.1@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.ADMIN
            })
            
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });

        it('should return unauthorized because wrong email, valid password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'admin.test.wrong@mail.com',
                user_password: 'test1234',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because valid username, wrong password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'admin.test.1@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong username, valid password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'wrongusername',
                user_password: 'test1234',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong email and password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'admin.test.wrong@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong username and password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'wrongusername',
                user_password: 'wrongpass',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return email format validation error', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'wrongemailformat',
                user_password: 'wrongpass',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(400);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Email must in a valid format');
        });
    
        it('should return successful login using email', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'admin.test.2@mail.com',
                user_password: 'test1234',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('success');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.admin.admin_id).toBe('admin-test-2');
            expect(res.body.data.token).toContain('ey');
            expect(res.body.message).toBe('Logged in as Admin admintest2');
        });
    
        it('should return successful login using username', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'admintest1',
                user_password: 'test1234',
                user_role: UserRole.ADMIN
            })
    
            expect(res.body.status).toBe('success');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.admin.admin_id).toBe('admin-test-1');
            expect(res.body.data.token).toContain('ey');
            expect(res.body.message).toBe('Logged in as Admin admintest1');
        });
    });

    describe('Login Test for Role: Superadmin', () => {
        it('should return unauthorized because valid email, wrong password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'superadmin.test.1@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.SUPERADMIN
            })
            
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });

        it('should return unauthorized because wrong email, valid password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'superadmin.test.wrong@mail.com',
                user_password: 'test1234',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because valid username, wrong password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'superadmin.test.1@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong username, valid password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'wrongusername',
                user_password: 'test1234',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong email and password', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'superadmin.test.wrong@mail.com',
                user_password: 'wrongpass',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return unauthorized because wrong username and password', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'wrongusername',
                user_password: 'wrongpass',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(401);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Invalid email/username or password');
        });
    
        it('should return email format validation error', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'wrongemailformat',
                user_password: 'wrongpass',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('error');
            expect(res.statusCode).toEqual(400);
            expect(res.body.data).toBe(null);
            expect(res.body.message).toBe('Email must in a valid format');
        });
    
        it('should return successful login using email', async () => {
            const res = await sendLogin(restApp, {
                user_email: 'superadmin.test.2@mail.com',
                user_password: 'test1234',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('success');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.admin.admin_id).toBe('superadmin-test-2');
            expect(res.body.data.token).toContain('ey');
            expect(res.body.message).toBe('Logged in as Admin superadmintest2');
        });
    
        it('should return successful login using username', async () => {
            const res = await sendLogin(restApp, {
                user_username: 'superadmintest1',
                user_password: 'test1234',
                user_role: UserRole.SUPERADMIN
            })
    
            expect(res.body.status).toBe('success');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.admin.admin_id).toBe('superadmin-test-1');
            expect(res.body.data.token).toContain('ey');
            expect(res.body.message).toBe('Logged in as Admin superadmintest1');
        });
    });
});