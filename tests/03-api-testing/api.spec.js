import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// โหลดข้อมูลจากไฟล์ CSV
const filePath = path.resolve(__dirname, 'test-data.csv');
const fileContent = fs.readFileSync(filePath);
const testData = parse(fileContent, { columns: true, skip_empty_lines: true });

test.describe('ข้อ 3: Create automation script for test Rest API GET request', () => {

    for (const data of testData) {
        test(`${data.testDescription}`, async ({ request }) => {
            let response;

            // --- Test Steps ---
            // 1. Send Get request to url 
            await test.step(`1. Send Get request to url https://reqres.in/api/users/${data.userId}`, async () => {
                response = await request.get(`https://reqres.in/api/users/${data.userId}`, {
                    headers: {
                        // ส่ง API Key ไปใน Header ชื่อ x-api-key ตามที่ Error แจ้งมา
                        'x-api-key': process.env.REQRES_API_KEY,
                        'Content-Type': 'application/json'
                    }
                });
            });

            // --- Expected Result ---
            await test.step(`Verify response for: ${data.testDescription}`, async () => {
                const status = Number(data.expectedStatus);

                // 1. Verify response status code 
                expect(response.status()).toBe(status);

                const body = await response.json();

                // 2. Compare the response body with expected data 
                if (status === 200) {
                    const user = body.data;
                    expect(user.id).toBe(Number(data.expectedId)); // 'ID' == 12 
                    expect(user.email).toBe(data.expectedEmail); // 'Email' == rachel.howell@reqres.in 
                    expect(user.first_name).toBe(data.expectedFirstName); // 'First Name' == Rachel 
                    expect(user.last_name).toBe(data.expectedLastName); // 'Last Name' == Howell 
                    expect(user.avatar).toBe(data.expectedAvatar); // 'Avatar' == https://reqres.in/img/faces/12-image.jpg 
                }
                else if (status === 404) {
                    // Response body should be '{}' 
                    expect(body).toEqual({});
                }
            });
        });
    }
});