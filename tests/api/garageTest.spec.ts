import { test, expect } from '@playwright/test'
import { users } from '../../src/credentials'

test.describe('Garage API tests with auth in BeforeEach', () => {
    test.beforeEach(async ({ request }) => {

        const authRequest = await request.post('/api/auth/signin', {
            data: {
                "email": users.Andrij.email,
                "password": users.Andrij.password,
                "remember": true,
            }
        })
    })

    test('Creating car. Positive test', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 2,
                "carModelId": 6,
                "mileage": 12345
            }
        })

        expect(createResponse.ok()).toBeTruthy()

        const createResponseBody = await createResponse.json()

        expect(createResponseBody.status).toBe('ok')

        const carId = createResponseBody.data.id
        expect(carId).toBeDefined()

        const getResponse = await request.get(`/api/cars/${carId}`)
        expect(getResponse.ok()).toBeTruthy()

        const getCarBody = await getResponse.json()

        expect(getCarBody.data).toEqual(expect.objectContaining({
            id: carId,
            carBrandId: 2,
            carModelId: 6,
            mileage: 12345
        }))
    })

    test('Incorrect Brand ID. Negative test 1', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 200,
                "carModelId": 6,
                "mileage": 12345
            }
        })

        const createResponseBody = await createResponse.json()
        expect(createResponseBody.status).toBe('error')
        expect(createResponseBody.message).toBe('Brand not found')
    })

    test('Incorrect Model ID. Negative test 2', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 2,
                "carModelId": 600,
                "mileage": 12345
            }
        })

        const createResponseBody = await createResponse.json()
        expect(createResponseBody.status).toBe('error')
        expect(createResponseBody.message).toBe('Model not found')
    })

    test('Incorrect mileage. Negative test 3', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                "carBrandId": 2,
                "carModelId": 6,
                "mileage": 123456789
            }
        })

        const createResponseBody = await createResponse.json()
        expect(createResponseBody.status).toBe('error')
        expect(createResponseBody.message).toBe('Mileage has to be from 0 to 999999')
    })
})